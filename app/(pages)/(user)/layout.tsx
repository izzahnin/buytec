'use client';
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthUserProvider, useAuth } from "@/firebase/auth/AuthUserProvider";

const futura = localFont({
  src: "../../../fonts/FuturaLT-Book.woff2",
  display: "swap",
});

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  // console.log(auth.user.id);
  return (
    <AuthUserProvider>
      <section className={futura.className}>
        <Navbar />
        {children}
        <Footer />
      </section>
    </AuthUserProvider>
  );
}
