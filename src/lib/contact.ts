export type ContactFormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ContactFormPayload {
    nombre: string;
    email: string;
    whatsapp: string;
    servicio: 'automatizacion' | 'desarrollo' | 'consultoria';
    deadline: 'asap' | 'mes' | 'explorando';
    detalles: string;
    privacidad: boolean;
}

export interface ContactApiResponse {
    ok: boolean;
    message: string;
    whatsappUrl?: string;
    n8nSynced?: boolean;
}

const serviceLabels: Record<ContactFormPayload['servicio'], string> = {
    automatizacion: 'Automatizacion con IA',
    desarrollo: 'Desarrollo web o app',
    consultoria: 'Consultoria tecnica',
};

const deadlineLabels: Record<ContactFormPayload['deadline'], string> = {
    asap: 'Lo antes posible',
    mes: 'En el proximo mes',
    explorando: 'Estoy explorando opciones',
};

export function getServiceLabel(service: ContactFormPayload['servicio']) {
    return serviceLabels[service];
}

export function getDeadlineLabel(deadline: ContactFormPayload['deadline']) {
    return deadlineLabels[deadline];
}
