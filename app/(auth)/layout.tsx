'use client';
import localFont from "next/font/local"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthUserProvider } from '@/firebase/auth/AuthUserProvider';

const futura = localFont({
  src:'../../fonts/FuturaLT-Book.woff2',
  display: 'swap',
})

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthUserProvider>
    <section  className={futura.className}>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </section>
    </AuthUserProvider>
  );
}
