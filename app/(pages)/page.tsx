// 'use client';
import AboutSection from "@/components/AboutSection";
import SectionCatalogue from "@/components/SectionCatalogue";
import getAllPerfume from "@/firebase/parfume/getAllPerfume";

export default async function Home() {
  // const { logInWithGoogle } = useAuth();
  return (
    <main className="flex flex-col gap-10">
      <SectionCatalogue />  
      <AboutSection />
    </main>
  );
}
