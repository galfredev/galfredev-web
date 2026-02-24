'use client';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Github, Linkedin, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: `${window.location.origin}/dashboard` }
        });
        if (error) setMessage(error.message);
        else setMessage('¡Link enviado! Revisa tu email para entrar.');
        setLoading(false);
    };

    const signInWith = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}/dashboard` }
        });
        if (error) alert(error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative bg-dot-pattern">
            {/* Background Decor */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-10 glass-card relative z-10 border-white/5 shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2 font-heading uppercase">
                        Galfre<span className="text-cyan-400">Dev</span>
                    </h1>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Portal de Clientes</p>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-8">
                    <button
                        onClick={() => signInWith('google')}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black hover:bg-white/10 transition-all uppercase tracking-tighter font-heading text-[10px]"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continuar con Google
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => signInWith('github')}
                            className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black hover:bg-white/10 transition-all uppercase tracking-tighter font-heading text-[10px]"
                        >
                            <Github size={16} /> GitHub
                        </button>
                        <button
                            onClick={() => signInWith('linkedin_oidc')}
                            className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black hover:bg-white/10 transition-all uppercase tracking-tighter font-heading text-[10px]"
                        >
                            <Linkedin size={16} className="text-blue-400" /> LinkedIn
                        </button>
                    </div>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <div className="relative flex justify-center text-[9px] uppercase"><span className="bg-black/20 backdrop-blur-xl px-4 text-gray-600 font-black tracking-[0.3em]">O acceso directo por email</span></div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 font-heading">Tu Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                            <input
                                type="email"
                                placeholder="tu@empresa.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:bg-white/5 outline-none transition-all placeholder:text-gray-800 font-medium"
                                required
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 uppercase tracking-widest font-heading text-[10px] disabled:opacity-50 active:scale-95"
                    >
                        {loading ? 'Preparando link...' : <><LogIn size={16} /> Enviar link mágico</>}
                    </button>
                    {message && <p className="text-center text-[10px] text-cyan-400 font-black uppercase tracking-tighter animate-pulse">{message}</p>}
                </form>

                <p className="text-center mt-8 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    ¿Nuevo aquí? <a href="/#contacto" className="text-cyan-500 hover:text-white transition-colors">Inicia un proyecto</a>
                </p>
            </motion.div>
        </div>
    );
}
