import WhatsAppButton from '@/components/WhatsAppButton';
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
    title: 'GalfreDev - IA y automatizacion estrategica para empresas',
    description: 'Transforma tu negocio con agentes de IA, software a medida y automatizaciones que ahorran tiempo operativo.',
    keywords: ['automatizacion con IA', 'agentes inteligentes', 'desarrollo de software', 'n8n', 'consultoria tech'],
    openGraph: {
        title: 'GalfreDev - IA y automatizacion estrategica',
        description: 'Escala tu empresa con sistemas inteligentes y software a medida.',
        url: 'https://galfre.dev',
        siteName: 'GalfreDev',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GalfreDev - IA y automatizacion',
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
            </body>
        </html>
    );
}
