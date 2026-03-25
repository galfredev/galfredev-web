import type { ContactFormPayload } from '@/lib/contact';

export async function sendToN8N(payload: ContactFormPayload) {
    const url = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...payload,
                timestamp: new Date().toISOString(),
                version: 'v2.0-nextjs',
            }),
        });
        return response.ok;
    } catch (error) {
        console.error('N8N Sync Error:', error);
        return false;
    }
}
