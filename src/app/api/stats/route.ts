import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 0

export async function GET(request) {
    try {
        // @ts-ignore
        const db = process.env.DB
        if (!db) {
            return NextResponse.json({ error: "Database not available" }, { status: 500 })
        }

        const { searchParams } = new URL(request.url)
        const period = searchParams.get('period') || '30d'

        // Get date range based on period
        const now = new Date()
        let daysBack = 30
        switch (period) {
            case '7d': daysBack = 7; break
            case '30d': daysBack = 30; break
            case '90d': daysBack = 90; break
            case '1y': daysBack = 365; break
        }
        const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

        // Get total revenue (completed orders)
        const revenueResult = await db.prepare(
            "SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status = 'Completed'"
        ).first()
        const totalRevenue = revenueResult?.total || 0

        // Get total orders count
        const ordersResult = await db.prepare("SELECT COUNT(*) as count FROM orders").first()
        const totalOrders = ordersResult?.count || 0

        // Get orders in period
        const periodOrdersResult = await db.prepare(
            "SELECT COUNT(*) as count FROM orders WHERE date >= ?"
        ).bind(startDate).first()
        const periodOrders = periodOrdersResult?.count || 0

        // Get revenue in period
        const periodRevenueResult = await db.prepare(
            "SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status = 'Completed' AND date >= ?"
        ).bind(startDate).first()
        const periodRevenue = periodRevenueResult?.total || 0

        // Get unread messages count
        const unreadResult = await db.prepare(
            "SELECT COUNT(*) as count FROM messages WHERE is_read = 0 AND sender_type = 'customer'"
        ).first()
        const unreadMessages = unreadResult?.count || 0

        // Get page views (if table exists)
        let totalViews = 0
        let periodViews = 0
        try {
            const viewsResult = await db.prepare("SELECT COUNT(*) as count FROM page_views").first()
            totalViews = viewsResult?.count || 0

            const periodViewsResult = await db.prepare(
                "SELECT COUNT(*) as count FROM page_views WHERE created_at >= ?"
            ).bind(startDate).first()
            periodViews = periodViewsResult?.count || 0
        } catch (e) {
            // Table might not exist yet
        }

        // Get chart data - daily revenue for the period
        const chartData = await db.prepare(`
            SELECT 
                date,
                COALESCE(SUM(CASE WHEN status = 'Completed' THEN amount ELSE 0 END), 0) as revenue,
                COUNT(*) as orders
            FROM orders 
            WHERE date >= ?
            GROUP BY date 
            ORDER BY date ASC
        `).bind(startDate).all()

        // Get recent orders
        const recentOrders = await db.prepare(
            "SELECT * FROM orders ORDER BY date DESC LIMIT 5"
        ).all()

        return NextResponse.json({
            totalRevenue,
            totalOrders,
            periodOrders,
            periodRevenue,
            unreadMessages,
            totalViews,
            periodViews,
            period,
            chartData: chartData.results || [],
            recentOrders: recentOrders.results || []
        })
    } catch (error) {
        console.error("[API] Stats Error:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}
