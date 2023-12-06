import React from "react";
import Image from "next/image";

interface CardProps {
  bank: string;
  image: string;
}
function CardPaymentMethod(props: CardProps) {
  const { bank, image } = props;

  return (
    <section className="flex h-16 w-42 items-center gap-4 rounded-xl bg-white p-4 text-m  drop-shadow-md hover:border-2 border-collapse  hover:border-primary-blue">
      <input type="radio" name="option" />
      <p>{bank}</p>
      <Image width={48} height={48} alt={bank} src={image} />
    </section>
  );
}

export default CardPaymentMethod;
