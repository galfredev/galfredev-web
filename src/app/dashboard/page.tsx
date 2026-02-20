'use client';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code2, LayoutDashboard, Rocket, UserCircle } from 'lucide-react';

export default function Dashboard() {
    const projects = [
        { title: "AI Automation Workflow", progress: 75, status: "Testing" },
        { title: "Custom CRM Integration", progress: 40, status: "Development" },
        { title: "Data Scraping Engine", progress: 100, status: "Deployed" },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <header className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">GalfreDev Client Portal</h1>
                        <p className="text-gray-500 text-sm">Bienvenido de nuevo, <span className="text-white">Eduardo</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-3 glass-card px-4 py-2">
                    <UserCircle size={20} className="text-cyan-400" />
                    <span className="text-sm font-bold">Mi Cuenta</span>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Progress Overview Section */}
                <section className="lg:col-span-2 space-y-8">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Mis Proyectos en Curso <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black">3</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {projects.map((proj, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 group hover:bg-white/[0.07] transition-all cursor-pointer border-white/5 active:scale-[0.99]"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-black group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{proj.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                            {proj.status === 'Deployed' ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Rocket size={14} className="text-cyan-400 animate-pulse" />}
                                            {proj.status}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-white">{proj.progress}%</p>
                                    </div>
                                </div>

                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${proj.progress}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* AI Insight Section */}
                <aside className="space-y-8">
                    <h2 className="text-xl font-bold">Resumen de IA</h2>
                    <div className="glass-card p-8 bg-gradient-to-b from-cyan-600/20 to-transparent border-cyan-500/20 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-400/20 blur-[60px] rounded-full" />
                        <Code2 className="text-cyan-400 mb-4" />
                        <p className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-tighter">Próxima Automatización Sugerida</p>
                        <h3 className="text-2xl font-black text-white mb-4 leading-tight">Integración de Lead Inserter para LinkedIn</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Basado en tu flujo actual, podrías ahorrar un <span className="text-white font-bold">12% extra de tiempo</span> automatizando la prospección directa.
                        </p>
                        <button className="w-full py-4 glass-card font-black flex items-center justify-center gap-2 hover:bg-white/10 transition-all uppercase tracking-tighter">
                            Ver Propuesta <ArrowRight size={18} />
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
}
