import { query } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
    try {
        console.log('[API] /api/orders GET called');
        const results = await query(`SELECT * FROM orders ORDER BY date DESC`);
        console.log('[API] Query returned', results?.length, 'orders');
        return Response.json(results || []);
    } catch (error) {
        console.error('[API] /api/orders error:', error);
        return Response.json(
            { error: error.message || 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
