'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
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

            <nav className="hidden md:flex gap-8 text-sm font-black text-white/60 font-heading">
                <Link href="#sobre-mi" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Sobre Mí</Link>
                <Link href="#skills" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Skills</Link>
                <Link href="#proyectos" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Proyectos</Link>
                <Link href="#contacto" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Contacto</Link>
                <Link href="/login" className="px-6 py-2 glass-card hover:bg-white/10 transition-all text-white border-white/10 uppercase tracking-widest">Mi Cuenta</Link>
            </nav>
        </header>
    );
}
