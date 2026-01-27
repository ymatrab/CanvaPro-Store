import { getRequestContext } from '@cloudflare/next-on-pages';

export async function getDb() {
    try {
        const { env } = getRequestContext();
        if (!env?.DB) {
            console.error("[DB] getRequestContext succeeded but env.DB is undefined");
            return null;
        }
        console.log("[DB] Successfully got DB from getRequestContext");
        return env.DB;
    } catch (e) {
        console.error("[DB] getRequestContext failed:", e.message);
        // Fallback for local development if not running in pages dev
        if (process.env.DB) {
            console.log("[DB] Using process.env.DB fallback");
            return process.env.DB;
        }
        console.warn("[DB] Could not retrieve DB binding via getRequestContext or process.env");
        return null;
    }
}

// Helper to execute query
export async function query(sql, params = []) {
    console.log("[DB] Executing query:", sql.substring(0, 100), "params:", params);
    const db = await getDb();

    if (!db) {
        console.error("[DB] Database binding not found, returning empty array");
        return [];
    }

    try {
        const stmt = db.prepare(sql).bind(...params);
        const { results } = await stmt.all();
        console.log("[DB] Query returned", results?.length || 0, "results");
        return results || [];
    } catch (error) {
        console.error("[DB] Database query error:", error);
        throw error;
    }
}
