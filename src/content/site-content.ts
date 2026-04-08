import type {
  Certification,
  HeroMetric,
  HeroScenario,
  NavItem,
  ProcessStep,
  SolutionCard,
  SocialLink,
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
    detail: 'La web empuja a una conversación real, no a un portal pesado.',
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

export const heroScenarios: HeroScenario[] = [
  {
    id: 'opportunities',
    headline: 'no perder oportunidades',
    panelTitle: 'Captación sin fuga',
    panelEyebrow: 'Seguimiento activo',
    panelStatus: 'LIVE',
    focusLabel: 'SEGUIMIENTO',
    focusValue: 'Lead retomado automáticamente',
    tags: ['Lead entrante', 'Prioridad alta'],
    messages: [
      {
        align: 'left',
        tone: 'neutral',
        text: 'Hola, quiero saber si me pueden ayudar a ordenar las consultas que hoy quedan colgadas.',
      },
      {
        align: 'right',
        tone: 'accent',
        text: 'Sí. Podemos capturar el lead, detectar prioridad y activar seguimiento sin perder contexto.',
      },
      {
        align: 'left',
        tone: 'system',
        text: 'Recordatorio armado para retomar la conversación en 10 minutos.',
        hiddenOnMobile: true,
      },
    ],
    footerTitle: 'Ruta automática de seguimiento',
    footerDetail: 'Captura, clasificación y próxima acción sin depender de la memoria manual.',
    footerStatus: 'Activo',
    cards: [
      { label: 'Lead', value: 'Nuevo y priorizado' },
      { label: 'Próximo paso', value: 'Seguimiento en 10 min' },
    ],
  },
  {
    id: 'reply-fast',
    headline: 'responder más rápido',
    panelTitle: 'Respuesta en segundos',
    panelEyebrow: 'Atención automatizada',
    panelStatus: 'LIVE',
    focusLabel: 'RESPUESTA',
    focusValue: 'Consulta atendida en segundos',
    tags: ['Bot activo', 'WhatsApp'],
    messages: [
      {
        align: 'left',
        tone: 'neutral',
        text: 'Hola, quería consultar por precios y tiempos para implementar algo en mi negocio.',
      },
      {
        align: 'right',
        tone: 'accent',
        text: 'Perfecto. Ya te comparto una primera respuesta y preparo el diagnóstico comercial.',
      },
      {
        align: 'left',
        tone: 'system',
        text: 'Respuesta automática enviada. Lead asignado y clasificado.',
        hiddenOnMobile: true,
      },
    ],
    footerTitle: 'Motor de respuesta inmediata',
    footerDetail: 'Bot, filtro y derivación listos para bajar la demora desde el primer contacto.',
    footerStatus: 'Listo',
    cards: [
      { label: 'Tiempo', value: 'Atendido al instante' },
      { label: 'Estado', value: 'Clasificado y asignado' },
    ],
  },
  {
    id: 'followups',
    headline: 'ordenar seguimientos',
    panelTitle: 'Seguimiento ordenado',
    panelEyebrow: 'Pipeline claro',
    panelStatus: 'SYNC',
    focusLabel: 'PIPELINE',
    focusValue: 'Cada lead con estado y recordatorio',
    tags: ['Próxima acción', 'Pipeline vivo'],
    messages: [
      {
        align: 'left',
        tone: 'neutral',
        text: 'Necesito saber quién pidió propuesta, quién quedó pendiente y a quién hay que volver a escribir.',
      },
      {
        align: 'right',
        tone: 'accent',
        text: 'Lo ordenamos por estado, prioridad y próxima acción para que siempre sepas qué sigue.',
      },
      {
        align: 'left',
        tone: 'system',
        text: 'Recordatorio comercial activado y tablero actualizado.',
        hiddenOnMobile: true,
      },
    ],
    footerTitle: 'Seguimiento sin caos',
    footerDetail: 'Estados claros, alertas y próxima tarea visibles para que la operación no se desordene.',
    footerStatus: 'En curso',
    cards: [
      { label: 'Estado', value: 'Propuesta enviada' },
      { label: 'Próximo paso', value: 'Volver a escribir mañana' },
    ],
  },
  {
    id: 'lead-filter',
    headline: 'filtrar mejor los leads',
    panelTitle: 'Lead clasificado antes de vender',
    panelEyebrow: 'Filtro comercial',
    panelStatus: 'READY',
    focusLabel: 'CLASIFICACIÓN',
    focusValue: 'Necesidad detectada y prioridad asignada',
    tags: ['Filtro inicial', 'Necesidad principal'],
    messages: [
      {
        align: 'left',
        tone: 'neutral',
        text: 'No todos los leads tienen el mismo valor y hoy estamos atendiendo todo igual.',
      },
      {
        align: 'right',
        tone: 'accent',
        text: 'Podemos filtrar por necesidad, contexto y urgencia para vender con más criterio.',
      },
      {
        align: 'left',
        tone: 'system',
        text: 'Lead derivado a seguimiento comercial con prioridad media.',
        hiddenOnMobile: true,
      },
    ],
    footerTitle: 'Filtro antes de la venta',
    footerDetail: 'Cada contacto entra con mejor contexto para decidir respuesta, seguimiento o derivación.',
    footerStatus: 'Listo',
    cards: [
      { label: 'Necesidad', value: 'WhatsApp y captación' },
      { label: 'Prioridad', value: 'Media, con seguimiento' },
    ],
  },
  {
    id: 'commercial-control',
    headline: 'tener control comercial',
    panelTitle: 'Visibilidad comercial real',
    panelEyebrow: 'Operación coordinada',
    panelStatus: 'SYNC',
    focusLabel: 'VISIBILIDAD',
    focusValue: 'Estados, alertas y próxima acción en un mismo flujo',
    tags: ['Alertas', 'Integración activa'],
    messages: [
      {
        align: 'left',
        tone: 'neutral',
        text: 'Quiero ver qué está pasando con ventas, seguimientos y consultas sin depender de planillas sueltas.',
      },
      {
        align: 'right',
        tone: 'accent',
        text: 'Centralizamos estados, mensajes y alertas para que el equipo opere con más orden.',
      },
      {
        align: 'left',
        tone: 'system',
        text: 'Panel actualizado. Próximas acciones sincronizadas con el flujo comercial.',
        hiddenOnMobile: true,
      },
    ],
    footerTitle: 'Control comercial con criterio',
    footerDetail: 'Más visibilidad para decidir rápido, priorizar bien y sostener el ritmo operativo.',
    footerStatus: 'Activo',
    cards: [
      { label: 'Vista', value: 'Embudo comercial visible' },
      { label: 'Alerta', value: 'Próxima acción confirmada' },
    ],
  },
]

export const valuePillars: ValuePillar[] = [
  {
    icon: '01',
    title: 'Responder rápido',
    summary:
      'WhatsApp, respuestas automáticas y recordatorios para que una consulta no se enfríe por demora.',
    points: ['Respuesta automática por WhatsApp', 'Seguimiento sin olvidos'],
  },
  {
    icon: '02',
    title: 'Ordenar procesos',
    summary:
      'Conecto herramientas, formularios y sistemas para que la operación deje de depender de parches.',
    points: ['Menos doble carga', 'Menos errores operativos'],
  },
  {
    icon: '03',
    title: 'Escalar con criterio',
    summary:
      'Cuando lo estándar no alcanza, diseñamos la pieza justa para crecer con una base más sólida.',
    points: ['Integración con tu caso real', 'Base mantenible y lista para crecer'],
  },
]

export const solutions: SolutionCard[] = [
  {
    label: 'WhatsApp',
    title: 'WhatsApp que capta y responde sin fricción',
    audience: 'Consultas diarias',
    pain: 'Hoy se enfrían oportunidades por demora o desorden.',
    outcome: 'Más velocidad de respuesta y mejor filtro comercial.',
    bullets: ['Respuestas con contexto', 'Filtro y derivación'],
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
    bullets: ['Estados claros', 'Alertas y recordatorios'],
    ctaLabel: 'Pedir propuesta',
    message:
      'Hola, quiero pedir una propuesta para automatizar el seguimiento de potenciales clientes y ventas.',
  },
  {
    label: 'Operación',
    title: 'Turnos, recordatorios y reprogramaciones',
    audience: 'Agendas y reservas',
    pain: 'Las ausencias y cambios desordenan la operación.',
    outcome: 'Menos no-shows y una agenda más predecible.',
    bullets: ['Confirmación automática', 'Reprogramación simple'],
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
    bullets: ['Backends y paneles', 'Integraciones y APIs'],
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
      'Ubicamos dónde hoy se pierde tiempo, control o facturación y qué conviene atacar primero.',
    outcome: 'Queda definido el problema real, la prioridad y el impacto que vale la pena buscar.',
  },
  {
    step: '02',
    title: 'Implementación enfocada',
    description:
      'Armamos la solución con el nivel justo de automatización, integración o software, sin adornos innecesarios.',
    outcome: 'Se pone en marcha rápido y con sentido operativo, no como una capa extra de complejidad.',
  },
  {
    step: '03',
    title: 'Ajuste y mejora continua',
    description:
      'Medimos qué funcionó, corregimos fricción real y definimos el siguiente paso útil según uso.',
    outcome: 'La solución se mantiene viva y acompaña el crecimiento sin quedar congelada.',
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

export const socialLinks: SocialLink[] = [
  { label: 'X', href: 'https://x.com/galfredev' },
  { label: 'Instagram', href: 'https://www.instagram.com/valentinogalfre/' },
  { label: 'GitHub', href: 'https://github.com/galfredev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/valentinogalfre/' },
  { label: 'Email', href: 'mailto:galfredev@gmail.com' },
]

export const siteCopy = {
  brand: 'GalfreDev',
  founderName: 'Valentino Galfré',
  founderRole: 'Automatización, software a medida e IA aplicada para negocios reales.',
  founderImage: '/images/founder/valentino-galfre.png',
  whatsappBaseMessage: 'Hola, me gustaría consultar por los servicios de GalfreDev.',
  email: 'galfredev@gmail.com',
}
