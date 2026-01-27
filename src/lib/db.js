import { getRequestContext } from '@cloudflare/next-on-pages';




export async function getDb() {
    try {
        const { env } = getRequestContext();
        return env.DB;
    } catch (e) {
        // Fallback for local development if not running in pages dev
        if (process.env.DB) {
            return process.env.DB;
        }
        console.warn("Could not retrieve DB binding via getRequestContext or process.env");
        return null;
    }
}

// Helper to execute query
export async function query(sql, params = []) {
    const db = await getDb();

    if (!db) {
        console.error("Database binding not found");
        return [];
    }

    try {
        const stmt = db.prepare(sql).bind(...params);
        const { results } = await stmt.all();
        return results;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
}
