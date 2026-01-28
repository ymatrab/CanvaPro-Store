import { query } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
    try {
        console.log('[API] /api/reviews GET called');
        const results = await query(`SELECT * FROM reviews ORDER BY date DESC`);
        console.log('[API] Query returned', results?.length, 'reviews');
        return Response.json(results || []);
    } catch (error) {
        console.error('[API] /api/reviews error:', error);
        return Response.json(
            { error: error.message || 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}
