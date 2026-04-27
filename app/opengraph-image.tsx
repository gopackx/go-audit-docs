import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

export const alt = 'Go Audit — Automatic audit trail for Go';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  const logoData = fs.readFileSync(
    path.join(process.cwd(), 'public', 'go-audit-primary-logo.png'),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

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
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 32,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={96} height={96} />
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            GO AUDIT
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 38,
            lineHeight: 1.3,
            maxWidth: 920,
            textAlign: 'center',
            color: '#e5e7eb',
            marginBottom: 40,
          }}
        >
          Automatic audit trail and API call logging for Go applications.
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '14px 24px',
            borderRadius: 10,
            border: '1px solid #1f2937',
            backgroundColor: '#0f172a',
            fontFamily: 'monospace',
            fontSize: 24,
            color: '#9ca3af',
          }}
        >
          <span style={{ color: '#6b7280', marginRight: 12 }}>$</span>
          <span style={{ color: '#e5e7eb' }}>
            go get github.com/gopackx/go-audit
          </span>
        </div>
      </div>
    ),
    size,
  );
}
