import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
    try {
        // Check if getRequestContext works
        let contextInfo = { available: false };
        try {
            const ctx = getRequestContext();
            contextInfo = {
                available: true,
                hasEnv: !!ctx?.env,
                hasDB: !!ctx?.env?.DB,
                envKeys: ctx?.env ? Object.keys(ctx.env) : []
            };
        } catch (e) {
            contextInfo = { available: false, error: e.message };
        }

        return Response.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            context: contextInfo
        });
    } catch (error) {
        return Response.json({
            status: 'error',
            error: error.message
        }, { status: 500 });
    }
}
