# GalfreDev Web

Landing premium de servicios tecnológicos construida con Next.js App Router, orientada a:

- presentar la propuesta de valor de GalfreDev con foco comercial real
- llevar la conversación a WhatsApp o a un diagnóstico
- capturar leads con contexto y consentimiento
- ofrecer acceso liviano con Supabase Auth
- dejar una base lista para crecer hacia seguimiento comercial y automatizaciones

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Supabase Auth + Database
- Vercel Analytics + Speed Insights

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
```

`npm run check` ejecuta la validación completa recomendada antes de subir o desplegar.

## Variables de entorno

Tomá [`.env.example`](./.env.example) como base.

Variables principales:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_URL`

Compatibilidad temporal:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` todavía funciona como fallback si seguís usando el naming viejo.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Estructura principal

- [`src/app`](./src/app): rutas, metadata, API routes y páginas
- [`src/components/sections`](./src/components/sections): secciones principales de la home
- [`src/components/ui`](./src/components/ui): piezas reutilizables de interfaz
- [`src/components/motion`](./src/components/motion): animaciones y wrappers visuales
- [`src/content`](./src/content): contenido editable y configuración de secciones
- [`src/lib`](./src/lib): utilidades, validaciones, auth, Supabase y helpers de dominio
- [`data/schema.sql`](./data/schema.sql): esquema base actualizado de Supabase
- [`data/migrations`](./data/migrations): migraciones SQL aditivas y seguras

## Supabase

La app está preparada para trabajar con estas tablas:

- `profiles`
- `user_preferences`
- `lead_intake`
- `lead_events`
- `marketing_consents`

El esquema completo vive en [`data/schema.sql`](./data/schema.sql).

Si querés evolucionar la base sin romper datos existentes, aplicá primero las migraciones de [`data/migrations`](./data/migrations).

## Flujo principal

1. el usuario llega a la landing
2. puede escribir por WhatsApp o dejar una consulta
3. el backend registra el lead y el consentimiento
4. si inicia sesión, puede completar o editar su perfil
5. la base queda lista para seguimiento y futuras automatizaciones

## Deploy

El proyecto está pensado para desplegar en Vercel.

Antes de deployar:

1. configurá las variables de entorno
2. verificá los providers OAuth en Supabase si vas a usar acceso social
3. corré `npm run check`
4. aplicá la migración SQL pendiente si corresponde

## Notas de mantenimiento

- El contenido visible principal vive en [`src/content/site-content.ts`](./src/content/site-content.ts).
- El contenido del onboarding/perfil vive en [`src/content/profile-content.ts`](./src/content/profile-content.ts).
- Las constantes del dominio de leads viven en [`src/lib/lead-model.ts`](./src/lib/lead-model.ts).
- Las validaciones de contacto y perfil están en [`src/lib/contact.ts`](./src/lib/contact.ts) y [`src/lib/profile.ts`](./src/lib/profile.ts).

## Pendientes razonables para una próxima etapa

- aplicar la migración de `lead_events` y metadata comercial en Supabase
- empezar a registrar eventos de lead en backend
- definir un panel interno simple para seguimiento comercial
- instrumentar analítica de conversión con eventos reales
