# Miguel Jarquín — sitio personal

Sitio en Next.js (App Router) + TypeScript + Tailwind con la arquitectura de
conversión para charlas, talleres y consultoría de IA.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y completa las variables (ver abajo)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Otros scripts:

```bash
npm run typecheck   # TypeScript sin emitir archivos
npm run build        # build de producción
npm run start         # sirve el build de producción
npm run lint            # ESLint
```

## Variables de entorno

Definidas en `.env.example`, se configuran en Vercel (o el hosting que uses)
como *Environment Variables* del proyecto:

| Variable | Requerida | Para qué |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sí | Número de WhatsApp en formato internacional sin signos (ej. `5215512345678`). Sin esto, los botones de WhatsApp no se muestran. |
| `LEADS_WEBHOOK_URL` | Recomendada | Endpoint (Zapier, Make, n8n o el webhook nativo de un CRM) al que se reenvía cada lead enviado desde los formularios. Sin esto, los leads solo quedan en los logs del servidor. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Opcional | ID de medición de Google Analytics 4 (`G-XXXXXXX`). Sin esto, los eventos de conversión (`cta_charla_click`, `whatsapp_click`, `form_complete`, etc.) se registran solo en `dataLayer`, sin enviarse a GA. |
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL pública del sitio (ej. `https://miguel-jarquin.com`), sin slash final. Se usa para que las imágenes de Open Graph/Twitter (generadas en `app/opengraph-image.tsx`) resuelvan a la URL real en vez de `localhost`. |

## Deploy (Vercel)

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (se detecta automáticamente).
3. Agrega las variables de entorno de la tabla anterior en la configuración del proyecto.
4. Conecta tu dominio en *Settings → Domains*.

Cualquier otro hosting compatible con Next.js (Node 18+) funciona igual: `npm run build && npm run start`.

## Estructura relevante

- `app/` — páginas (home, `/charlas`, `/talleres`, `/consultoria-ia`, `/contacto`, `/aviso-de-privacidad`).
- `components/` — UI reutilizable (`ServiceLeadForm`, `ConsultingWizard`, `StickyCTA`, CTAs).
- `lib/` — capa de leads (`leads.ts`, expuesta vía `/api/leads`), analytics, WhatsApp y UTM.
- `data/` — contenido de servicios, talleres y el perfil de Miguel.

## Pendientes conocidos

- Diseño visual con la identidad de marca definitiva (paleta, tipografía, logo, fotografía).
- Conectar `LEADS_WEBHOOK_URL` a un CRM real.
- Definir `NEXT_PUBLIC_GA_MEASUREMENT_ID` si se usará GA4.
