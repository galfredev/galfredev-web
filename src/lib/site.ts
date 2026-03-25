export const siteConfig = {
    brandName: 'GalfreDev',
    email: 'galfredev@gmail.com',
    githubUrl: 'https://github.com/galfredev',
    linkedinUrl: 'https://linkedin.com/in/galfredev',
    xUrl: 'https://x.com/galfredev',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493510000000',
    whatsappDefaultMessage:
        process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ||
        'Hola, vengo desde la web de GalfreDev y quiero consultar por una automatizacion.',
} as const;

export function buildWhatsAppUrl(message = siteConfig.whatsappDefaultMessage) {
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
