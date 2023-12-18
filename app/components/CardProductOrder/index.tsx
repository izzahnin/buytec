import React from "react";
import CardReviewsInput from "../CardReviewsInput";
import Image from "next/image";

interface CardProductOrderProps {
  date: string;
  orderstatus: string;
  resi: string;
  Parfum_image: string;
  Parfume_name: string;
  Parfume_qty: number;
  Parfume_price: string;
  // verification: string;
}

export default function CardProductOrder(props: CardProductOrderProps) {
  const {
    date,
    orderstatus,
    resi,
    Parfum_image,
    Parfume_name,
    Parfume_qty,
    Parfume_price,
    // verification,
  } = props;

  const Total_order = (
    Parfume_qty * parseFloat(Parfume_price.replace(/\./g, ""))
  ).toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <main className="w-full max-w-2xl rounded-xl shadow-xl">
      <section className="flex h-full flex-col gap-4 p-3 md:gap-7">
        <div className="flex w-full flex-row items-center justify-between gap-6 text-text-s sm:justify-start md:text-text-m">
          <span className="line-clamp-2 text-xs font-semibold  sm:text-sm">
            {date}
          </span>
          <span className="line-clamp-2 rounded-md bg-[#E4EBF5]  px-2 py-1 text-xs font-semibold text-primary-blue-accent sm:text-sm md:px-4 md:py-1">
            {orderstatus}
          </span>
          <span className="line-clamp-1 cursor-copy select-text text-xs font-semibold sm:text-sm">
            {resi}
          </span>
        </div>

        <section className="flex flex-row items-center justify-start md:gap-3">
            <Image
              priority={true}
              className="w-28 md:w-36"
              src={Parfum_image}
              alt="ParfumeImage"
              width={100}
              height={100}
            />

          <section className="flex w-full flex-col gap-4 text-xs sm:text-sm">
            <div className="flex flex-col">
              <h3 className="line-clamp-1 font-bold">{Parfume_name}</h3>
              <div className="flex gap-2 line-clamp-1">
                <h3>Qty {Parfume_qty} x {Parfume_price}</h3>
              </div>
            </div>

            <button
              className="w-fit rounded-md bg-primary-blue-accent px-6 py-1 font-bold text-white"
              type="button"
            >
              Buy Again
            </button>
          </section>

          <section className=" py-auto flex flex-col gap-2  border-l-2 pl-3 text-xs sm:text-sm md:text-text-l">
            <span className="text-[#858585]">Sub Total</span>
            <span className="font-bold">{Total_order}</span>
          </section>
        </section>

        {orderstatus === "Received" && (
          <div className="pb-3 pl-3 pt-3">
            <CardReviewsInput perfumeId={""} />
          </div>
        )}
      </section>
    </main>
  );
}
