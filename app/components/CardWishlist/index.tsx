import Image from "next/image";
import React from "react";

import { FaRegTrashCan } from "react-icons/fa6";

interface CardProps {
  title: string;
  price: string;
  image: string;
}

export default function CardWishlist(props: CardProps) {
  const { title, price, image } = props;

  return (
    <main className="flex w-full items-center gap-2 rounded-xl border-2 border-[#C7C7C7] p-6 ">
      <section className="flex justify-center object-cover w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/10 xl:w-32 ">
        <Image src={image} alt={title} width={100} height={100} 
        className="h-[100px] w-auto m-0"/>
      </section>

      <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-2">
          <h5 className="text-xl line-clamp-2">{title}</h5>
          <p className="text-[#606060]">Price : Rp {price}</p>
        </div>

        <div className="flex items-center gap-5  text-[#8D96AA]">
          <button>
            <h3 className="">Move to Cart</h3>
          </button>
          <span className="h-6 w-0.5 bg-[#BFC9D9] md:h-6 md:w-0.5"></span>
          <button className="w-4 md:w-4">
            <FaRegTrashCan size="auto" />
          </button>
        </div>
      </section>
    </main>
  );
}
