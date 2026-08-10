import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--app-font-sans',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--app-font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "D'Lavigne · París",
  description:
    "D'Lavigne · París — a scroll-driven gallery showcase.",
  robots: 'index, follow',
  openGraph: {
    title: "D'Lavigne · París",
    description:
      "D'Lavigne · París — a scroll-driven gallery showcase.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "D'Lavigne · París",
    description:
      "D'Lavigne · París — a scroll-driven gallery showcase.",
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
