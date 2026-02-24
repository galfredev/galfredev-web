'use client';
import { sendToN8N } from '@/lib/n8n';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // 1. Save to Supabase
            const { error: supabaseError } = await supabase
                .from('contacts')
                .insert([{
                    nombre: data.nombre,
                    email: data.email,
                    whatsapp: data.whatsapp,
                    servicio: data.servicio,
                    deadline: data.deadline,
                    detalles: data.detalles,
                    privacidad_aceptada: data.privacidad === 'on'
                }]);

            if (supabaseError) throw new Error('Error saving to database');

            // 2. Sync to n8n for automation
            const n8nSuccess = await sendToN8N(data);

            // We consider it success even if n8n fails (for the user),
            // but we could log it. Supabase is our source of truth.
            setStatus('success');
            form.reset();
        } catch (error: any) {
            console.error('Submission Error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Ocurrió un error inesperado');
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
                    ¿Listo para automatizar? Contame qué necesitás y te respondo con propuestas concretas.
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
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre Completo</label>
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
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">WhatsApp (con código de país)</label>
                        <input
                            name="whatsapp"
                            type="tel"
                            placeholder="+54 9 351..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Servicio de Interés</label>
                        <select
                            name="servicio"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all appearance-none"
                        >
                            <option value="automatizacion" className="bg-zinc-900">Automatización con IA</option>
                            <option value="desarrollo" className="bg-zinc-900">Desarrollo Web / App</option>
                            <option value="consultoria" className="bg-zinc-900">Consultoría Técnica</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">¿Cuándo necesitás empezar?</label>
                    <select
                        name="deadline"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-400 focus:bg-white/10 outline-none transition-all appearance-none"
                    >
                        <option value="asap" className="bg-zinc-900">Lo antes posible</option>
                        <option value="mes" className="bg-zinc-900">En el próximo mes</option>
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
                            placeholder="Describí qué proceso querés automatizar o qué app querés construir..."
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
                            He leído y acepto la <a href="/privacidad" target="_blank" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">Política de Privacidad</a> y entiendo que mis datos serán almacenados para el seguimiento de la consulta.
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
                        <><CheckCircle2 /> ¡Propuesta Enviada!</>
                    ) : status === 'error' ? (
                        <><AlertCircle /> Error en el envío</>
                    ) : (
                        <><Send size={20} /> Enviar Propuesta</>
                    )}
                </button>

                {status === 'error' && (
                    <p className="text-red-400 text-sm text-center font-medium animate-pulse">
                        {errorMessage || "Hubo un problema. Por favor, intentá de nuevo."}
                    </p>
                )}
            </motion.form>
        </section>
    );
}
