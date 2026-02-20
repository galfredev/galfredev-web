'use client';
import { motion } from 'framer-motion';
import { Bot, Globe, Lightbulb, Microscope, Smartphone, Zap } from 'lucide-react';

const services = [
    {
        icon: <Bot size={24} />,
        title: "Automatización con IA",
        desc: "Elimino tareas repetitivas de tu negocio con flujos inteligentes impulsados por IA. Ahorrá tiempo y costos desde el primer día.",
        tags: ["n8n", "OpenAI", "Python"],
        color: "from-cyan-500 to-blue-500"
    },
    {
        icon: <Globe size={24} />,
        title: "Desarrollo Web",
        desc: "Webs y landing pages que convierten visitantes en clientes. Rápidas, SEO-friendly y escalables.",
        tags: ["Next.js", "React", "SEO"],
        color: "from-blue-500 to-indigo-500"
    },
    {
        icon: <Smartphone size={24} />,
        title: "Apps Escalables",
        desc: "Aplicaciones full-stack diseñadas para crecer junto a tu negocio. Arquitectura limpia y performance.",
        tags: ["Full-Stack", "Docker", "API"],
        color: "from-indigo-500 to-purple-500"
    },
    {
        icon: <Zap size={24} />,
        title: "Optimización",
        desc: "Mejoro el rendimiento de tus sistemas existentes. Menos tiempo de carga, más conversiones.",
        tags: ["Performance", "DB Tuning"],
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: <Microscope size={24} />,
        title: "Testing & QA",
        desc: "Garantizo la calidad de tu software con pruebas automatizadas, E2E testing y análisis de bugs.",
        tags: ["Playwright", "Jest", "CI/CD"],
        color: "from-pink-500 to-rose-500"
    },
    {
        icon: <Lightbulb size={24} />,
        title: "Consultoría Tech",
        desc: "Asesoramiento estratégico para que elijas las tecnologías correctas. Roadmap claro y sin desperdicios.",
        tags: ["Roadmap", "Arquitectura"],
        color: "from-rose-500 to-orange-500"
    }
];

export default function Services() {
    return (
        <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest font-heading">
                    🚀 Servicios
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter">
                    ¿Qué puedo hacer por <span className="text-cyan-400">tu empresa</span>?
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Soluciones tecnológicas diseñadas para impactar en tu rentabilidad.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="group relative h-80 perspective-1000"
                    >
                        <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden glass-card p-10 flex flex-col items-center justify-center text-center gap-6 border-white/5">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg shadow-black/40`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-black text-white font-heading uppercase tracking-tight">{service.title}</h3>
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-10 flex flex-col justify-between bg-zinc-900/50 border-cyan-500/20">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black text-cyan-400 font-heading uppercase tracking-tight">{service.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </section>
    );
}
