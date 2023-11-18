import AboutSection from "@/components/AboutSection";
import SectionCatalogue from "@/components/SectionCatalogue";

export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <SectionCatalogue />  
      <AboutSection />
    </main>
  );
}
