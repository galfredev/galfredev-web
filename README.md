# GalfreDev

Sitio principal de GalfreDev para presentar servicios de automatizacion con IA, desarrollo de software y consultoria tecnica. Incluye:

- landing comercial
- seccion personal y portfolio
- formulario de contacto conectado a Supabase
- integracion con n8n
- portal de clientes con autenticacion mediante Supabase

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase Auth + Database
- n8n webhook

## Variables de entorno

Usa [`.env.example`](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/.env.example) como plantilla y crea tu `.env.local`.

Variables necesarias:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_N8N_WEBHOOK_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE`

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Validaciones

```bash
npm run lint
npm run build
```

## Estructura importante

- [src/app/page.tsx](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/page.tsx): landing principal
- [src/components/ContactForm.tsx](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/components/ContactForm.tsx): formulario comercial
- [src/app/api/contact/route.ts](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/api/contact/route.ts): backend del formulario
- [src/app/login/page.tsx](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/login/page.tsx): acceso al portal
- [src/app/dashboard/page.tsx](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/app/dashboard/page.tsx): portal de clientes
- [src/proxy.ts](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/src/proxy.ts): proteccion de rutas privadas
- [data/schema.sql](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/data/schema.sql): tablas y politicas de Supabase

## Configuracion nueva de Supabase y Google

Segui la guia completa en:

[docs/SUPABASE_GOOGLE_SETUP.md](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/docs/SUPABASE_GOOGLE_SETUP.md)

## Flujo del formulario

1. El visitante completa el formulario.
2. La app envia el payload a `/api/contact`.
3. La API guarda el lead en `public.contacts`.
4. Si hay webhook configurado, se sincroniza con n8n.
5. La respuesta devuelve un link de WhatsApp prearmado para continuar la conversacion.

## Portal de clientes

- Login por magic link
- Login social por Google, GitHub o LinkedIn si estan configurados en Supabase
- Proteccion de `/dashboard`
- Lectura de proyectos desde `public.projects`

## Notas

- La `anon key` de Supabase es publica por diseño.
- La `service role key` no debe exponerse al navegador ni subirse al repo.
- El webhook de n8n conviene publicarlo por `https` en produccion.
