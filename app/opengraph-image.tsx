import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Go Audit — Automatic audit trail for Go';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 25% 10%, rgba(37,99,235,0.25), transparent 40%), radial-gradient(circle at 75% 90%, rgba(37,99,235,0.18), transparent 40%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 36,
          }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>
            GO AUDIT
          </span>
        </div>
        <div
          style={{
            fontSize: 42,
            lineHeight: 1.25,
            maxWidth: 980,
            textAlign: 'center',
            color: '#e5e7eb',
          }}
        >
          Automatic audit trail and API call logging for Go applications.
        </div>
        <div
          style={{
            marginTop: 48,
            padding: '14px 24px',
            borderRadius: 10,
            border: '1px solid #1f2937',
            backgroundColor: 'rgba(17, 24, 39, 0.7)',
            fontFamily: 'monospace',
            fontSize: 26,
            color: '#9ca3af',
          }}
        >
          <span style={{ color: '#6b7280' }}>$ </span>
          go get github.com/gopackx/go-audit
        </div>
      </div>
    ),
    size,
  );
}
