'use client';
import PortalAdminForms from '@/components/PortalAdminForms';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type {
    ClientProfile,
    ContactLead,
    NewsletterSubscriber,
    OrderDeliverable,
    ServiceOrder,
    ServiceUpdate,
} from '@/types';
import {
    BellRing,
    CalendarClock,
    CheckCheck,
    ChevronRight,
    FileStack,
    LayoutDashboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessagesSquare,
    Rocket,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    User as UserIcon,
    Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type DashboardTab = 'overview' | 'orders' | 'updates' | 'deliverables' | 'profile' | 'crm' | 'admin';

function formatDate(value: string | null) {
    if (!value) return 'Sin fecha';
    return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
}

function formatAmount(value: number | null | undefined) {
    return Number(value || 0).toLocaleString('es-AR');
}

function getStatusLabel(status: ServiceOrder['status']) {
    const labels: Record<ServiceOrder['status'], string> = {
        planning: 'Planificacion',
        active: 'En ejecucion',
        review: 'En revision',
        delivered: 'Entregado',
        paused: 'Pausado',
    };
    return labels[status];
}

export default function ClientPortal() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<ClientProfile | null>(null);
    const [orders, setOrders] = useState<ServiceOrder[]>([]);
    const [updates, setUpdates] = useState<ServiceUpdate[]>([]);
    const [deliverables, setDeliverables] = useState<OrderDeliverable[]>([]);
    const [contacts, setContacts] = useState<ContactLead[]>([]);
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [clients, setClients] = useState<ClientProfile[]>([]);
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const isAdmin = profile?.role === 'admin';
    const providers = Array.isArray(user?.app_metadata?.providers) ? user.app_metadata.providers : [];
    const ordersById = useMemo(() => new Map(orders.map((order) => [order.id, order])), [orders]);
    const clientVisibleUpdates = updates.filter((update) => update.visibility === 'client');
    const publishedDeliverables = deliverables.filter((deliverable) => deliverable.status === 'published');
    const totalROI = orders.reduce((acc, order) => acc + Number(order.monthly_roi_estimate || 0), 0);
    const totalHours = orders.reduce((acc, order) => acc + Number(order.monthly_hours_saved || 0), 0);

    async function loadPortalData() {
        setLoading(true);
        setErrorMessage('');

        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) {
            router.push('/login');
            return;
        }

        setUser(authUser);

        await supabase.from('client_profiles').upsert(
            [{
                id: authUser.id,
                email: authUser.email || '',
                full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || null,
                avatar_url: authUser.user_metadata?.avatar_url || null,
            }],
            { onConflict: 'id' }
        );

        const { data: profileData, error: profileError } = await supabase.from('client_profiles').select('*').eq('id', authUser.id).single();
        if (profileError || !profileData) {
            setErrorMessage('No pude cargar el perfil del portal.');
            setLoading(false);
            return;
        }

        setProfile(profileData as ClientProfile);

        const [ordersResult, updatesResult, deliverablesResult, contactsResult, subscribersResult, clientsResult] = await Promise.all([
            supabase.from('service_orders').select('*').order('created_at', { ascending: false }),
            supabase.from('service_updates').select('*').order('created_at', { ascending: false }),
            supabase.from('order_deliverables').select('*').order('created_at', { ascending: false }),
            supabase.from('contacts').select('*').order('created_at', { ascending: false }),
            supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
            supabase.from('client_profiles').select('*').order('created_at', { ascending: false }),
        ]);

        setOrders((ordersResult.data || []) as ServiceOrder[]);
        setUpdates((updatesResult.data || []) as ServiceUpdate[]);
        setDeliverables((deliverablesResult.data || []) as OrderDeliverable[]);
        setContacts((contactsResult.data || []) as ContactLead[]);
        setSubscribers((subscribersResult.data || []) as NewsletterSubscriber[]);
        setClients((clientsResult.data || []) as ClientProfile[]);

        if (ordersResult.error || updatesResult.error || deliverablesResult.error) {
            setErrorMessage('Se cargo el portal, pero faltan algunas tablas o politicas del nuevo schema.');
        }

        setLoading(false);
    }

    useEffect(() => {
        loadPortalData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function createOrder(payload: {
        client_id: string;
        title: string;
        service_type: string;
        summary: string;
        budget_range: string;
        due_date: string;
    }) {
        setSaving(true);
        setSuccessMessage('');
        setErrorMessage('');
        const { error } = await supabase.from('service_orders').insert([{
            client_id: payload.client_id,
            title: payload.title,
            service_type: payload.service_type,
            summary: payload.summary,
            budget_range: payload.budget_range,
            due_date: payload.due_date || null,
            status: 'active',
            priority: 'medium',
            progress: 0,
        }]);
        if (error) setErrorMessage('No pude crear la orden.');
        else {
            setSuccessMessage('Orden creada correctamente.');
            await loadPortalData();
        }
        setSaving(false);
    }

    async function createUpdate(payload: {
        order_id: string;
        title: string;
        body: string;
        progress: number;
        visibility: 'client' | 'internal';
    }) {
        setSaving(true);
        setSuccessMessage('');
        setErrorMessage('');
        const { error } = await supabase.from('service_updates').insert([{
            order_id: payload.order_id,
            author_id: profile?.id,
            title: payload.title,
            body: payload.body,
            progress: payload.progress,
            visibility: payload.visibility,
        }]);
        if (error) setErrorMessage('No pude publicar el avance.');
        else {
            await supabase.from('service_orders').update({ progress: payload.progress }).eq('id', payload.order_id);
            setSuccessMessage('Avance publicado correctamente.');
            await loadPortalData();
        }
        setSaving(false);
    }

    async function createDeliverable(payload: {
        order_id: string;
        title: string;
        description: string;
        file_url: string;
        deliverable_type: 'link' | 'document' | 'repository' | 'video';
        status: 'draft' | 'published';
    }) {
        setSaving(true);
        setSuccessMessage('');
        setErrorMessage('');
        const { error } = await supabase.from('order_deliverables').insert([{
            order_id: payload.order_id,
            title: payload.title,
            description: payload.description,
            file_url: payload.file_url || null,
            deliverable_type: payload.deliverable_type,
            status: payload.status,
            published_at: payload.status === 'published' ? new Date().toISOString() : null,
        }]);
        if (error) setErrorMessage('No pude guardar el entregable.');
        else {
            setSuccessMessage('Entregable guardado correctamente.');
            await loadPortalData();
        }
        setSaving(false);
    }

    const tabs: Array<{ id: DashboardTab; label: string; icon: React.ReactNode; hidden?: boolean }> = [
        { id: 'overview', label: 'Resumen', icon: <LayoutDashboard size={16} /> },
        { id: 'orders', label: 'Pedidos', icon: <Workflow size={16} /> },
        { id: 'updates', label: 'Avances', icon: <Rocket size={16} /> },
        { id: 'deliverables', label: 'Entregables', icon: <FileStack size={16} /> },
        { id: 'profile', label: 'Perfil', icon: <UserIcon size={16} /> },
        { id: 'crm', label: 'Contactos', icon: <Mail size={16} />, hidden: !isAdmin },
        { id: 'admin', label: 'Panel Interno', icon: <ShieldCheck size={16} />, hidden: !isAdmin },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Sincronizando GalfreDev Hub...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white bg-dot-pattern selection:bg-cyan-500/30">
            <div className="max-w-[1680px] mx-auto flex flex-col lg:flex-row min-h-screen">
                <aside className="w-full lg:w-80 border-r border-white/5 p-8 flex flex-col justify-between bg-black/60 backdrop-blur-xl">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                <LayoutDashboard size={20} className="text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-black font-heading tracking-tighter">Galfre<span className="text-cyan-400">Dev</span></span>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.25em] mt-1">Portal Inteligente</p>
                            </div>
                        </div>

                        <div className="glass-card p-5 border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-cyan-500/15 text-sm font-black uppercase text-cyan-300">
                                    {profile?.full_name?.slice(0, 2) || user?.email?.slice(0, 2) || 'GD'}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-black text-white truncate">{profile?.full_name || user?.email?.split('@')[0]}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold truncate">{profile?.company || user?.email}</p>
                                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-cyan-300">
                                        <Sparkles size={10} /> {isAdmin ? 'Administrador' : 'Cliente'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {tabs.filter((tab) => !tab.hidden).map((tab) => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-left transition-all ${activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="glass-card p-5 border-white/5 space-y-4">
                            <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-[0.25em]">
                                <BellRing size={14} /> Providers
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {providers.length > 0 ? providers.map((provider) => (
                                    <span key={provider} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">{provider}</span>
                                )) : <span className="text-xs text-gray-500">Sin providers detectados todavia.</span>}
                            </div>
                        </div>
                    </div>

                    <button onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-500 hover:bg-red-500/10 font-black text-xs uppercase tracking-widest transition-all mt-12 border border-transparent hover:border-red-500/20">
                        <LogOut size={16} /> Cerrar Sesion
                    </button>
                </aside>

                <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                    <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12">
                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tighter">Centro de <span className="text-cyan-400">Clientes</span></h2>
                            <p className="text-gray-400 max-w-2xl">Pedidos, avances, entregables, CRM y comunicacion unificados en una sola experiencia.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {[
                                ['ROI mensual', `US$ ${formatAmount(totalROI)}`, <TrendingUp size={18} className="text-emerald-400" key="roi" />],
                                ['Horas ahorradas', `${formatAmount(totalHours)} hs`, <CalendarClock size={18} className="text-cyan-400" key="hours" />],
                                ['Entregables', `${publishedDeliverables.length}`, <CheckCheck size={18} className="text-blue-400" key="deliverables" />],
                            ].map(([label, value, icon]) => (
                                <div key={String(label)} className="glass-card px-4 py-3 border-white/5 min-w-[170px]">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{label}</p>
                                            <p className="text-2xl font-black text-white mt-1">{value}</p>
                                        </div>
                                        {icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </header>

                    {errorMessage && <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">{errorMessage}</div>}
                    {successMessage && <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">{successMessage}</div>}

                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
                            <section className="glass-card p-8 border-white/5">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black font-heading uppercase tracking-tight flex items-center gap-3"><ChevronRight className="text-cyan-500" /> Ordenes recientes</h3>
                                    <button onClick={() => setActiveTab('orders')} className="text-xs text-cyan-400 font-black uppercase tracking-widest">Ver todas</button>
                                </div>
                                <div className="space-y-4">
                                    {orders.slice(0, 4).map((order) => (
                                        <div key={order.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                                            <div className="flex justify-between gap-4">
                                                <div>
                                                    <p className="text-white text-lg font-black">{order.title}</p>
                                                    <p className="text-gray-500 text-sm mt-1">{order.summary || order.service_type}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">{getStatusLabel(order.status)}</p>
                                                    <p className="text-white text-xl font-black mt-1">{order.progress}%</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 h-1.5 w-full rounded-full bg-white/5 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" style={{ width: `${order.progress}%` }} /></div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section className="glass-card p-8 border-white/5">
                                <div className="flex items-center gap-3 mb-8"><MessagesSquare className="text-cyan-500" /><h3 className="text-xl font-black font-heading uppercase tracking-tight">Ultimos avances</h3></div>
                                <div className="space-y-4">
                                    {clientVisibleUpdates.slice(0, 4).map((update) => (
                                        <div key={update.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                                            <p className="text-white font-black">{update.title}</p>
                                            <p className="text-gray-500 text-sm mt-1">{ordersById.get(update.order_id)?.title || 'Orden relacionada'}</p>
                                            <p className="text-gray-300 text-sm mt-4 leading-relaxed">{update.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'orders' && <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">{orders.map((order) => <div key={order.id} className="glass-card p-7 border-white/5"><div className="flex justify-between gap-4"><div><p className="text-white text-2xl font-black font-heading">{order.title}</p><p className="text-cyan-400 text-[10px] uppercase tracking-[0.2em] font-black mt-2">{order.service_type}</p></div><div className="text-right"><span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-300">{getStatusLabel(order.status)}</span><p className="text-gray-500 text-xs mt-3">Entrega: {formatDate(order.due_date)}</p></div></div><p className="text-gray-400 text-sm leading-relaxed mt-5">{order.summary || 'Sin resumen cargado todavia.'}</p><div className="grid grid-cols-2 gap-4 mt-6"><div className="rounded-2xl bg-white/[0.03] p-4 border border-white/5"><p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Progreso</p><p className="text-3xl font-black text-white mt-2">{order.progress}%</p></div><div className="rounded-2xl bg-white/[0.03] p-4 border border-white/5"><p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">ROI mensual</p><p className="text-3xl font-black text-white mt-2">US$ {formatAmount(order.monthly_roi_estimate)}</p></div></div></div>)}</div>}

                    {activeTab === 'updates' && <div className="space-y-4">{updates.map((update) => <div key={update.id} className="glass-card p-6 border-white/5"><div className="flex justify-between gap-4"><div><p className="text-white text-lg font-black">{update.title}</p><p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-black mt-2">{ordersById.get(update.order_id)?.title || 'Orden no encontrada'}</p></div><div className="text-right"><p className="text-cyan-400 text-[10px] uppercase tracking-widest font-black">{update.visibility === 'client' ? 'Visible para cliente' : 'Nota interna'}</p><p className="text-white font-black mt-2">{formatDate(update.created_at)}</p></div></div><p className="text-gray-300 text-sm leading-relaxed mt-5">{update.body}</p></div>)}</div>}

                    {activeTab === 'deliverables' && <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">{deliverables.map((deliverable) => <div key={deliverable.id} className="glass-card p-6 border-white/5"><div className="flex items-center justify-between gap-4"><div><p className="text-white text-lg font-black">{deliverable.title}</p><p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-black mt-2">{ordersById.get(deliverable.order_id)?.title || 'Orden no encontrada'}</p></div><span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${deliverable.status === 'published' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/5 text-gray-400'}`}>{deliverable.status === 'published' ? 'Publicado' : 'Borrador'}</span></div><p className="text-gray-300 text-sm leading-relaxed mt-5">{deliverable.description || 'Sin descripcion extra.'}</p>{deliverable.file_url && <a href={deliverable.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex mt-5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-300">Abrir recurso</a>}</div>)}</div>}

                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
                            <div className="glass-card p-8 border-white/5 space-y-5">
                                <div className="flex items-center gap-4 mb-4"><div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-cyan-500/15 text-xl font-black uppercase text-cyan-300">{profile?.full_name?.slice(0, 2) || user?.email?.slice(0, 2) || 'GD'}</div><div><p className="text-white text-2xl font-black">{profile?.full_name || 'Completar nombre'}</p><p className="text-gray-500 text-sm">{profile?.email}</p></div></div>
                                <div><p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Empresa</p><p className="text-white mt-2">{profile?.company || 'Todavia no definida'}</p></div>
                                <div><p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">WhatsApp</p><p className="text-white mt-2">{profile?.whatsapp || 'No cargado'}</p></div>
                                <div><p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Rol</p><p className="text-white mt-2">{isAdmin ? 'Administrador' : 'Cliente'}</p></div>
                            </div>
                            <div className="glass-card p-8 border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    ['Seguimiento de pedidos', 'Cada servicio contratado vive como una orden con estado, progreso y fecha objetivo.'],
                                    ['Avances y checkpoints', 'Podes publicar hitos visibles para el cliente o notas internas para tu operativa.'],
                                    ['Entregables centralizados', 'Links, repositorios, documentos o videos accesibles desde una sola interfaz.'],
                                    ['CRM y newsletter', 'Leads, contactos y suscriptores guardados para seguimiento comercial y campañas.'],
                                ].map(([title, body]) => <div key={String(title)} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><p className="text-cyan-400 font-black text-sm uppercase tracking-widest">{title}</p><p className="text-gray-400 text-sm leading-relaxed mt-3">{body}</p></div>)}
                            </div>
                        </div>
                    )}

                    {activeTab === 'crm' && isAdmin && (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <div className="glass-card p-8 border-white/5 space-y-4 max-h-[620px] overflow-y-auto">
                                <div className="flex items-center gap-3 mb-2"><Mail className="text-cyan-500" /><h3 className="text-xl font-black font-heading uppercase tracking-tight">Leads y contactos</h3></div>
                                {contacts.map((contact) => <div key={contact.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-white font-black">{contact.nombre}</p><p className="text-gray-500 text-sm mt-1">{contact.email}</p></div><span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-300">{contact.servicio}</span></div><p className="text-gray-300 text-sm mt-4 leading-relaxed">{contact.detalles}</p></div>)}
                            </div>
                            <div className="glass-card p-8 border-white/5 space-y-4 max-h-[620px] overflow-y-auto">
                                <div className="flex items-center gap-3 mb-2"><BellRing className="text-cyan-500" /><h3 className="text-xl font-black font-heading uppercase tracking-tight">Newsletter</h3></div>
                                {subscribers.map((subscriber) => <div key={subscriber.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><p className="text-white font-black">{subscriber.full_name || subscriber.email}</p><p className="text-gray-500 text-sm mt-1">{subscriber.email}</p><div className="mt-4 flex flex-wrap gap-2">{(subscriber.tags || []).map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-gray-300">{tag}</span>)}</div></div>)}
                            </div>
                        </div>
                    )}

                    {activeTab === 'admin' && isAdmin && (
                        <div className="space-y-8">
                            <div className="glass-card p-8 border-cyan-500/10 bg-cyan-500/5 ring-1 ring-cyan-500/20">
                                <div className="flex items-center gap-3 mb-4"><ShieldCheck className="text-cyan-400" /><h3 className="text-xl font-black font-heading uppercase tracking-tight">Panel interno de GalfreDev</h3></div>
                                <p className="text-gray-300 text-sm max-w-3xl">Desde aca podes crear ordenes, publicar avances y cargar entregables para que el portal se convierta en una herramienta real de seguimiento comercial y operativo.</p>
                            </div>
                            <PortalAdminForms clients={clients} orders={orders} saving={saving} onCreateOrder={createOrder} onCreateUpdate={createUpdate} onCreateDeliverable={createDeliverable} />
                        </div>
                    )}

                    <div className="mt-12 p-8 glass-card border-white/5 bg-gradient-to-r from-cyan-900/10 to-transparent flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4 text-center md:text-left">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"><LifeBuoy size={24} /></div>
                            <div>
                                <h4 className="font-black text-white">Queres sumar otro servicio o pedir soporte?</h4>
                                <p className="text-gray-500 text-xs">La misma cuenta del portal te sirve para futuras automatizaciones, seguimientos y entregas.</p>
                            </div>
                        </div>
                        <Link href="/#contacto" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">Hablar con GalfreDev</Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
