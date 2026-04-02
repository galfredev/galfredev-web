import type {
  Certification,
  HeroMetric,
  NavItem,
  ProcessStep,
  ProfileOption,
  SolutionCard,
  SocialLink,
  TrustSignal,
  ValuePillar,
} from '@/types/site'

export const navItems: NavItem[] = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'ROI', href: '#roi' },
  { label: 'Valentino', href: '#fundador' },
  { label: 'Contacto', href: '#contacto' },
]

export const heroMetrics: HeroMetric[] = [
  {
    value: 'WhatsApp',
    label: 'embudo principal',
    detail: 'La web empuja a conversación real, no a un portal pesado.',
  },
  {
    value: 'Argentina',
    label: 'contexto real',
    detail: 'Copy, ROI y soluciones pensadas para negocios locales.',
  },
  {
    value: 'Supabase + Vercel',
    label: 'base productiva',
    detail: 'Auth, leads y despliegue listos para iterar con prolijidad.',
  },
]

export const valuePillars: ValuePillar[] = [
  {
    icon: '01',
    title: 'Responder rápido',
    summary:
      'WhatsApp, respuestas automáticas y recordatorios para no dejar consultas enfriarse.',
    points: [
      'Respuesta automática por WhatsApp',
      'Seguimiento sin olvidos',
    ],
  },
  {
    icon: '02',
    title: 'Ordenar procesos',
    summary:
      'Conecto herramientas, formularios y sistemas para que el negocio tenga una sola lógica.',
    points: [
      'Menos doble carga',
      'Menos errores operativos',
    ],
  },
  {
    icon: '03',
    title: 'Escalar con criterio',
    summary:
      'Cuando lo estándar no alcanza, diseño la pieza de software necesaria para que el proceso escale.',
    points: [
      'Integración con tu caso real',
      'Base mantenible y lista para crecer',
    ],
  },
]

export const solutions: SolutionCard[] = [
  {
    label: 'WhatsApp',
    title: 'WhatsApp que capta y responde sin fricción',
    audience: 'Consultas diarias',
    pain: 'Hoy se enfrían oportunidades por demora o desorden.',
    outcome: 'Más velocidad de respuesta y mejor filtro comercial.',
    bullets: [
      'Respuestas con contexto',
      'Filtro y derivación',
    ],
    ctaLabel: 'Consultar precios',
    message:
      'Hola, quiero consultar precios por una solución de captación y respuesta automática por WhatsApp.',
  },
  {
    label: 'Ventas',
    title: 'Seguimiento comercial para no perder clientes',
    audience: 'Leads y cotizaciones',
    pain: 'Los leads quedan en pausa o sin próxima acción.',
    outcome: 'Seguimiento automático que mantiene viva la conversación.',
    bullets: [
      'Estados claros',
      'Alertas y recordatorios',
    ],
    ctaLabel: 'Pedir propuesta',
    message:
      'Hola, quiero pedir una propuesta para automatizar el seguimiento de potenciales clientes y ventas.',
  },
  {
    label: 'Operación',
    title: 'Turnos, recordatorios y reprogramaciones',
    audience: 'Agendas y reservas',
    pain: 'Las ausencias y cambios desordenan la operación.',
    outcome: 'Menos no-shows y agenda más predecible.',
    bullets: [
      'Confirmación automática',
      'Reprogramación simple',
    ],
    ctaLabel: 'Ver si aplica a tu negocio',
    message:
      'Hola, quiero ver si una automatización de turnos, recordatorios y reprogramaciones aplica a mi negocio.',
  },
  {
    label: 'Sistema',
    title: 'Software a medida para ordenar y escalar',
    audience: 'Procesos que ya superaron planillas',
    pain: 'Los parches ya no alcanzan y todo empieza a trabarse.',
    outcome: 'Una base más sólida para operar, integrar y crecer.',
    bullets: [
      'Backends y paneles',
      'Integraciones y APIs',
    ],
    ctaLabel: 'Consultar solución',
    message:
      'Hola, quiero consultar por software a medida e integraciones para ordenar y escalar mi negocio.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Diagnóstico de negocio',
    description:
      'Detectamos dónde hoy se pierde tiempo, control o facturación.',
    outcome: 'Salimos con una lectura clara del problema y del impacto esperado.',
  },
  {
    step: '02',
    title: 'Implementación enfocada',
    description:
      'Armamos la solución con el nivel justo de automatización, integración o software.',
    outcome: 'Se pone en marcha rápido, sin sobreingeniería.',
  },
  {
    step: '03',
    title: 'Ajuste y mejora continua',
    description:
      'Medimos qué funcionó, corregimos fricción y definimos el siguiente paso útil.',
    outcome: 'El sistema acompaña el crecimiento, no se queda congelado.',
  },
]

export const certifications: Certification[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation',
    issuer: 'Coderhouse',
    date: '23 de enero de 2026',
    image: '/images/certificates/ai-automation.png',
  },
  {
    id: 'english-advanced',
    title: 'Inglés para desarrollo nivel advanced',
    issuer: 'Coderhouse',
    date: '14 de junio de 2023',
    image: '/images/certificates/english-advanced.png',
  },
  {
    id: 'python',
    title: 'Python',
    issuer: 'Coderhouse',
    date: '13 de mayo de 2024',
    image: '/images/certificates/python.png',
  },
]

export const founderHighlights = [
  'Estudiante de Ingeniería en Sistemas de Información en UTN FRC.',
  'Cursos finalizados en Coderhouse: AI Automation, Inglés para desarrollo nivel advanced y Python.',
  'Actualmente cursando la carrera completa de Backend Developer en Coderhouse.',
  'Foco profesional en backend, automatización, integraciones, software a medida y sistemas con IA aplicados a negocios reales.',
]

export const stackGroups = [
  {
    label: 'Backend y datos',
    items: ['Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Supabase'],
  },
  {
    label: 'Frontend y experiencia',
    items: ['Next.js App Router', 'Framer Motion', 'Responsive UI', 'SEO técnico'],
  },
  {
    label: 'Automatización e IA',
    items: ['APIs', 'Bots', 'Integraciones', 'Workflows', 'IA aplicada'],
  },
]

export const trustSignals: TrustSignal[] = [
  {
    title: 'Sin humo de SaaS ficticio',
    summary: 'La propuesta está planteada como una empresa de servicios e implementación real.',
    detail: 'La narrativa vende soluciones concretas, no una plataforma inventada.',
  },
  {
    title: 'Arquitectura lista para producción',
    summary: 'Next.js App Router, Supabase Auth/Database y despliegue preparado para Vercel.',
    detail: 'Base limpia, moderna y fácil de iterar sin arrastrar dependencias viejas.',
  },
  {
    title: 'Captura de leads con consentimiento',
    summary: 'Leads, preferencias y consentimiento quedan separados para trabajar con más criterio.',
    detail: 'Se privilegia confianza y prolijidad comercial por sobre la captura agresiva.',
  },
  {
    title: 'Perfil autenticado, no portal pesado',
    summary: 'El login existe como soporte secundario para perfilar mejor a potenciales clientes.',
    detail: 'No compite con la conversión principal del sitio y sigue siendo útil.',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'X', href: 'https://x.com/galfredev' },
  { label: 'Instagram', href: 'https://www.instagram.com/valentinogalfre/' },
  { label: 'GitHub', href: 'https://github.com/galfredev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/valentinogalfre/' },
  { label: 'Email', href: 'mailto:galfredev@gmail.com' },
]

export const profileBusinessTypes: ProfileOption[] = [
  { value: 'servicios-profesionales', label: 'Servicios profesionales' },
  { value: 'salud-y-bienestar', label: 'Salud y bienestar' },
  { value: 'educacion', label: 'Educación' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'inmobiliario', label: 'Inmobiliario' },
  { value: 'gastronomia', label: 'Gastronomía' },
  { value: 'industria', label: 'Industria' },
  { value: 'otro', label: 'Otro' },
]

export const profileTeamSizes: ProfileOption[] = [
  { value: 'solo', label: 'Solo o independiente' },
  { value: '2-5', label: '2 a 5 personas' },
  { value: '6-15', label: '6 a 15 personas' },
  { value: '16-50', label: '16 a 50 personas' },
  { value: '50+', label: 'Más de 50 personas' },
]

export const profileNeeds: ProfileOption[] = [
  { value: 'whatsapp-y-captacion', label: 'WhatsApp y captación' },
  { value: 'seguimiento-comercial', label: 'Seguimiento comercial' },
  { value: 'turnos-y-recordatorios', label: 'Turnos y recordatorios' },
  { value: 'cobranzas-y-avisos', label: 'Cobranzas y avisos' },
  { value: 'automatizacion-interna', label: 'Automatización interna' },
  { value: 'software-a-medida', label: 'Software a medida' },
]

export const interestOptions: ProfileOption[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'integraciones', label: 'Integraciones' },
  { value: 'ia-aplicada', label: 'IA aplicada' },
  { value: 'dashboards', label: 'Dashboards' },
  { value: 'bots', label: 'Bots' },
  { value: 'automatizacion-operativa', label: 'Automatización operativa' },
]

export const profileChannels: ProfileOption[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'llamada', label: 'Llamada' },
]

export const siteCopy = {
  brand: 'GalfreDev',
  founderName: 'Valentino Galfré',
  founderRole: 'Automatización, software a medida e IA aplicada para negocios reales.',
  founderImage: '/images/founder/valentino-galfre.png',
  whatsappBaseMessage:
    'Hola, me gustaría consultar por los servicios de GalfreDev.',
  email: 'galfredev@gmail.com',
}
