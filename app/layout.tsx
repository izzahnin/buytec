import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Elixir",
  description: "Elixir is a Web Application for E-Commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
