"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import { Star } from "../StarRating";

import { parserCurrency } from "@/utils/parsercurrency";


interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  concentration: string;
}

export default function CardProduct(props: ProductCardProps) {
  const { id, name, image, price, brand, rating, concentration } = props;

  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <main className="relative flex">
      <Link
        href={`/product/${id}`}
        className=" flex  h-[400px] w-[280px] flex-col items-center justify-between rounded-2xl p-6 transition duration-300 ease-in-out hover:shadow-custom"
      >
        <section>
          <Image
            draggable={false}
            src={image}
            alt={name}
            width={160}
            height={500}
          />
        </section>

        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-lg uppercase">{brand}</h1>
          <p className="font-semibold">{name}</p>
          <p className="text-sm">{concentration}</p>
          <p>{parserCurrency(price)}</p>
          <Star stars={rating} />
        </section>
      </Link>
      <section
        className="t-0 round absolute right-0 z-30 m-3 rounded-full p-1"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <IoMdHeart className="text-heading-l text-red-600" />
        ) : (
          <IoMdHeartEmpty className="text-heading-l text-red-600" />
        )}
      </section>
    </main>
  );
}
