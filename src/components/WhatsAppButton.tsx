'use client';
import { buildWhatsAppUrl } from '@/lib/site';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);
    const whatsappUrl = buildWhatsAppUrl('Hola, vengo desde la web de GalfreDev y quiero pedir informacion.');

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-shadow"
                    title="Chatear por WhatsApp"
                >
                    <MessageCircle size={28} />
                </motion.a>
            )}
        </AnimatePresence>
    );
}
