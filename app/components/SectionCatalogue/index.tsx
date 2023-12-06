import React from "react";

import CardCatalogue from "../CardCatalogue";

export default function SectionCatalogue() {
  return (
    <main className="flex flex-col items-center gap-4 md:gap-6 lg:w-11/12 lg:flex-row lg:gap-8 lg:px-4">
      {/* small cards */}
      <section className="grid grid-cols-2 gap-4 md:gap-6 lg:w-full lg:gap-8">
        <CardCatalogue
          title="Smell Sweet"
          images={[
            "/Dior_Criuse Collection Escale a Parati.jpg",
            "/Prada_Candy.jpg",
          ]}
          alt="tes"
          small={true}
        />

        <CardCatalogue
          title="Party Centre"
          images={[
            "/Versace_PourFemmeDylanPurple.jpg",
            "/HMNS_The Perfection.jpg",
          ]}
          alt="tes"
          small={true}
        />

        <CardCatalogue
          title="Scent Stay All Day"
          images={["/Diptyque_Philosykos.jpg", "/Lattafa_Oud Mood.jpg"]}
          alt="tes"
          small={true}
        />

        <CardCatalogue
          title="Stay Fresh"
          images={[
            "/Dior_Eau de Cologne Fraîche.jpg",
            "/Prada_LunaRossaOcean.jpg",
          ]}
          alt="tes"
          small={true}
        />
      </section>

      {/* large card */}
      <section className="lg:w-full">
        <CardCatalogue
          title="Your New Signature Scent"
          images={[
            "/Dior_Eau de Cologne Fraîche.jpg",
            "/Versace_PourHommeDylanBlue.jpg",
            "/Lattafa_Fakhar Black.jpg",
            "/Prada_La Femme.jpg",
          ]}
          alt="tes"
          small={false}
        />
      </section>
    </main>
  );
}
