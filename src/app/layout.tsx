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
  title: 'GalfreDev — Automatiza. Optimiza. Escala.',
  description: 'GalfreDev — Automatizaciones e IA para escalar tu empresa. Desarrollo de aplicaciones, optimizaciones y testing de alto nivel.',
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
