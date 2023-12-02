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
  } = props;
  
  const Total_order = (Parfume_qty * parseFloat(Parfume_price.replace(/\./g, ""))).toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return (
    <main className="shadow-xl rounded-xl">
      <section className="flex flex-col md:gap-7 py-4 px-10 gap-4">
        <div className="text-text-s flex flex-row items-center justify-start gap-6 md:text-text-m">
          <span className="font-semibold">{date}</span>
          <span className="rounded-md bg-[#E4EBF5] px-4 py-1 font-semibold text-primary-blue-accent">
            {orderstatus}
          </span>
          <span className="font-semibold">{resi}</span>
        </div>

        <div>
          <section className="flex flex-row items-center justify-start">
            <div>
              <Image
                className="w-28 md:w-36"
                src={Parfum_image}
                alt="ParfumeImage"
                width={100}
                height={100}
              />
            </div>
            
            <section className="flex flex-col gap-4 pl-3 md:pl-8 md:w-[700px] w-96 text-xs sm:text-sm pr-4">
              <div className="flex flex-col md:text-xl ">
                <h3 className="font-bold">{Parfume_name}</h3>
                <div className="flex gap-2">

                <h3>Qty {Parfume_qty} x</h3>
                <h3>{Parfume_price}</h3>
                </div>
              </div>

              <div className="">
                <button
                  className="w-fit px-6 rounded-md bg-primary-blue-accent py-1 font-bold text-white"
                  type="button"
                >
                  Buy Again
                </button>
              </div>
            </section>

            <section className=" flex flex-col gap-2 border-l-2  pl-3 py-6 text-xs sm:text-sm md:text-text-l">
                <span className="text-[#858585]">Sub Total</span>
                <span className="font-bold">{Total_order}</span>
            </section>
          </section>
        </div>

        {orderstatus === 'Received' && (
          <div className="pt-3 pl-3 pb-3">
            <CardReviewsInput />
          </div>
        )}
      </section>
    </main>
  );
}
