"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import { Star } from "../StarRating";

import { parserCurrency } from "@/utils/parsercurrency";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import ModalToast from "../ModalToast";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  concentration: string;
  size: number;
}

export default function CardProduct(props: ProductCardProps) {
  const { id, name, image, price, brand, rating, concentration, size } = props;
  const auth = useAuth();

  const [isFavorite, setIsFavorite] = useState(
    auth.user.id == null
      ? false
      : auth.user.wishlist.includes(id)
      ? true
      : false,
  );

  const handleFavoriteClick = async () => {
    // check if user already login
    if (auth.user.id != null) {
      // if item is already in wishlist
      if (isFavorite) {
        await auth.deleteFromWishlist(id);
      }
      // if item is not in wishlist
      else {
        await auth.addToWishlist(id);
      }
      setIsFavorite(!isFavorite);
    } else {
      // TODO: CHANGE POP UP
      toast.custom((t) => (
        <ModalToast
          closeModal={() => toast.dismiss(t)}
          value="Create account to add perfume to wishlist"
        />
      ));
    }
  };
  
  const slug = name.toLowerCase().split(" ").join("-");

  return (
    <main className="relative flex">
      <Link
        href={`/product/${id}/${slug}`}
        // as={`/product/${id}/${slug}`}
        className=" flex  h-[400px] w-[280px] flex-col items-center justify-between rounded-2xl p-6 transition duration-300 ease-in-out hover:shadow-custom"
      >
        <section className="w-[280px] h-fit object-cover">
          <Image
            // priority={true}
            draggable={false}
            src={image}
            alt={name}
            width={160}
            height={213}
            className="h-[213px] w-auto m-auto"
          />
        </section>

        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-lg uppercase">{brand}</h1>
          <p className="line-clamp-1 font-semibold">{name}</p>
          <p className="text-sm">
            {concentration} ({size}ml)
          </p>
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