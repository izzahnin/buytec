import CardOrder from "@/components/CardOrder";
import React from "react";

export default function CardOrderSummary() {
  const OrderList = [
    {
      Image: "/images/Prada_LunaRossaOcean.jpg",
      Name: "Ameer Al Oudh Intense Oud",
      Qty: 1,
      Price: "2.999.999",
    },
    {
      Image: "/images/Prada_LunaRossaOcean.jpg",
      Name: "Ameer Al Oudh Intense Oud",
      Qty: 1,
      Price: "2.999.999",
    },
  ];

  const Subtotal = OrderList.reduce(
    (acc, item) => acc + parseFloat(item.Price.replace(/\./g, "")),
    0,
  );
  const Totalitems = OrderList.length;
  const ShippingPrice: string = "Free";
  const Total =
    ShippingPrice === "Free"
      ? Subtotal
      : Subtotal + parseFloat(ShippingPrice.replace(/\./g, ""));

  return (
    <main className="flex h-fit w-full flex-col gap-4 rounded border-2 border-solid border-primary-blue-accent p-6 ">
      <section className="flex flex-col divide-y-2 divide-primary-blue-accent">
        <h1 className="pb-4 text-heading-s font-bold">Order Summary</h1>
        <span className="py-4 text-text-l">{Totalitems} Items In Cart</span>
      </section>

      <section className="flex flex-col gap-3">
        {OrderList.map((List, index) => (
          <CardOrder
            key={index}
            Parfum_image={List.Image}
            Parfume_name={List.Name}
            Parfume_qty={List.Qty}
            Parfume_price={List.Price}
          />
        ))}
      </section>

      <section className="flex flex-col gap-8 pb-16 pt-11 ">
        <div className="flex flex-row justify-between">
          <h1 className="font-semibold">Cart Subtotal</h1>
          <h2>{Subtotal.toLocaleString()}</h2>
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
