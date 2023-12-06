import Image from "next/image";
import React, { useEffect, useState } from "react";

import { FaRegTrashCan } from "react-icons/fa6";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import { parserCurrency } from "@/utils/parsercurrency";
import { useAuth } from "@/firebase/auth/AuthUserProvider";

interface CardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  subtotal: number;
  quantity: number;
}

export default function CardCart(props: CardProps) {
  const { id, title, price, image, subtotal, quantity } = props;
  const [ quantityValue, setQuantityValue ] = useState(quantity);

  const auth = useAuth();
  const handleDelete = async () => {
    await auth.deleteFromCart(id);
  }

  const handleAdd = async () => {
    await auth.updateAmountOnCart(id, true);
  }

  const handleMin = async () => {
    await auth.updateAmountOnCart(id, false);
  }

  useEffect(() => {
    setQuantityValue(quantity);
  }, [quantity]);


  return (
    <section className="flex w-auto flex-col gap-6 rounded-xl border-2 border-[#C7C7C7]">
      <section className="flex flex-row items-center gap-8 px-8 py-6 ">
        <input
          type="checkbox"
          className="border-red h-6 w-7 appearance-none border-2 border-black bg-white text-heading-m before:absolute before:scale-0 before:leading-6 before:text-white before:content-['\2713'] checked:bg-primary-blue checked:before:scale-100"
        />
        <section className="relative h-20 w-14">
          <Image src={image} alt={title} fill />
        </section>

        <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <section className="flex flex-col gap-2 text-text-m md:text-text-l">
            <h5 className="font-semibold">{title}</h5>
            <p className="font-semibold">Price : {parserCurrency(price)}</p>
            <p className="text-[#606060]">
              Subtotal : {parserCurrency(subtotal)}
            </p>
          </section>

          {/* Mobile */}
          <section className="flex items-center justify-between text-[#8D96AA] md:hidden">
            <section className="flex gap-5">
              {/* <button>
                <h3 className="text-text-l md:text-heading-s">Move to Cart</h3>
              </button> */}

              <div className="h-6 w-0.5 bg-[#BFC9D9]"></div>

              <button className="w-5"
              onClick={handleDelete}>
                <FaRegTrashCan size="auto" />
              </button>
            </section>

            <section className="flex gap-5">
              <button className={`w-6 ${quantityValue == 1 ? '' : 'text-dark-blue'}`}
              onClick={handleMin}>
                <FiMinusCircle size="auto" />
              </button>

              <p className="font-semibold">{quantityValue}</p>

              <button className="w-6 text-dark-blue"
              onClick={handleAdd}>
                <FiPlusCircle size="auto" />
              </button>
            </section>
          </section>
        </section>
      </section>

      {/* Desktop */}
      <section className="hidden items-center justify-end gap-12 border-[#C7C7C7] px-8 py-4 text-[#8D96AA] md:flex md:border-t-2">
        <section className="flex gap-5">
          {/* <button>
            <h3 className="text-text-l md:text-heading-s">Move to Cart</h3>
          </button> */}

          <div className="h-6 w-0.5 bg-[#BFC9D9] md:h-6 md:w-0.5"></div>

          <button className="w-5 md:w-5"
          onClick={handleDelete}>
            <FaRegTrashCan size="auto" />
          </button>
        </section>

        <section className="flex gap-5">
          <button className={`w-6 ${quantityValue == 1 ? '' : 'text-dark-blue'}`}
          onClick={handleMin}>
            <FiMinusCircle size="auto" />
          </button>

          <p className="font-semibold">{quantityValue}</p>

          <button className="w-6 text-dark-blue md:w-6"
          onClick={handleAdd}>
            <FiPlusCircle size="auto" />
          </button>
        </section>
      </section>
    </section>
  );
}