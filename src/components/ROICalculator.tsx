'use client';
import { motion } from 'framer-motion';
import { Calculator, Clock, DollarSign, Zap } from 'lucide-react';
import { useState } from 'react';

export default function ROICalculator() {
    const [hours, setHours] = useState(10);
    const [rate, setRate] = useState(50);
    const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');

    const rates = { USD: 1, ARS: 1200 }; // Example conversion
    const annualSavings = hours * rate * 52;
    const timeSaved = hours * 52;

    const formatValue = (val: number) => {
        return currency === 'ARS'
            ? (val * rates.ARS).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
            : val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    };

    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="glass-card p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />

                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                                <Calculator size={14} /> AI ROI Calculator
                            </div>
                            <div className="flex gap-2 p-1 glass-card rounded-lg">
                                {['USD', 'ARS'].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setCurrency(c as any)}
                                        className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${currency === c ? 'bg-cyan-500 text-black' : 'text-gray-500'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-white leading-tight font-heading tracking-tighter">
                            ¿Cuánto te está costando <span className="text-cyan-400 text-glow">no automatizar</span>?
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Calcula el ahorro potencial en tiempo y dinero al implementar agentes de IA en tus procesos diarios.
                        </p>

                        <div className="space-y-8 pt-4">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-heading">
                                    <label className="text-white font-black uppercase tracking-widest text-[10px]">Horas manuales por semana</label>
                                    <span className="text-cyan-400 font-black">{hours}h</span>
                                </div>
                                <input
                                    type="range" min="1" max="100" value={hours}
                                    onChange={(e) => setHours(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-heading">
                                    <label className="text-white font-black uppercase tracking-widest text-[10px]">Costo por hora ({currency})</label>
                                    <span className="text-cyan-400 font-black">{formatValue(rate).split('.')[0]}</span>
                                </div>
                                <input
                                    type="range" min="10" max="500" value={rate}
                                    onChange={(e) => setRate(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[380px] grid grid-cols-1 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                <DollarSign />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Ahorro Anual Est.</p>
                                <p className="text-3xl font-black text-white leading-none mt-1 font-heading">
                                    {formatValue(annualSavings).split('.')[0]}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Clock />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Tiempo Recuperado</p>
                                <p className="text-3xl font-black text-white leading-none mt-1 font-heading">
                                    {timeSaved.toLocaleString()}h
                                </p>
                            </div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-black text-lg shadow-[0_10px_30px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2 uppercase tracking-tighter font-heading"
                        >
                            <Zap size={20} /> Automatizar ahora
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
