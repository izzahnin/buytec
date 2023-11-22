// 'use client';
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection/index";
import CardProduct from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import SectionCatalogue from "@/components/SectionCatalogue";
import getAllPerfume from "@/firebase/parfume/getAllPerfume";

export default async function Home() {
  // const { logInWithGoogle } = useAuth();
  return (
    <main className="flex flex-col gap-10">
      <HeroSection/>
      <ProductSection />
      <SectionCatalogue />  
      <AboutSection />
    </main>
  );
}
