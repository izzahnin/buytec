import React, { useState } from "react";
import Image from "next/image";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import Link from "next/link";

interface CardSearchProductProps {
  id: string;
  name: string;
  image: string;
  brand: string;
  concentration: string;
  size: number;
  onClick: () => void;
}

export default function CardSearchProduct(props: CardSearchProductProps) {
  const { id, name, image, brand, concentration, size, onClick} = props;
  const slug = name.toLowerCase().split(" ").join("-");

  return (
    <Link
      href={`/product/${id}/${slug}`}
      className="z-40 hidden w-full  gap-2 rounded-xl border-[1px] bg-white p-2 shadow-md lg:flex"
      onClick={onClick}
    >
      <Image
        src={image}
        alt={name}
        width={40}
        height={40}
        className="w-[50px] object-cover"
      />
      <section>
        <h1 className="uppercase">{brand}</h1>
        <p className="font-semibold">{name}</p>
        <p className="text-sm">
          {concentration} ({size}ml)
        </p>
      </section>
    </Link>
  );
}
