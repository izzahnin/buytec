// 'use client';
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection/index";
import CardProduct from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import SectionCatalogue from "@/components/SectionCatalogue";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import getPerfumesByCategory from "@/firebase/perfume/getPerfumesByCategory";

export default async function Home() {
  // const { logInWithGoogle } = useAuth();
  return (
    <main className="flex flex-col gap-10 items-center">
      <HeroSection />
      <SectionCatalogue />
      <ProductSection />
      <AboutSection />
    </main>
  );
}
