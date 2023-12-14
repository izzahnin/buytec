import CardDashboard from "@/(pages)/(admin)/components/CardDashboard";
import React from "react";

export default function Dashboard() {
  const cardlist = [
    { id: 1, title: "Total Product", total: 40 },
    { id: 2, title: "Total Purchase", total: 100 },
    // { id: 3, title: "Total P", total: 100 },
  ]
  return (
    <main className="m-3 my-5 flex h-creen flex-col gap-4 overflow-hidden">
      <h1 className="text-heading-s font-bold">Dashboard</h1>
      <section className="grid grid-cols-2 gap-3 w-full bg-white p-3">
        {cardlist.map((card) => {
          return (
            <CardDashboard key={card.id} title={card.title} total={card.total} />
          )
        })}
      </section>
    </main>
  );
}
