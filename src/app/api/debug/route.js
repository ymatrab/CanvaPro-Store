import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = 'edge';

export async function GET() {
    try {
        let contextInfo = { available: false };
        try {
            const { env } = await getCloudflareContext();
            contextInfo = {
                available: true,
                hasEnv: !!env,
                hasDB: !!env?.DB,
                envKeys: env ? Object.keys(env) : []
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
