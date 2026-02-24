import WhatsAppButton from '@/components/WhatsAppButton';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-plus-jakarta',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'GalfreDev — IA & Automatización Estratégica para Empresas',
    description: 'Transformá tu negocio con agentes de IA y workflows inteligentes. Especialista en escalabilidad, ahorro de costos operativos y desarrollo de alto rendimiento.',
    keywords: ['automatización con IA', 'agentes inteligentes', 'desarrollo de software', 'n8n argentina', 'ahorro de procesos', 'consultoría tech'],
    openGraph: {
        title: 'GalfreDev — IA & Automatización Estratégica',
        description: 'Escalá tu empresa en piloto automático con sistemas inteligentes.',
        url: 'https://galfre.dev',
        siteName: 'GalfreDev',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GalfreDev — IA & Automatización',
        description: 'Automatizando el futuro de las empresas.',
    }
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className={`${plusJakarta.variable} ${inter.variable} font-sans antialiased bg-black text-white`}>
                {children}
                <WhatsAppButton />
                <Analytics />
            </body>
        </html>
    );
}
