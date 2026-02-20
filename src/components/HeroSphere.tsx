'use client';
import { motion } from 'framer-motion';

export default function HeroSphere() {
    return (
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
            {/* Glow Ambient */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full animate-pulse" />

            <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full preserve-3d"
            >
                {/* Sphere Core */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/5 border border-white/20 backdrop-blur-sm" />

                {/* Rings */}
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        animate={{
                            rotateX: 70,
                            rotateZ: ring % 2 === 0 ? 360 : -360
                        }}
                        transition={{
                            rotateZ: { duration: 10 + ring * 5, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-400/30 rounded-full"
                        style={{
                            width: `${100 + ring * 15}%`,
                            height: `${100 + ring * 15}%`,
                            borderStyle: ring === 3 ? 'dashed' : 'solid'
                        }}
                    />
                ))}

                {/* Nodes */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
                        className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Floating Code Snippets */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 -right-8 glass-card px-4 py-2 text-[10px] font-mono text-cyan-400"
            >
                await scale.deploy();
            </motion.div>
            <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 -left-10 glass-card px-4 py-2 text-[10px] font-mono text-blue-400"
            >
                const ai = automate();
            </motion.div>
        </div>
    );
}
