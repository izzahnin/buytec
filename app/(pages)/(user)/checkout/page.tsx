import CardOrderSummary from "@/components/CardOrderSummary";
import React from "react";

export default function checkout() {
  return (
    <main>
      <div className="flex justify-center py-8">
        <CardOrderSummary />
      </div>
    </main>
  );
}
