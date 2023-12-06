import React from "react";

interface CardProps {
  bank: string;
  image: string;
}
function CardPaymentMethod(props: CardProps) {
  const { bank, image} = props;

  return (
    <section className="flex h-16 w-48 items-center gap-4 rounded-xl bg-white hover:border-2 hover:border-primary-blue p-4 text-lg font-medium drop-shadow-md">
      <input type="radio" name="option"/>
      <p>{bank}</p>
      <img src={image} />
    </section>
  );
}

export default CardPaymentMethod;
