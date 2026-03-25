'use client';
import type { ContactApiResponse, ContactFormPayload, ContactFormStatus } from '@/lib/contact';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<ContactFormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [whatsappUrl, setWhatsappUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        setWhatsappUrl('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data: ContactFormPayload = {
            nombre: String(formData.get('nombre') || '').trim(),
            email: String(formData.get('email') || '').trim(),
            whatsapp: String(formData.get('whatsapp') || '').trim(),
            servicio: String(formData.get('servicio') || 'automatizacion') as ContactFormPayload['servicio'],
            deadline: String(formData.get('deadline') || 'asap') as ContactFormPayload['deadline'],
            detalles: String(formData.get('detalles') || '').trim(),
            privacidad: formData.get('privacidad') === 'on',
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = (await response.json()) as ContactApiResponse;

            if (!response.ok || !result.ok) {
                throw new Error(result.message || 'No se pudo enviar la consulta.');
            }

            setStatus('success');
            setWhatsappUrl(result.whatsappUrl || '');
            form.reset();
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Ocurrio un error inesperado');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className="py-24 px-6 max-w-4xl mx-auto" id="contacto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Hablemos de tu <span className="text-cyan-400">proyecto</span>
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                    Listo para automatizar o mejorar tus sistemas. Contame que necesitas y te respondo con una propuesta clara.
                </p>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="glass-card p-10 space-y-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre completo</label>
                        <input
                            name="nombre"
                            type="text"
                            required
                            placeholder="Tu nombre y apellido"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="tu@email.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">WhatsApp (con codigo de pais)</label>
                        <input
                            name="whatsapp"
                            type="tel"
                            placeholder="+54 9 351..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Servicio de interes</label>
                        <select
                            name="servicio"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all appearance-none"
                        >
                            <option value="automatizacion" className="bg-zinc-900">Automatizacion con IA</option>
                            <option value="desarrollo" className="bg-zinc-900">Desarrollo web / app</option>
                            <option value="consultoria" className="bg-zinc-900">Consultoria tecnica</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Cuando necesitas empezar</label>
                    <select
                        name="deadline"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all appearance-none"
                    >
                        <option value="asap" className="bg-zinc-900">Lo antes posible</option>
                        <option value="mes" className="bg-zinc-900">En el proximo mes</option>
                        <option value="explorando" className="bg-zinc-900">Estoy explorando opciones</option>
                    </select>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contame sobre tu proyecto</label>
                        <textarea
                            name="detalles"
                            rows={5}
                            required
                            placeholder="Describi que proceso queres automatizar o que app queres construir..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 resize-none"
                        />
                    </div>

                    <div className="flex items-start gap-3 ml-1">
                        <input
                            type="checkbox"
                            required
                            name="privacidad"
                            id="privacidad"
                            className="mt-1 w-4 h-4 rounded border-gray-600 bg-white/5 accent-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
                        />
                        <label htmlFor="privacidad" className="text-sm text-gray-400">
                            He leido y acepto la <Link href="/privacidad" target="_blank" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">Politica de Privacidad</Link> y entiendo que mis datos seran almacenados para el seguimiento de la consulta.
                        </label>
                    </div>
                </div>

                <button
                    disabled={status === 'loading'}
                    className={`w-full py-5 rounded-2xl text-white font-black text-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 ${status === 'success' ? 'bg-green-500 shadow-[0_10px_30px_rgba(34,197,94,0.3)]' :
                        status === 'error' ? 'bg-red-500 shadow-[0_10px_30px_rgba(239,44,44,0.3)]' :
                            'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_10px_30px_rgba(34,211,238,0.3)]'
                        }`}
                >
                    {status === 'loading' ? (
                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : status === 'success' ? (
                        <><CheckCircle2 /> Consulta enviada</>
                    ) : status === 'error' ? (
                        <><AlertCircle /> Error en el envio</>
                    ) : (
                        <><Send size={20} /> Enviar consulta</>
                    )}
                </button>

                {status === 'error' && (
                    <p className="text-red-400 text-sm text-center font-medium animate-pulse">
                        {errorMessage || 'Hubo un problema. Por favor, intenta de nuevo.'}
                    </p>
                )}

                {status === 'success' && whatsappUrl && (
                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-center space-y-3">
                        <p className="text-sm text-green-100">
                            Ya guarde tu consulta. Si queres, podes seguir por WhatsApp para acelerar el presupuesto.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-black text-white transition-all hover:brightness-110"
                        >
                            <MessageCircle size={18} /> Continuar por WhatsApp
                        </a>
                    </div>
                )}
            </motion.form>
        </section>
    );
}
