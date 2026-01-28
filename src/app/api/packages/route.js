import { query } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
    try {
        console.log('[API] /api/packages GET called');
        const results = await query(`SELECT * FROM packages ORDER BY price ASC`);
        console.log('[API] Query returned', results?.length, 'packages');
        return Response.json(results || []);
    } catch (error) {
        console.error('[API] /api/packages error:', error);
        return Response.json(
            { error: error.message || 'Failed to fetch packages' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const pkg = await request.json();
        const { id, name, duration, price, original_price = null, savings = null, status = 'Active', type, popular = 0, best_value = 0 } = pkg;

        await query(
            `INSERT INTO packages (id, name, duration, price, original_price, savings, status, type, popular, best_value) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, name, duration, price, original_price, savings, status, type, popular, best_value]
        );

        return Response.json({ success: true });
    } catch (error) {
        console.error('[API] POST /api/packages error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({ error: 'Package ID required' }, { status: 400 });
        }

        await query(`DELETE FROM packages WHERE id = ?`, [id]);
        return Response.json({ success: true });
    } catch (error) {
        console.error('[API] DELETE /api/packages error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
