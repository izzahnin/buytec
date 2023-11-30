import localFont from '@next/font/local'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const futura = localFont({
  src:'../../../fonts/FuturaLT-Book.woff2',
  display: 'swap',
})

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section  className={futura.className}>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
