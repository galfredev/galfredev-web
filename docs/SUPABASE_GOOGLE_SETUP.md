# Setup Nuevo: Supabase + Google + n8n

Esta guia sirve para recrear la infraestructura del proyecto con una cuenta nueva y dejar el login de Google funcionando correctamente.

## 1. Crear el proyecto de Supabase

1. Entrar a [Supabase](https://supabase.com/).
2. Crear un proyecto nuevo.
3. Guardar estos datos:
   - Project URL
   - anon public key
   - service role key

Despues completa el archivo `.env.local` usando como referencia [`.env.example`](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/.env.example).

## 2. Crear las tablas y politicas

1. Abrir `SQL Editor` en Supabase.
2. Ejecutar el contenido de [data/schema.sql](D:/DEV/Proyectos/GalfreDev/galfre-dev-next/data/schema.sql).

Eso crea:

- `public.contacts`
- `public.projects`
- politicas RLS para formulario y portal

## 3. Configurar Auth en Supabase

Entrar a `Authentication > URL Configuration`.

Configurar:

- `Site URL`: `http://localhost:3000` para pruebas locales
- `Redirect URLs`:
  - `http://localhost:3000/dashboard`
  - `http://localhost:3000/login`
  - tu dominio final cuando lo publiques
  - por ejemplo `https://galfre.dev/dashboard`

## 4. Configurar Google OAuth

### En Google Cloud

1. Crear un proyecto nuevo en [Google Cloud Console](https://console.cloud.google.com/).
2. Ir a `APIs & Services > OAuth consent screen`.
3. Configurar la pantalla de consentimiento.
4. Ir a `Credentials > Create Credentials > OAuth Client ID`.
5. Elegir tipo `Web application`.

Agregar como `Authorized redirect URI` la URL exacta que te da Supabase para Google Provider.

La ves en:

- `Supabase > Authentication > Providers > Google`

Normalmente tiene este formato:

```text
https://TU-PROYECTO.supabase.co/auth/v1/callback
```

Guardar:

- `Google Client ID`
- `Google Client Secret`

### En Supabase

1. Entrar a `Authentication > Providers > Google`.
2. Activar el provider.
3. Pegar el `Client ID`.
4. Pegar el `Client Secret`.
5. Guardar.

## 5. Variables de entorno del proyecto

Crear o actualizar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/contact
NEXT_PUBLIC_WHATSAPP_NUMBER=549351XXXXXXXX
NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE=Hola, vengo desde la web de GalfreDev y quiero consultar por una automatizacion.
```

## 6. Configurar n8n

Tu webhook debe aceptar un `POST` JSON.

El proyecto envia estos campos principales:

- `nombre`
- `email`
- `whatsapp`
- `empresa`
- `servicio`
- `timeline`
- `mensaje`
- `como_encontro`
- `source`
- `whatsapp_url`
- `timestamp`

Si vas a reutilizar el workflow viejo, revisa que el nodo webhook y los nombres coincidan.

## 7. Probar localmente

En el proyecto:

```bash
npm install
npm run dev
```

Despues probar:

1. Abrir `http://localhost:3000`
2. Enviar el formulario
3. Verificar que aparezca el registro en `contacts`
4. Verificar que redirija o permita continuar por WhatsApp
5. Entrar a `/login`
6. Probar `Continuar con Google`
7. Confirmar que el usuario vuelva a `/dashboard`

## 8. Cargar proyectos de prueba

Para que el dashboard muestre algo, inserta un proyecto vinculado al usuario autenticado:

```sql
insert into public.projects (user_id, title, progress, status, details)
values (
  'USER_ID_DEL_USUARIO',
  'Automatizacion comercial',
  45,
  'en progreso',
  'Integracion de formulario web, WhatsApp y seguimiento comercial.'
);
```

El `USER_ID_DEL_USUARIO` lo podes ver en `Authentication > Users`.

## 9. Checklist final

- Supabase nuevo creado
- SQL ejecutado
- Google Provider activo
- Redirect URL correcta
- `.env.local` actualizado
- Webhook de n8n actualizado
- Numero real de WhatsApp cargado
- `npm run lint` OK
- `npm run build` OK

## 10. Estado actual del repo

El repo ya esta preparado para esta migracion:

- el formulario usa API interna
- el login social sale por Supabase
- el dashboard esta protegido
- el proyecto compila correctamente

Lo unico que falta para cerrar la migracion es cargar la configuracion real de tus servicios externos.
