import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 0

export async function GET() {
    try {
        // @ts-ignore - DB is injected by Cloudflare
        const db = process.env.DB as D1Database | undefined

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
