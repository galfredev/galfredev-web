'use client';
import AboutMe from '@/components/AboutMe';
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import HeroSphere from '@/components/HeroSphere';
import Projects from '@/components/Projects';
import ROICalculator from '@/components/ROICalculator';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';

const techStack = [
    { icon: "🐍", name: "Python" },
    { icon: "⚛️", name: "React" },
    { icon: "🟢", name: "Node.js" },
    { icon: "🤖", name: "OpenAI" },
    { icon: "🐘", name: "PostgreSQL" },
    { icon: "⚡", name: "FastAPI" },
    { icon: "🎯", name: "TypeScript" },
    { icon: "🔗", name: "n8n" },
    { icon: "📦", name: "Docker" },
    { icon: "🔥", name: "Supabase" },
];


export default function Home() {
    return (
        <main className="min-h-screen bg-black overflow-hidden bg-dot-pattern">
            <Header />

            {/* Hero Section */}
            <section id="hero" className="relative pt-40 pb-24 px-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 min-h-[90vh]">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />

                <div className="flex-1 space-y-8 relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-black uppercase tracking-widest font-heading">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Automatización con IA de Siguiente Nivel
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
                        Escalá tu empresa <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">en piloto automático.</span>
                    </h1>

                    <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
                        Especialista en <strong>agentes de IA y workflows inteligentes</strong> que eliminan el trabajo manual y disparan tu productividad.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                        <a href="#proyectos" className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all uppercase tracking-tighter font-heading">
                            Ver Proyectos
                        </a>
                        <a href="#contacto" className="px-10 py-5 glass-card font-black text-white rounded-2xl hover:bg-white/10 transition-all font-heading">
                            Hablemos
                        </a>
                    </div>
                </div>

                <div className="flex-1 flex justify-center relative">
                    <HeroSphere />
                </div>
            </section>

            {/* Tech Stack Banner */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="px-6 max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale hover:grayscale-0 transition-all duration-500">
                    {techStack.map((tech, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <AboutMe />

            <Skills />

            <Services />

            {/* ROI Calculator Gift Section */}
            <ROICalculator />

            <Projects />

            <Testimonials />

            <ContactForm />

            <footer className="py-20 px-10 border-t border-white/5 text-center relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/5 blur-[100px] rounded-full" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-left mb-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-black font-heading text-white uppercase tracking-tight">Galfre<span className="text-cyan-400">Dev</span></h3>
                        <p className="text-gray-500 text-sm max-w-xs">Automatizando el futuro de las empresas con inteligencia artificial y sistemas de alto rendimiento.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-white font-black text-xs uppercase tracking-widest">Secciones</h4>
                            <ul className="space-y-2 text-gray-500 text-sm">
                                <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a></li>
                                <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a></li>
                                <li><a href="#proyectos" className="hover:text-cyan-400 transition-colors">Proyectos</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-white font-black text-xs uppercase tracking-widest">Contacto</h4>
                            <ul className="space-y-2 text-gray-500 text-sm">
                                <li><a href="mailto:galfredev@gmail.com" className="hover:text-cyan-400 transition-colors">Email</a></li>
                                <li><a href="https://linkedin.com/in/galfredev" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                                <li><a href="https://x.com/galfredev" className="hover:text-cyan-400 transition-colors">Twitter / X</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="px-4 py-2 glass-card text-[10px] font-black uppercase tracking-widest text-cyan-400 border-cyan-500/20">
                            Disponible para nuevos proyectos
                        </span>
                    </div>
                </div>
                <p className="text-gray-600 text-xs font-medium relative z-10 pt-12 border-t border-white/5">
                    © 2026 GalfreDev. Hecho con ❤️ en Córdoba, Argentina.
                </p>
            </footer>

            {/* Custom Styles for Dot Pattern */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .bg-dot-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }
      `}} />
        </main>
    );
}
