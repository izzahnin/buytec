import React from "react";

interface CardProps {
  bank: string;
  image: string;
}
function CardPaymentMethod(props: CardProps) {
  const { bank, image} = props;

  return (
    <section className="flex h-16 w-auto items-center gap-4 rounded-xl bg-white hover:border-primary-blue hover:border-2 p-4 text-lg font-medium drop-shadow-md">
      <input type="radio"></input>
      <p>{bank}</p>
      <img src={image}></img>
    </section>
  );
}

export default CardPaymentMethod;
