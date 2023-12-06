import React from "react";

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
    <main className="shadow-lg">
      <section className="m-2 flex flex-col ">
        <section className="flex flex-row items-center justify-between gap-2 sm:gap-4 md:gap-4">
          <div className="flex gap-4">
            <div>
              <img
                className="w-14 md:w-28"
                src={Parfum_image}
                alt="ParfumeImage"
                width={100}
                height={100}
              />
            </div>

            <section className="flex w-32 flex-col gap-3 text-[10px] sm:w-52 sm:gap-8 sm:text-text-l md:my-4 md:w-72 md:text-text-xl">
              <div className="flex flex-col">
                <h3 className="line-clamp-1">{Parfume_name}</h3>
              </div>

              <div>
                <h3>Qty {Parfume_qty}</h3>
              </div>
            </section>
          </div>

          <div>
            <h3 className="text-[10px] sm:text-text-m md:text-heading-s">
              {Parfume_price}
            </h3>
          </div>
        </section>
      </section>
    </main>
  );
}
