import type { ProfileOption } from '@/types/site'

export const profileBusinessTypeOptions: ProfileOption[] = [
  { value: 'servicios-profesionales', label: 'Servicios profesionales' },
  { value: 'salud-y-turnos', label: 'Salud, estética o turnos' },
  { value: 'educacion-y-formacion', label: 'Educación o formación' },
  { value: 'ecommerce-y-ventas', label: 'E-commerce o ventas online' },
  { value: 'inmobiliario-y-seguros', label: 'Inmobiliario o seguros' },
  { value: 'operacion-y-logistica', label: 'Operación o logística' },
  { value: 'industria-y-servicios-tecnicos', label: 'Industria o servicio técnico' },
  { value: 'otro', label: 'Otro' },
]

export const profileTeamSizeOptions: ProfileOption[] = [
  { value: 'solo', label: 'Solo o independiente' },
  { value: '2-5', label: '2 a 5 personas' },
  { value: '6-15', label: '6 a 15 personas' },
  { value: '16-50', label: '16 a 50 personas' },
  { value: '50+', label: 'Más de 50 personas' },
  { value: 'otro', label: 'Otro' },
]

export const profileNeedOptions: ProfileOption[] = [
  { value: 'captacion-whatsapp', label: 'Captación y respuesta por WhatsApp' },
  { value: 'seguimiento-comercial', label: 'Seguimiento de leads y ventas' },
  { value: 'turnos-recordatorios', label: 'Turnos, recordatorios y reprogramaciones' },
  { value: 'cobranzas-renovaciones', label: 'Cobranzas, avisos o renovaciones' },
  { value: 'automatizacion-backoffice', label: 'Automatización de tareas internas' },
  { value: 'integraciones-y-sistemas', label: 'Integrar herramientas o sistemas' },
  { value: 'software-a-medida', label: 'Software a medida para ordenar el negocio' },
  { value: 'otro', label: 'Otro' },
]

export const profileInterestOptions: ProfileOption[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'seguimiento', label: 'Seguimiento automático' },
  { value: 'integraciones', label: 'Integraciones' },
  { value: 'ia-aplicada', label: 'IA aplicada' },
  { value: 'paneles', label: 'Paneles o dashboards' },
  { value: 'software-a-medida', label: 'Software a medida' },
]

export const profileChannelOptions: ProfileOption[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'llamada', label: 'Llamada' },
  { value: 'otro', label: 'Otro' },
]

export const profileOnboardingBenefits = [
  'Personalizar el diagnóstico inicial sin pedirte lo mismo en cada contacto.',
  'Priorizar automatizaciones o integraciones que sí encajan con tu negocio.',
  'Ahorrar tiempo en futuras reuniones, propuestas y seguimientos.',
]
