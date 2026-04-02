# GalfreDev Web

Nueva base comercial de GalfreDev sobre Next.js App Router, pensada para:

- presentar la marca y sus soluciones con una landing premium orientada a conversión
- llevar la conversación a WhatsApp o a un diagnóstico comercial
- ofrecer autenticación secundaria con Supabase Auth
- guardar perfiles, preferencias, leads y consentimientos de forma separada
- desplegar con prolijidad en Vercel

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Supabase Auth + Database
- Vercel Analytics + Speed Insights

## Variables de entorno

Usá [`.env.example`](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/.env.example) como base.

Variables principales:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_URL`

Compatibilidad temporal:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` se acepta como fallback mientras migrás el naming viejo.

## Desarrollo

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`

## Validación

```bash
npm run lint
npm run build
```

## Estructura principal

- [src/app/page.tsx](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/page.tsx): landing principal
- [src/content/site-content.ts](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/content/site-content.ts): textos, CTA, links, certificados y contenido editable
- [src/app/api/lead/route.ts](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/api/lead/route.ts): captura de leads con mitigaciones básicas de abuso
- [src/app/login/page.tsx](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/login/page.tsx): acceso secundario
- [src/app/perfil/page.tsx](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/perfil/page.tsx): perfil autenticado
- [src/lib/supabase](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/lib/supabase): clientes SSR/browser y middleware
- [data/schema.sql](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/data/schema.sql): esquema base para Supabase

## Supabase

La app está pensada para trabajar con:

- `profiles`
- `user_preferences`
- `lead_intake`
- `marketing_consents`

El esquema actualizado está en [data/schema.sql](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/data/schema.sql).

## Nota de integración

Para cerrar la integración final de auth social en producción todavía hacen falta, si no están configurados:

- credenciales OAuth de Google
- credenciales OAuth de GitHub
- credenciales OAuth de LinkedIn
- URLs de callback correctas para local, preview y production
