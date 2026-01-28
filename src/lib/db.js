import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDb() {
    try {
        const { env } = await getCloudflareContext();
        if (!env?.DB) {
            console.error('[DB] No DB binding found in Cloudflare context');
            return null;
        }
        return env.DB;
    } catch (error) {
        console.error('[DB] Error getting Cloudflare context:', error.message);
        return null;
    }
}

export async function query(sql, params = []) {
    const db = await getDb();

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
