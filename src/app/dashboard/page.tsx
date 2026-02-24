'use client';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import {
    Calculator,
    ChevronRight,
    Clock,
    LayoutDashboard,
    LogOut,
    Rocket,
    Search,
    TrendingUp,
    User,
    Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [projects, setProjects] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function getDashboardData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            const { data: projectsData, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && projectsData) {
                setProjects(projectsData);
            }
            setLoading(false);
        }
        getDashboardData();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    // Cálculo ficticio de ROI basado en el progreso de proyectos
    const totalROI = projects.reduce((acc, curr) => acc + (curr.progress * 150), 0); // USD 150 por cada % de progreso
    const totalHoursSaved = projects.reduce((acc, curr) => acc + (curr.progress * 2.5), 0); // 2.5hs por cada %

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
            {/* Sidebar / Topbar Hybrid */}
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-screen">

                {/* Lateral Nav */}
                <aside className="w-full lg:w-72 border-r border-white/5 p-8 flex flex-col justify-between bg-black/50 backdrop-blur-xl">
                    <div className="space-y-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                <LayoutDashboard size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-black font-heading tracking-tighter">Galfre<span className="text-cyan-400">Dev</span></span>
                        </div>

                        <nav className="space-y-2">
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-black text-xs uppercase tracking-widest text-left transition-all">
                                <Rocket size={16} /> Dashboard
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 font-black text-xs uppercase tracking-widest text-left transition-all">
                                <Calculator size={16} /> ROI Calculator
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 font-black text-xs uppercase tracking-widest text-left transition-all">
                                <User size={16} /> Perfil
                            </button>
                        </nav>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-500 hover:bg-red-500/10 font-black text-xs uppercase tracking-widest transition-all mt-12 border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={16} /> Cerrar Sesión
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black font-heading tracking-tighter">Portal de <span className="text-cyan-400">Clientes.</span></h2>
                            <p className="text-gray-500 font-medium">Gestioná tus automatizaciones y visualizá el impacto de la IA.</p>
                        </div>
                        <div className="flex items-center gap-4 glass-card p-2 pr-6 border-white/5">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.email}&background=06b6d4&color=fff&bold=true`}
                                className="w-12 h-12 rounded-xl border border-white/10"
                                alt="Avatar"
                            />
                            <div>
                                <p className="text-xs font-black text-white">{user?.email?.split('@')[0]}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Cliente Verificado</p>
                            </div>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <TrendingUp size={24} />
                                </div>
                                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">+12% vs last month</span>
                            </div>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">ROI Estimado Total</p>
                            <h3 className="text-4xl font-black text-white font-heading mt-2">${totalROI.toLocaleString()} USD</h3>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <Clock size={24} />
                                </div>
                            </div>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tiempo Recuperado</p>
                            <h3 className="text-4xl font-black text-white font-heading mt-2">{totalHoursSaved.toLocaleString()} hs</h3>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 border-cyan-500/10 bg-cyan-500/5 ring-1 ring-cyan-500/20">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                                    <Zap size={24} />
                                </div>
                            </div>
                            <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Automatizaciones Activas</p>
                            <h3 className="text-4xl font-black text-white font-heading mt-2">{projects.filter(p => p.progress > 0).length} Sistemas</h3>
                        </motion.div>
                    </div>

                    {/* Projects Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black font-heading uppercase tracking-tighter flex items-center gap-3">
                                <ChevronRight className="text-cyan-500" /> Seguimiento de Proyectos
                            </h3>
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                                <input placeholder="Buscar proyecto..." className="bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs font-medium outline-none focus:border-cyan-500 transition-all w-64" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {projects.length === 0 ? (
                                <div className="glass-card p-20 text-center border-dashed border-white/10">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-gray-700">
                                        <Rocket size={40} />
                                    </div>
                                    <h4 className="text-xl font-black text-white font-heading">¿Listo para el despegue?</h4>
                                    <p className="text-gray-500 text-sm max-w-xs mx-auto mt-2">Todavía no tenés proyectos registrados. Contactate con GalfreDev para iniciar tu automatización.</p>
                                    <a href="/#contacto" className="inline-block mt-8 px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all">Iniciar mi primer proyecto</a>
                                </div>
                            ) : (
                                projects.map((proj, i) => (
                                    <motion.div
                                        key={proj.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group glass-card p-8 border-white/5 hover:bg-white/[0.04] transition-all relative overflow-hidden active:scale-[0.995]"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                                    🏗️
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{proj.title}</h4>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1">
                                                            Status: <span className="text-gray-300">{proj.status}</span>
                                                        </p>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1">
                                                            ID: <span className="text-gray-300">#{proj.id.slice(0, 8)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-64 space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Progreso Global</span>
                                                    <span className="text-xl font-black text-white">{proj.progress}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${proj.progress}%` }}
                                                        transition={{ duration: 2, ease: "circOut" }}
                                                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {proj.details && (
                                            <div className="mt-6 pt-6 border-t border-white/5 text-[11px] text-gray-500 italic">
                                                Nota del desarrollador: "{proj.details}"
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Bottom Support Callout */}
                    <div className="mt-12 p-8 glass-card border-white/5 bg-gradient-to-r from-cyan-900/10 to-transparent flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4 text-center md:text-left">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                <Search size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-white">¿Necesitás soporte técnico?</h4>
                                <p className="text-gray-500 text-xs">Atención prioritaria 24/7 para clientes premium.</p>
                            </div>
                        </div>
                        <a href="https://wa.me/5493512345678" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">WhatsApp Directo</a>
                    </div>
                </main>
            </div>
        </div>
    );
}
