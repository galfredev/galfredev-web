export interface ClientProfile {
    id: string;
    created_at: string;
    updated_at: string;
    email: string;
    full_name: string | null;
    company: string | null;
    whatsapp: string | null;
    avatar_url: string | null;
    role: 'client' | 'admin';
    notes: string | null;
    newsletter_opt_in: boolean;
}

export interface ServiceOrder {
    id: string;
    created_at: string;
    updated_at: string;
    client_id: string;
    title: string;
    service_type: string;
    status: 'planning' | 'active' | 'review' | 'delivered' | 'paused';
    priority: 'low' | 'medium' | 'high';
    progress: number;
    summary: string | null;
    budget_range: string | null;
    monthly_roi_estimate: number | null;
    monthly_hours_saved: number | null;
    purchased_at: string | null;
    due_date: string | null;
}

export interface ServiceUpdate {
    id: string;
    created_at: string;
    updated_at: string;
    order_id: string;
    author_id: string | null;
    title: string;
    body: string;
    progress: number;
    visibility: 'internal' | 'client';
}

export interface OrderDeliverable {
    id: string;
    created_at: string;
    updated_at: string;
    order_id: string;
    title: string;
    description: string | null;
    deliverable_type: 'link' | 'document' | 'repository' | 'video';
    file_url: string | null;
    status: 'draft' | 'published';
    published_at: string | null;
}

export interface ContactLead {
    id: string;
    created_at: string;
    nombre: string;
    email: string;
    whatsapp: string | null;
    servicio: string;
    deadline: string;
    detalles: string;
    privacidad_aceptada: boolean;
    source: string | null;
    status: string | null;
}

export interface NewsletterSubscriber {
    id: string;
    created_at: string;
    updated_at: string;
    email: string;
    full_name: string | null;
    whatsapp: string | null;
    source: string | null;
    status: string | null;
    tags: string[] | null;
}
