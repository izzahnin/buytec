import CardOrder from "@/components/CardOrder";
import { getPerfumeByIdFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";
import { useSearchParams } from "next/navigation";
import React from "react";

interface CardOrderSummaryProps {
  perfumes: string[];
  perfumeAmount: number[];
  total: number;
  formattedTotal: string;
}

export default function CardOrderSummary(props: CardOrderSummaryProps) {
  const { perfumes,
    perfumeAmount,
    total,
    formattedTotal, } = props;

  // const Subtotal = OrderList.reduce(
  //   (acc, item) => acc + parseFloat(item.Price.replace(/\./g, "")),
  //   0,
  // );
  const subTotal = total;
  const Totalitems = perfumes.length;
  const ShippingPrice: string = "Free";
  const Total =
    ShippingPrice === "Free"
      ? subTotal
      : subTotal + parseFloat(ShippingPrice.replace(/\./g, ""));

  return (
    <main className="flex h-fit w-full flex-col gap-4 rounded border-2 border-solid border-primary-blue-accent p-6 ">
      <section className="flex flex-col divide-y-2 divide-primary-blue-accent">
        <h1 className="pb-4 text-heading-s font-bold">Order Summary</h1>
        <span className="py-4 text-text-l">{Totalitems} Items In Cart</span>
      </section>

      <section className="flex flex-col gap-3">
        {perfumes.map((id, index) => {
          const perfume = getPerfumeByIdFromLocal(id)!;
          return <CardOrder
            key={index}
            Parfum_image={perfume.image}
            Parfume_name={perfume.name}
            Parfume_qty={perfumeAmount[index]}
            Parfume_price={perfume.price.toString()}
          />
})}
      </section>

      <section className="flex flex-col gap-8 pb-16 pt-11 ">
        <div className="flex flex-row justify-between">
          <h1 className="font-semibold">Cart Subtotal</h1>
          <h2>{subTotal.toLocaleString()}</h2>
        </div>

        <div className="flex flex-row justify-between">
          <h1 className="font-semibold">Shipping</h1>
          <h2>{ShippingPrice}</h2>
        </div>

        <div className="flex flex-row justify-between">
          <h1 className="font-semibold">Total Payment</h1>
          <h2 className="text-xl font-bold">{Total.toLocaleString()}</h2>
        </div>
      </section>
    </main>
  );
}
