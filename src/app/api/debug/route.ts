import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
    try {
        // @ts-ignore - DB is injected by Cloudflare
        const db = process.env.DB

        return NextResponse.json({
            status: "ok",
            timestamp: new Date().toISOString(),
            hasDB: !!db,
            dbType: typeof db
        })
    } catch (error) {
        return NextResponse.json({
            status: "error",
            error: error.message
        }, { status: 500 })
    }
}
