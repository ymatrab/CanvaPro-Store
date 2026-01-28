// Helper to execute query
export async function query(sql, params = []) {
    console.log("[DB] Executing query:", sql.substring(0, 100), "params:", params);

    // In Cloudflare Pages, we need to access the binding from the platform context
    // The binding will be available via process.env in the Cloudflare environment
    try {
        // Try to get DB from global context (Cloudflare Pages Workers)
        // @ts-ignore - globalThis.DB is injected by Cloudflare
        const db = globalThis.DB || process.env.DB;

        if (!db) {
            console.error("[DB] Database binding not found in globalThis or process.env");
            return [];
        }

        console.log("[DB] Successfully accessed DB binding");
        const stmt = db.prepare(sql).bind(...params);
        const { results } = await stmt.all();
        console.log("[DB] Query returned", results?.length || 0, "results");
        return results || [];
    } catch (error) {
        console.error("[DB] Database query error:", error);
        // Return empty array instead of throwing to prevent crashes
        return [];
    }
}
