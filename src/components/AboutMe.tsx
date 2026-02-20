'use client';
import { motion } from 'framer-motion';
import { Cpu, Github, GraduationCap, Linkedin, Mail, Twitter, Zap } from 'lucide-react';

export default function AboutMe() {
    return (
        <section id="sobre-mi" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Visual Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-3xl rounded-full" />
                    <div className="relative glass-card p-2 aspect-square max-w-md mx-auto overflow-hidden rounded-[2.5rem]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-8xl font-black text-white/10">
                            GD
                        </div>

                        {/* Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 -right-4 z-20 px-4 py-2 glass-card border-cyan-500/30 text-white text-xs font-bold flex items-center gap-2"
                        >
                            <GraduationCap size={14} className="text-cyan-400" /> UTN FRC
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 -left-4 z-20 px-4 py-2 glass-card border-blue-500/30 text-white text-xs font-bold flex items-center gap-2"
                        >
                            <Zap size={14} className="text-blue-400" /> Ing. Sistemas
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 -left-8 z-20 px-4 py-2 glass-card border-white/20 text-white text-xs font-bold flex items-center gap-2"
                        >
                            <Cpu size={14} className="text-purple-400" /> IA Enthusiast
                        </motion.div>
                    </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest">
                            👋 Sobre Mí
                        </div>
                        <h2 className="text-5xl font-black text-white font-heading tracking-tighter">
                            Hola, soy <span className="text-cyan-400 text-glow italic">Galfre</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Ingeniero en Sistemas de Información graduado en la UTN FRC, apasionado por transformar problemas complejos en soluciones elegantes y escalables mediante software de alto impacto.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Me especializo en el puente entre la <strong>Inteligencia Artificial</strong> y los negocios reales. Creo sistemas que no solo funcionan, sino que generan impacto medible: menos tiempo, más ingresos, procesos que se ejecutan solos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 glass-card border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">🏛️</div>
                            <span className="text-sm font-bold text-gray-300">UTN FRC — Ing. Sistemas</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 glass-card border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">🤖</div>
                            <span className="text-sm font-bold text-gray-300">AI Automation Certified</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {[
                            { icon: Github, href: "https://github.com/galfredev" },
                            { icon: Linkedin, href: "https://linkedin.com/in/galfredev" },
                            { icon: Twitter, href: "https://x.com/galfredev" },
                            { icon: Mail, href: "mailto:galfredev@gmail.com" },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
