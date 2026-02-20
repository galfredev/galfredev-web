import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Política de Privacidad | GalfreDev",
};

export default function PrivacidadPage() {
    return (
        <div className="min-h-screen bg-black text-gray-300 py-20 px-6">
            <div className="max-w-3xl mx-auto space-y-10">
                <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    <ArrowLeft size={20} />
                    <span>Volver al inicio</span>
                </Link>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Política de <span className="text-cyan-400">Privacidad</span></h1>
                    <p className="text-gray-500">Última actualización: Febrero 2026</p>
                </div>

                <div className="space-y-8 glass-card p-8 md:p-12">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">1. Información que recopilamos</h2>
                        <p>Al utilizar nuestro formulario de contacto, recopilamos conscientemente la siguiente información personal:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400">
                            <li>Nombre completo</li>
                            <li>Dirección de correo electrónico</li>
                            <li>Número de teléfono (WhatsApp)</li>
                            <li>Información detallada sobre tu proyecto o consulta</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">2. Uso de la información</h2>
                        <p>Los datos recopilados se utilizan exclusivamente para los siguientes propósitos:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400">
                            <li>Responder a tus consultas y evaluar la viabilidad de tu proyecto.</li>
                            <li>Comunicarnos contigo vía correo electrónico o WhatsApp respecto a nuestros servicios (GalfreDev).</li>
                            <li>Enviarte propuestas formales de trabajo y cotizaciones.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">3. Protección de datos</h2>
                        <p>Tus datos son almacenados de forma segura utilizando bases de datos cifradas y no son compartidos, vendidos ni cedidos a terceros, salvo obligación legal estricta.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">4. Tus derechos</h2>
                        <p>Tienes en todo momento el derecho de acceder, rectificar o solicitar la eliminación de tus datos personales de nuestra base de datos. Para ejercer estos derechos, puedes comunicarte a través de los canales de contacto de nuestro sitio web.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
