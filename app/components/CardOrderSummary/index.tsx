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
  const CardShipping = "Reguler - J&T (2 - 3 days)";
  const ShippingPrice: string = "Free";
  const Total =
    ShippingPrice === "Free"
      ? Subtotal
      : Subtotal + parseFloat(ShippingPrice.replace(/\./g, ""));

  return (
      <section className="mx-6 flex w-52 md:w-[446.04px] sm:w-[370px] flex-col">
        <section className="flex flex-col divide-y-2 divide-primary-blue-accent">
          <h1 className="my-[19px] text-heading-m">Order Summary</h1>
          <span className="py-3 text-text-l pb-6">{Totalitems} Items In Cart</span>
        </section>

        <section className="gap-4">
          <div className="flex flex-col gap-3 sm:gap-5">
            {OrderList.map((List, index) => (
              <CardOrder
                key={index}
                Parfum_image={List.Image}
                Parfume_name={List.Name}
                Parfume_qty={List.Qty}
                Parfume_price={List.Price}
              />
            ))}
          </div>
        </section>

        <section className="pt-11 flex flex-col gap-8 pb-16 sm:text-heading-m">
          <div className="flex flex-row justify-between">
            <h2>Cart Subtotal</h2>
            <h2>{Subtotal.toLocaleString()}</h2>
          </div>

          <div>
            <div className="flex flex-row justify-between">
              <h2>Shipping</h2>
              <h2>{ShippingPrice}</h2>
            </div>
            <span className="text-text-m sm:text-text-xl text-zinc-800 ">{CardShipping}</span>
          </div>

          <div className="flex flex-row justify-between">
            <h2>Total Payment</h2>
            <h2>{Total.toLocaleString()}</h2>
          </div>
        </section>
      </section>
    </main>
  );
}
