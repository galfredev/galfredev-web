export interface Project {
    id: string;
    title: string;
    description: string;
    status: 'planning' | 'in-progress' | 'testing' | 'deployed';
    progress: number; // 0-100
    tags: string[];
    client_id: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    email: string;
    full_name: string;
    role: 'client' | 'admin';
    company?: string;
    avatar_url?: string;
}

export interface Lead {
    id: string;
    name: string;
    email: string;
    whatsapp?: string;
    company?: string;
    service: string;
    timeline: string;
    details: string;
    source: string;
    status: 'new' | 'contacted' | 'proposal' | 'won' | 'lost';
    created_at: string;
}
