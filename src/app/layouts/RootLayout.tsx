import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/shared/config';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: `${site.name}: 3D tour`,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: '#16231f',
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
