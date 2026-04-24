import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Homebase - Unified 13 Step Project',
  description: 'Single integrated Next.js app with app/modules/lib/prisma architecture.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
