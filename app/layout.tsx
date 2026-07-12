import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = { title: { default: 'The Yellow Mango | Everyday Products Made Better', template: '%s | The Yellow Mango' }, description: 'Premium, practical products for the kitchen, home and everyday life. Browse The Yellow Mango products and purchase securely on Amazon.com.', openGraph: { title: 'The Yellow Mango', description: 'Everyday products made better.', type: 'website' } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><Header />{children}<Footer /></body></html>; }
