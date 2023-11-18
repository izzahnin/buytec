import React from "react";

import CardCatalogue from "../CardCatalogue";

export default function SectionCatalogue() {
  return (
    <main className="flex flex-col items-center gap-4 md:gap-6 lg:flex-row lg:gap-8 lg:px-4">
      {/* small cards */}
      <section className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <CardCatalogue
          title="Smell Sweet"
          images={["/perfume1.png", "/perfume2.png"]}
          alt="tes"
          small={true}
        />

        <CardCatalogue
          title="Party Centre"
          images={["/perfume2.png", "/perfume1.png"]}
          alt="tes"
          small={true}
        />

        <CardCatalogue
          title="Scent Stay All Day"
          images={["/perfume1.png", "/perfume1.png"]}
          alt="tes"
          small={true}
        />

        <CardCatalogue
          title="Stay Fresh"
          images={["/perfume2.png", "/perfume2.png"]}
          alt="tes"
          small={true}
        />
      </section>

      {/* large card */}
      <section>
        <CardCatalogue
          title="Your New Signature Scent"
          images={[
            "/perfume1.png",
            "/perfume2.png",
            "/perfume2.png",
            "/perfume1.png",
          ]}
          alt="tes"
          small={false}
        />
      </section>
    </main>
  );
}
