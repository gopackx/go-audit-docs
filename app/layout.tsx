import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Go Audit — Automatic audit trail for Go',
    template: '%s | Go Audit',
  },
  description:
    'Automatic audit trail and API call logging for Go applications. One line setup. Zero manual code. Full traceability.',
  metadataBase: new URL('https://go-audit.andrianprasetya.com'),
  openGraph: {
    title: 'Go Audit',
    description:
      'Automatic audit trail and API call logging for Go applications.',
    url: 'https://go-audit.andrianprasetya.com',
    siteName: 'Go Audit',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
