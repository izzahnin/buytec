import React, { useState } from "react";

import { parserCurrency } from "@/utils/parsercurrency";

interface CardShippingMethodProps {
  courier: string;
  shippingCost: number;
  estimation: string;
}

export default function CardShippingMethod(props: CardShippingMethodProps) {
  const { courier, shippingCost, estimation } = props;

  const [isSelected, setIsSelected] = useState(false);

  const handleItemSelected = () => {
    setIsSelected(!isSelected);
  };

  return (
    <section
      className={`w-fit cursor-pointer rounded-md px-3 py-2 ${
        isSelected ? "border-2 border-primary-blue" : ""
      }`}
      onClick={handleItemSelected}
    >
      <section className="flex items-center gap-7">
        <h2 className="text-heading-s">{courier}</h2>
        <p>{parserCurrency(shippingCost)}</p>
      </section>

      <p className="text-slate-600">Receive by {estimation}</p>
    </section>
  );
}
