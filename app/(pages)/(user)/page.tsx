// 'use client';
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection/index";
import CardProduct from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import SectionCatalogue from "@/components/SectionCatalogue";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import getPerfumesByCategory from "@/firebase/perfume/getPerfumesByCategory";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const { logInWithGoogle } = useAuth();
  return (
    <div className="relative">
      <main className="flex flex-col items-center gap-10">
        <HeroSection />
        <SectionCatalogue />
        <ProductSection />
        <AboutSection />
      </main>

      <Link 
        as="link"
        href={"https://wa.me/+6281355938355"}>
        <Image
          src={"/whatsapp-icon.svg"}
          alt="whatsappIcon"
          width={50}
          height={50}
          className="fixed bottom-32 right-2"
        />
      </Link>
    </div>
  );
}
