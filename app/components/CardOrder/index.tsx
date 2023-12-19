import React from "react";
import Image from "next/image";

interface CardOrdersInterface {
  Parfum_image: string;
  Parfume_name: string;
  Parfume_qty: number;
  Parfume_price: string;
}
export default function CardOrder(props: CardOrdersInterface) {
  const { Parfum_image, Parfume_name, Parfume_qty, Parfume_price } = props;
  const Totalitems = Parfume_name;

  return (
    <main className="flex w-full rounded shadow-lg ">
      <section className="m-2 w-full flex justify-between gap-2 sm:gap-4 md:gap-4 ">
        <div className=" flex m-auto w-1/4 object-cover">
          <Image
            priority={true}
            src={Parfum_image}
            alt="ParfumeImage"
            width={100}
            height={100}
            className="m-auto h-auto w-auto object-cover"
          />
        </div>

        <section className="flex w-full flex-col justify-between my-2 gap-1">
          <h1 className=" line-clamp-1 font-bold">{Parfume_name}</h1>
          <h2 className="text-right text-lg">{Parfume_price}</h2>
          <h3>Qty {Parfume_qty}</h3>
        </section>
      </section>
    </main>
  );
}
