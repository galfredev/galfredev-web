import { buildWhatsAppUrl } from '@/lib/site';
import type { ContactApiResponse, ContactFormPayload } from '@/lib/contact';
import { getDeadlineLabel, getServiceLabel } from '@/lib/contact';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isValidPayload(payload: unknown): payload is ContactFormPayload {
    if (!payload || typeof payload !== 'object') {
        return false;
    }

    const candidate = payload as Record<string, unknown>;

    return (
        typeof candidate.nombre === 'string' &&
        typeof candidate.email === 'string' &&
        typeof candidate.whatsapp === 'string' &&
        typeof candidate.servicio === 'string' &&
        typeof candidate.deadline === 'string' &&
        typeof candidate.detalles === 'string' &&
        typeof candidate.privacidad === 'boolean'
    );
}

export async function POST(request: Request) {
    let payload: unknown;

    try {
        payload = await request.json();
    } catch {
        return NextResponse.json<ContactApiResponse>(
            { ok: false, message: 'No se pudo leer el formulario enviado.' },
            { status: 400 }
        );
    }

    if (!isValidPayload(payload)) {
        return NextResponse.json<ContactApiResponse>(
            { ok: false, message: 'Los datos del formulario no son validos.' },
            { status: 400 }
        );
    }

    const nombre = payload.nombre.trim();
    const email = payload.email.trim();
    const whatsapp = payload.whatsapp.trim();
    const detalles = payload.detalles.trim();

    if (!nombre || !email || !detalles || !payload.privacidad) {
        return NextResponse.json<ContactApiResponse>(
            { ok: false, message: 'Completa los campos obligatorios y acepta la politica de privacidad.' },
            { status: 400 }
        );
    }

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json<ContactApiResponse>(
            { ok: false, message: 'Falta configurar Supabase en el entorno del proyecto.' },
            { status: 500 }
        );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: insertError } = await supabase.from('contacts').insert([
        {
            nombre,
            email,
            whatsapp,
            servicio: payload.servicio,
            deadline: payload.deadline,
            detalles,
            privacidad_aceptada: payload.privacidad,
        },
    ]);

    if (insertError) {
        return NextResponse.json<ContactApiResponse>(
            {
                ok: false,
                message: 'No se pudo guardar el contacto en Supabase. Revisa la tabla contacts y sus politicas.',
            },
            { status: 500 }
        );
    }

    await supabase.from('newsletter_subscribers').upsert(
        [
            {
                email,
                full_name: nombre,
                whatsapp,
                source: 'contact_form',
                status: 'active',
                tags: ['lead', payload.servicio],
            },
        ],
        { onConflict: 'email' }
    );

    const serviceLabel = getServiceLabel(payload.servicio);
    const deadlineLabel = getDeadlineLabel(payload.deadline);
    const whatsappMessage = [
        'Hola, vengo desde la web de GalfreDev.',
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        whatsapp ? `WhatsApp: ${whatsapp}` : '',
        `Servicio: ${serviceLabel}`,
        `Inicio estimado: ${deadlineLabel}`,
        `Detalles: ${detalles}`,
    ]
        .filter(Boolean)
        .join('\n');

    const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    let n8nSynced = false;

    if (webhookUrl) {
        try {
            const n8nResponse = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    email,
                    whatsapp,
                    empresa: '',
                    servicio: serviceLabel,
                    timeline: deadlineLabel,
                    mensaje: detalles,
                    como_encontro: 'web_galfredev',
                    source: 'web',
                    whatsapp_url: whatsappUrl,
                    timestamp: new Date().toISOString(),
                    version: 'v3-next-api',
                }),
            });

            n8nSynced = n8nResponse.ok;
        } catch {
            n8nSynced = false;
        }
    }

    return NextResponse.json<ContactApiResponse>({
        ok: true,
        message: n8nSynced
            ? 'Consulta enviada. Tambien se sincronizo con tu automatizacion.'
            : 'Consulta enviada. Supabase quedo registrado correctamente.',
        whatsappUrl,
        n8nSynced,
    });
}
