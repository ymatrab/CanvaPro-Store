import { getRequestContext } from '@cloudflare/next-on-pages';

export function getDb() {
    try {
        const ctx = getRequestContext();
        if (!ctx || !ctx.env || !ctx.env.DB) {
            console.error('[DB] No DB binding found in request context');
            return null;
        }
        return ctx.env.DB;
    } catch (error) {
        console.error('[DB] Error getting request context:', error.message);
        return null;
    }
}

export async function query(sql, params = []) {
    const db = getDb();

    if (!db) {
        console.error('[DB] Database not available - returning empty array');
        return [];
    }

    try {
        console.log('[DB] Executing:', sql.substring(0, 80));
        const stmt = db.prepare(sql).bind(...params);
        const { results } = await stmt.all();
        console.log('[DB] Returned', results?.length || 0, 'rows');
        return results || [];
    } catch (error) {
        console.error('[DB] Query error:', error.message);
        return [];
    }
}
