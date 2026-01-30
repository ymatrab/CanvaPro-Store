import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 0

export async function GET() {
    try {
        // @ts-ignore - DB is injected by Cloudflare
        const db = process.env.DB

        if (!db) {
            console.log("[API] D1 not found")
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const { results } = await db.prepare("SELECT * FROM packages ORDER BY price ASC").all()
        console.log("[API] Fetched", results?.length || 0, "packages")
        return NextResponse.json(results || [], {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        })
    } catch (error) {
        console.error("[API] Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        // @ts-ignore
        const db = process.env.DB
        if (!db) {
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const pkg = await request.json()
        const { id, name, duration, price, original_price, savings, status, type, popular, best_value, payment_link } = pkg

        await db.prepare(
            `INSERT INTO packages (id, name, duration, price, original_price, savings, status, type, popular, best_value, payment_link) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(id, name, duration, price, original_price || null, savings || null, status || 'Active', type, popular || 0, best_value || 0, payment_link || null).run()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[API] POST Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        // @ts-ignore
        const db = process.env.DB
        if (!db) {
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: "Package ID required" }, { status: 400 })
        }

        await db.prepare("DELETE FROM packages WHERE id = ?").bind(id).run()
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[API] DELETE Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        // @ts-ignore
        const db = process.env.DB
        if (!db) {
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const pkg = await request.json()
        const { id, name, duration, price, original_price, savings, status, type, popular, best_value, payment_link } = pkg

        if (!id) {
            return NextResponse.json({ error: "Package ID required" }, { status: 400 })
        }

        await db.prepare(
            `UPDATE packages SET name = ?, duration = ?, price = ?, original_price = ?, savings = ?, status = ?, type = ?, popular = ?, best_value = ?, payment_link = ? WHERE id = ?`
        ).bind(name, duration, price, original_price || null, savings || null, status || 'Active', type, popular || 0, best_value || 0, payment_link || null, id).run()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[API] PUT Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}

