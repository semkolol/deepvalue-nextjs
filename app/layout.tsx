import Script from 'next/script';
import { PropsWithChildren } from 'react';

import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';


import { GeistSans } from 'geist/font'
import { NextThemeProvider } from "../components/ThemeProvider"
import 'styles/main.css';

const meta = {
  title: 'Deepvalue - Stock Charts and Stock Data!',
  description: 'Deepvalue provides deep financial insights for Stocks and helps you find Stocks with our powerful Stock Screener Pro. The best alternative to the endless Tables seen on Yahoo Finance, MarketWatch and others.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://deepvalue.pro',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@deepvaluepro',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-white dark:bg-black loading">
        <SupabaseProvider>
          <NextThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* @ts-ignore */}
            <Navbar />
            <main
              id="skip"
            // className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
            >
              {children}
            </main>
            <Footer />
          </NextThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
