'use client';
import type { ClientProfile, ServiceOrder } from '@/types';
import { FileStack, Plus, Rocket } from 'lucide-react';
import { useState } from 'react';

interface OrderForm {
    client_id: string;
    title: string;
    service_type: string;
    summary: string;
    budget_range: string;
    due_date: string;
}

interface UpdateForm {
    order_id: string;
    title: string;
    body: string;
    progress: number;
    visibility: 'client' | 'internal';
}

interface DeliverableForm {
    order_id: string;
    title: string;
    description: string;
    file_url: string;
    deliverable_type: 'link' | 'document' | 'repository' | 'video';
    status: 'draft' | 'published';
}

interface PortalAdminFormsProps {
    clients: ClientProfile[];
    orders: ServiceOrder[];
    saving: boolean;
    onCreateOrder: (payload: OrderForm) => Promise<void>;
    onCreateUpdate: (payload: UpdateForm) => Promise<void>;
    onCreateDeliverable: (payload: DeliverableForm) => Promise<void>;
}

export default function PortalAdminForms({
    clients,
    orders,
    saving,
    onCreateOrder,
    onCreateUpdate,
    onCreateDeliverable,
}: PortalAdminFormsProps) {
    const [orderForm, setOrderForm] = useState<OrderForm>({
        client_id: '',
        title: '',
        service_type: 'Automatizacion con IA',
        summary: '',
        budget_range: '',
        due_date: '',
    });
    const [updateForm, setUpdateForm] = useState<UpdateForm>({
        order_id: '',
        title: '',
        body: '',
        progress: 0,
        visibility: 'client',
    });
    const [deliverableForm, setDeliverableForm] = useState<DeliverableForm>({
        order_id: '',
        title: '',
        description: '',
        file_url: '',
        deliverable_type: 'link',
        status: 'published',
    });

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await onCreateOrder(orderForm);
                    setOrderForm({
                        client_id: '',
                        title: '',
                        service_type: 'Automatizacion con IA',
                        summary: '',
                        budget_range: '',
                        due_date: '',
                    });
                }}
                className="glass-card p-6 border-white/5 space-y-4"
            >
                <div className="flex items-center gap-3">
                    <Plus className="text-cyan-400" />
                    <h4 className="font-black text-white uppercase tracking-widest text-sm">Nueva orden</h4>
                </div>
                <select value={orderForm.client_id} onChange={(e) => setOrderForm((prev) => ({ ...prev, client_id: e.target.value }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required>
                    <option value="">Seleccionar cliente</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {(client.full_name || client.email) + (client.role === 'admin' ? ' (admin)' : '')}
                        </option>
                    ))}
                </select>
                <input value={orderForm.title} onChange={(e) => setOrderForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Titulo de la orden" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required />
                <input value={orderForm.service_type} onChange={(e) => setOrderForm((prev) => ({ ...prev, service_type: e.target.value }))} placeholder="Servicio" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required />
                <input value={orderForm.budget_range} onChange={(e) => setOrderForm((prev) => ({ ...prev, budget_range: e.target.value }))} placeholder="Rango de presupuesto" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" />
                <input type="date" value={orderForm.due_date} onChange={(e) => setOrderForm((prev) => ({ ...prev, due_date: e.target.value }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" />
                <textarea value={orderForm.summary} onChange={(e) => setOrderForm((prev) => ({ ...prev, summary: e.target.value }))} placeholder="Resumen del alcance" rows={4} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500 resize-none" />
                <button disabled={saving} className="w-full rounded-xl bg-white text-black py-3 font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">Crear orden</button>
            </form>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await onCreateUpdate(updateForm);
                    setUpdateForm({
                        order_id: '',
                        title: '',
                        body: '',
                        progress: 0,
                        visibility: 'client',
                    });
                }}
                className="glass-card p-6 border-white/5 space-y-4"
            >
                <div className="flex items-center gap-3">
                    <Rocket className="text-cyan-400" />
                    <h4 className="font-black text-white uppercase tracking-widest text-sm">Publicar avance</h4>
                </div>
                <select value={updateForm.order_id} onChange={(e) => setUpdateForm((prev) => ({ ...prev, order_id: e.target.value }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required>
                    <option value="">Seleccionar orden</option>
                    {orders.map((order) => (
                        <option key={order.id} value={order.id}>{order.title}</option>
                    ))}
                </select>
                <input value={updateForm.title} onChange={(e) => setUpdateForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Titulo del avance" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required />
                <textarea value={updateForm.body} onChange={(e) => setUpdateForm((prev) => ({ ...prev, body: e.target.value }))} placeholder="Explica que se hizo y que sigue." rows={5} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500 resize-none" required />
                <input type="number" min={0} max={100} value={updateForm.progress} onChange={(e) => setUpdateForm((prev) => ({ ...prev, progress: Number(e.target.value) }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required />
                <select value={updateForm.visibility} onChange={(e) => setUpdateForm((prev) => ({ ...prev, visibility: e.target.value as UpdateForm['visibility'] }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500">
                    <option value="client">Visible para cliente</option>
                    <option value="internal">Interna</option>
                </select>
                <button disabled={saving} className="w-full rounded-xl bg-white text-black py-3 font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">Publicar avance</button>
            </form>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await onCreateDeliverable(deliverableForm);
                    setDeliverableForm({
                        order_id: '',
                        title: '',
                        description: '',
                        file_url: '',
                        deliverable_type: 'link',
                        status: 'published',
                    });
                }}
                className="glass-card p-6 border-white/5 space-y-4"
            >
                <div className="flex items-center gap-3">
                    <FileStack className="text-cyan-400" />
                    <h4 className="font-black text-white uppercase tracking-widest text-sm">Nuevo entregable</h4>
                </div>
                <select value={deliverableForm.order_id} onChange={(e) => setDeliverableForm((prev) => ({ ...prev, order_id: e.target.value }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required>
                    <option value="">Seleccionar orden</option>
                    {orders.map((order) => (
                        <option key={order.id} value={order.id}>{order.title}</option>
                    ))}
                </select>
                <input value={deliverableForm.title} onChange={(e) => setDeliverableForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Titulo del entregable" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" required />
                <input value={deliverableForm.file_url} onChange={(e) => setDeliverableForm((prev) => ({ ...prev, file_url: e.target.value }))} placeholder="URL del recurso" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500" />
                <select value={deliverableForm.deliverable_type} onChange={(e) => setDeliverableForm((prev) => ({ ...prev, deliverable_type: e.target.value as DeliverableForm['deliverable_type'] }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500">
                    <option value="link">Link</option>
                    <option value="document">Documento</option>
                    <option value="repository">Repositorio</option>
                    <option value="video">Video</option>
                </select>
                <select value={deliverableForm.status} onChange={(e) => setDeliverableForm((prev) => ({ ...prev, status: e.target.value as DeliverableForm['status'] }))} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500">
                    <option value="published">Publicado</option>
                    <option value="draft">Borrador</option>
                </select>
                <textarea value={deliverableForm.description} onChange={(e) => setDeliverableForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Descripcion para el cliente" rows={4} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-500 resize-none" />
                <button disabled={saving} className="w-full rounded-xl bg-white text-black py-3 font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">Guardar entregable</button>
            </form>
        </div>
    );
}
