import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unchained AI',
  description:
    'An innovating and advanced trading bot powered by AI designed to enhance security, user experience and maximize holders profit',
  icons: {
    icon: './icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
