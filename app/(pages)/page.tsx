'use client';
import AboutSection from "@/components/AboutSection";
import SectionCatalogue from "@/components/SectionCatalogue";

export default function Home() {
  // const { logInWithGoogle } = useAuth();
  return (
    <main className="flex flex-col gap-10">
      <SectionCatalogue />  
      <AboutSection />
    </main>
  );
}
