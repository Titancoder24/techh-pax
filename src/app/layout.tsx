import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TechH-PAX | AI Fashion Collaboration Platform',
  description: 'Cloud-based collaborative fashion development environment for brands and manufacturers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
