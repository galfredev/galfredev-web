'use client';
import { motion } from 'framer-motion';

const skills = [
    {
        category: "IA & Automatización",
        icon: "🤖",
        items: [
            { name: "n8n / Make / Zapier", level: 98 },
            { name: "Python Automation", level: 95 },
            { name: "LangChain / OpenAI", level: 92 },
            { name: "Agentic Workflows", level: 90 },
        ]
    },
    {
        category: "Backend & Cloud",
        icon: "⚙️",
        items: [
            { name: "Node.js / Express", level: 92 },
            { name: "FastAPI / Django", level: 88 },
            { name: "PostgreSQL / Prisma", level: 90 },
            { name: "Docker / AWS / VPS", level: 85 },
        ]
    },
    {
        category: "Frontend & DX",
        icon: "💻",
        items: [
            { name: "Next.js / TypeScript", level: 94 },
            { name: "Tailwind / Framer", level: 96 },
            { name: "Git / CI-CD", level: 92 },
            { name: "UI/UX Optimization", level: 90 },
        ]
    }
];


export default function Skills() {
    return (
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    🛠️ Skills
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter">
                    Lo que <span className="text-cyan-400">domino</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Especializado en el stack más demandado para automatizaciones y desarrollo escalable.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skills.map((skillGroup, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-8 group hover:border-cyan-500/30 transition-all"
                    >
                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                            {skillGroup.icon}
                        </div>
                        <h3 className="text-xl font-black text-white mb-8 tracking-tight font-heading uppercase">
                            {skillGroup.category}
                        </h3>

                        <div className="space-y-6">
                            {skillGroup.items.map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300 font-medium">{item.name}</span>
                                        <span className="text-cyan-400 font-bold">{item.level}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.level}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
