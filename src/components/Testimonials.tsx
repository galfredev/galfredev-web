'use client';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "Martín Acosta",
        role: "CEO — TechStart AR",
        content: "GalfreDev automatizó nuestro proceso de onboarding de clientes. Lo que antes tomaba 3 horas, ahora se hace solo en 5 minutos. ROI inmediato.",
        avatar: "MA",
        gradient: "from-cyan-500 to-blue-600"
    },
    {
        name: "Laura García",
        role: "Fundadora — Commerce Plus",
        content: "Nuestro e-commerce pasó de cargar en 8 segundos a 1.2 segundos. Las conversiones aumentaron 40% en el primer mes. Increíble trabajo.",
        avatar: "LG",
        gradient: "from-blue-600 to-indigo-600"
    },
    {
        name: "Roberto Pérez",
        role: "CTO — DataFlow Solutions",
        content: "La app que desarrolló Galfre maneja miles de usuarios sin problemas. Código limpio, bien documentado y entrega antes del deadline. Muy profesional.",
        avatar: "RP",
        gradient: "from-indigo-600 to-purple-600"
    }
];

export default function Testimonials() {
    return (
        <section id="testimonios" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest font-heading">
                    ⭐ Testimonios
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter">
                    Lo que dicen mis <span className="text-cyan-400 font-heading">clientes</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testi, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-10 relative group hover:bg-white/[0.05] transition-all border-white/5"
                    >
                        <Quote className="absolute top-8 right-8 text-white/5 group-hover:text-cyan-400/20 transition-colors" size={48} />

                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-cyan-400 text-cyan-400" />)}
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed mb-8 relative z-10 font-medium italic">
                            "{testi.content}"
                        </p>

                        <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testi.gradient} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                                {testi.avatar}
                            </div>
                            <div>
                                <h4 className="text-white font-black font-heading uppercase tracking-tight">{testi.name}</h4>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{testi.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
