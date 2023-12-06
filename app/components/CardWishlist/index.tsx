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
    <section className="flex h-36 w-full items-center gap-8 rounded-xl border-2 border-[#C7C7C7] px-8">
      <section className="relative h-20 w-14">
        <Image src={image} alt={title} fill />
      </section>

      <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <section className="flex flex-col gap-2 text-text-m md:text-text-l">
          <h5>{title}</h5>
          <p className="text-[#606060]">Price : Rp {price}</p>
        </section>

        <section className="flex items-center gap-5 text-[#8D96AA]">
          <button>
            <h3 className="text-text-l md:text-heading-s">Move to Cart</h3>
          </button>
          <div className="h-6 w-0.5 bg-[#BFC9D9] md:h-6 md:w-0.5"></div>
          <button className="w-5 md:w-5">
            <FaRegTrashCan size="auto" />
          </button>
        </section>
      </section>
    </section>
  );
}
