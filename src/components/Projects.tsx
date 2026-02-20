'use client';
import { motion } from 'framer-motion';
import { ExternalLink, FolderCode, Github, Zap } from 'lucide-react';
import projectsData from '../../data/projects.json';

export default function Projects() {
    return (
        <section id="proyectos" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest font-heading">
                        📂 Proyectos
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter">
                        Trabajo <span className="text-cyan-400">real</span>, resultados reales
                    </h2>
                    <p className="text-gray-400 max-w-xl text-lg">
                        Sistemas implementados con arquitecturas modernas y escalables.
                    </p>
                </div>
                <a
                    href="https://github.com/galfredev"
                    target="_blank"
                    className="px-6 py-3 glass-card text-sm font-black text-white hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-widest font-heading"
                >
                    <Github size={18} /> Ver más en GitHub
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card group flex flex-col h-full overflow-hidden hover:border-cyan-500/30 transition-all border-white/5"
                    >
                        {/* Project Preview */}
                        <div className="relative h-48 bg-zinc-900 overflow-hidden flex items-center justify-center border-b border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {project.previewType === 'code' ? (
                                <div className="p-6 font-mono text-[10px] text-cyan-400/60 leading-relaxed overflow-hidden">
                                    <pre>{project.previewContent}</pre>
                                </div>
                            ) : project.previewType === 'graph' ? (
                                <Zap size={48} className="text-blue-500/30" />
                            ) : (
                                <FolderCode size={48} className="text-cyan-500/20" />
                            )}

                            {project.featured && (
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-tighter">
                                    Destacado
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors font-heading uppercase tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-8">
                                <a
                                    href={project.links.demo}
                                    className="flex-1 py-3 glass-card text-center text-xs font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                                >
                                    <ExternalLink size={14} /> Demo
                                </a>
                                <a
                                    href={project.links.github}
                                    className="w-12 h-12 glass-card flex items-center justify-center text-gray-400 hover:text-white transition-all"
                                >
                                    <Github size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
