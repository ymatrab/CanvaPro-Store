import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 0

// Get all messages or messages for a specific session
export async function GET(request) {
    try {
        // @ts-ignore
        const db = process.env.DB
        if (!db) {
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get('session_id')

        let results
        if (sessionId) {
            // Get messages for specific session
            const data = await db.prepare(
                "SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC"
            ).bind(sessionId).all()
            results = data.results
        } else {
            // Get all conversations grouped by session
            const data = await db.prepare(`
                SELECT 
                    session_id,
                    customer_name,
                    customer_email,
                    MAX(created_at) as last_message_at,
                    COUNT(*) as message_count,
                    SUM(CASE WHEN is_read = 0 AND sender_type = 'customer' THEN 1 ELSE 0 END) as unread_count,
                    (SELECT message FROM messages m2 WHERE m2.session_id = messages.session_id ORDER BY created_at DESC LIMIT 1) as last_message
                FROM messages 
                GROUP BY session_id 
                ORDER BY last_message_at DESC
            `).all()
            results = data.results
        }

        return NextResponse.json(results || [])
    } catch (error) {
        console.error("[API] Messages GET Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}

// Send a new message
export async function POST(request) {
    try {
        // @ts-ignore
        const db = process.env.DB
        if (!db) {
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const data = await request.json()
        const { session_id, sender_type, message, customer_email, customer_name } = data

        const messageId = `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const now = new Date().toISOString()

        await db.prepare(
            `INSERT INTO messages (id, session_id, sender_type, message, customer_email, customer_name, is_read, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(messageId, session_id, sender_type, message, customer_email || null, customer_name || null, 0, now).run()

        // If this is a customer's first message, send auto-reply
        let autoReply = null
        if (sender_type === 'customer') {
            // Check if this is the first customer message in this session
            const countResult = await db.prepare(
                "SELECT COUNT(*) as count FROM messages WHERE session_id = ? AND sender_type = 'customer'"
            ).bind(session_id).first()

            if (countResult && countResult.count === 1) {
                // Get auto-reply settings
                const settings = await db.prepare("SELECT * FROM chat_settings WHERE id = 1").first()

                if (settings && settings.auto_reply_enabled) {
                    const replyId = `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                    const replyTime = new Date(Date.now() + 1000).toISOString()

                    await db.prepare(
                        `INSERT INTO messages (id, session_id, sender_type, message, is_read, created_at) 
                         VALUES (?, ?, 'admin', ?, 0, ?)`
                    ).bind(replyId, session_id, settings.auto_reply_message, replyTime).run()

                    autoReply = {
                        id: replyId,
                        sender_type: 'admin',
                        message: settings.auto_reply_message,
                        created_at: replyTime
                    }
                }
            }
        }

        return NextResponse.json({ success: true, id: messageId, autoReply })
    } catch (error) {
        console.error("[API] Messages POST Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}

// Mark messages as read
export async function PUT(request) {
    try {
        // @ts-ignore
        const db = process.env.DB
        if (!db) {
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get('session_id')
        const markAs = searchParams.get('mark_as') || 'read'
        const senderType = searchParams.get('sender_type') || 'customer' // Which sender's messages to mark

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 })
        }

        // Mark messages from specified sender as read
        await db.prepare(
            "UPDATE messages SET is_read = ? WHERE session_id = ? AND sender_type = ?"
        ).bind(markAs === 'read' ? 1 : 0, sessionId, senderType).run()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[API] Messages PUT Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}
