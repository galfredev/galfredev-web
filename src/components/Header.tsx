'use client';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <header className="fixed top-0 w-full z-50 py-6 px-10 flex justify-between items-center backdrop-blur-md bg-black/10 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-white">
                    Galfre
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Dev</span>
                </span>
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                />
            </Link>

            <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-10 text-[10px] font-black text-white/40 font-heading">
                <Link href="/#sobre-mi" className="hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]">Sobre Mí</Link>
                <Link href="/#skills" className="hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]">Skills</Link>
                <Link href="/#servicios" className="hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]">Servicios</Link>
                <Link href="/#proyectos" className="hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]">Proyectos</Link>
                <Link href="/#contacto" className="px-4 py-1.5 glass-card bg-cyan-500/5 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors uppercase tracking-[0.2em]">Contacto</Link>
            </nav>

            <div className="flex items-center gap-4">
                {user ? (
                    <Link href="/dashboard" className="flex items-center gap-3 glass-card pl-2 pr-4 py-1.5 border-white/10 hover:bg-white/5 transition-all">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.email}&background=06b6d4&color=fff&bold=true`}
                            className="w-7 h-7 rounded-lg border border-white/10"
                            alt="Avatar"
                        />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest hidden sm:inline">Dashboard</span>
                    </Link>
                ) : (
                    <Link href="/login" className="px-6 py-2 glass-card hover:bg-white/10 transition-all text-white border-white/10 uppercase tracking-widest font-heading text-[10px] font-black">
                        Portal Clientes
                    </Link>
                )}
            </div>
        </header>
    );
}
