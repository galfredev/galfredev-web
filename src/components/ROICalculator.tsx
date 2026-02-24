'use client';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Zap } from 'lucide-react';
import { useState } from 'react';

export default function ROICalculator() {
    const [hours, setHours] = useState(15);
    const [rate, setRate] = useState(25);
    const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');
    const [profile, setProfile] = useState<'admin' | 'jr' | 'sr'>('jr');

    const rates = { USD: 1, ARS: 1250 }; // Blue/CCL rate aproximado

    const profiles = {
        admin: { label: 'Administrativo', usd: 12, ars: 15000 },
        jr: { label: 'Junior Dev / Analista', usd: 25, ars: 32000 },
        sr: { label: 'Senior / Contractor', usd: 55, ars: 68000 }
    };

    const handleProfileChange = (p: 'admin' | 'jr' | 'sr') => {
        setProfile(p);
        setRate(currency === 'USD' ? profiles[p].usd : profiles[p].ars);
    };

    const currentRate = rate;
    const annualSavings = hours * currentRate * 52;
    const timeSaved = hours * 52;

    const formatValue = (val: number) => {
        return currency === 'ARS'
            ? val.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
            : val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    };

    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="glass-card p-10 relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full -mr-40 -mt-40" />

                <div className="relative z-10 space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest font-heading">
                                <Calculator size={14} /> Business ROI Advisor
                            </div>
                            <h2 className="text-4xl font-black text-white leading-tight font-heading tracking-tighter">
                                ¿Cuánto dinero estás <span className="text-cyan-400 text-glow">quemando</span> hoy?
                            </h2>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Moneda de cálculo</label>
                            <div className="flex gap-2 p-1.5 bg-black/40 border border-white/5 rounded-xl">
                                {['USD', 'ARS'].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => {
                                            setCurrency(c as any);
                                            setRate(c === 'USD' ? profiles[profile].usd : profiles[profile].ars);
                                        }}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${currency === c ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <label className="text-white font-black uppercase tracking-widest text-[10px] opacity-70">Perfil de la tarea / Recurso</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['admin', 'jr', 'sr'] as const).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => handleProfileChange(p)}
                                            className={`p-3 rounded-xl border text-[10px] font-black transition-all text-center leading-tight ${profile === p ? 'border-cyan-500 bg-cyan-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20'}`}
                                        >
                                            {profiles[p].label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8 pt-4">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-heading">
                                        <label className="text-white font-black uppercase tracking-widest text-[10px]">Carga Horaria Manual (Semanal)</label>
                                        <span className="text-cyan-400 font-black px-3 py-1 bg-cyan-500/10 rounded-lg">{hours}h</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="160" value={hours}
                                        onChange={(e) => setHours(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-heading">
                                        <label className="text-white font-black uppercase tracking-widest text-[10px]">Costo Hora Real ({currency})</label>
                                        <span className="text-cyan-400 font-black px-3 py-1 bg-cyan-500/10 rounded-lg">{formatValue(currentRate)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={currency === 'USD' ? 5 : 4000}
                                        max={currency === 'USD' ? 200 : 150000}
                                        value={rate}
                                        onChange={(e) => setRate(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-[350px] space-y-4">
                            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 relative group">
                                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
                                            <DollarSign size={12} className="text-cyan-500" /> Ahorro Operativo Anual
                                        </p>
                                        <p className="text-5xl font-black text-white leading-tight mt-2 font-heading tracking-tighter shadow-cyan-500/50">
                                            {formatValue(annualSavings)}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest">Tiempo de Vida</p>
                                            <p className="text-xl font-black text-blue-400 font-heading">+{timeSaved.toLocaleString()}hs</p>
                                        </div>
                                        <div className="text-right text-gray-600 text-[9px] font-medium leading-tight">
                                            *Equivalente a <br /><span className="text-gray-300">{(timeSaved / 160).toFixed(1)} meses</span> de trabajo
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(34,211,238,0.2)' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 bg-white text-black font-black text-sm rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest font-heading transition-all"
                            >
                                <Zap size={18} fill="black" /> Dejar de perder dinero
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
