export const runtime = 'edge';

export async function GET() {
    try {
        const env = process.env;
        const globalDB = globalThis.DB;
        const envDB = process.env.DB;

        return Response.json({
            status: 'ok',
            envKeys: Object.keys(env || {}),
            hasGlobalDB: !!globalDB,
            hasEnvDB: !!envDB,
            globalDBType: typeof globalDB,
            // Don't log the actual object if it's sensitive, but D1 binding structure is safe-ish to check keys
            dbKeys: globalDB ? Object.keys(globalDB) : null
        });
    } catch (error) {
        return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
