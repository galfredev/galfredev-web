import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'GalfreDev'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: 56,
          background:
            'radial-gradient(circle at top, rgba(61,221,196,0.22), transparent 30%), linear-gradient(180deg, #07101d 0%, #050810 65%)',
          color: 'white',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            padding: '12px 18px',
            fontSize: 20,
            letterSpacing: '0.22em',
          }}
        >
          GALFREDEV
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 74, lineHeight: 1.02, letterSpacing: '-0.08em' }}>
            Automatización, software a medida e IA aplicada.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: 'rgba(255,255,255,0.72)' }}>
            Soluciones reales para negocios que necesitan responder mejor, ordenar procesos y escalar con criterio.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
