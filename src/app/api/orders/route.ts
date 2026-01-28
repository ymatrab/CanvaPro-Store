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

        const { results } = await db.prepare("SELECT * FROM orders ORDER BY date DESC").all()
        console.log("[API] Fetched", results?.length || 0, "orders")
        return NextResponse.json(results || [])
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

        const order = await request.json()
        const { id, customer_name, customer_email, package_name, amount, status, payment_method, package_type, duration, canva_email, notes } = order

        // Generate ID if not provided
        const orderId = id || `ORD-${Date.now()}`
        const orderDate = new Date().toISOString().split('T')[0]

        await db.prepare(
            `INSERT INTO orders (id, customer_name, customer_email, package_name, amount, status, date, payment_method) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            orderId,
            customer_name,
            customer_email,
            package_name || `${package_type} - ${duration}`,
            amount,
            status || 'Pending',
            orderDate,
            payment_method || 'Card'
        ).run()

        return NextResponse.json({ success: true, id: orderId })
    } catch (error) {
        console.error("[API] POST Error:", error)
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

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const body = await request.json()
        const { status } = body

        if (!id) {
            return NextResponse.json({ error: "Order ID required" }, { status: 400 })
        }

        await db.prepare("UPDATE orders SET status = ? WHERE id = ?").bind(status, id).run()
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[API] PUT Error:", error)
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
            return NextResponse.json({ error: "Order ID required" }, { status: 400 })
        }

        await db.prepare("DELETE FROM orders WHERE id = ?").bind(id).run()
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[API] DELETE Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}
