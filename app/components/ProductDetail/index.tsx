"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Star } from "../StarRating";
import { parserCurrency } from "@/utils/parsercurrency";

import { IoMdHeartEmpty, IoMdHeart, IoMdCheckmark } from "react-icons/io";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { HiOutlineTruck } from "react-icons/hi2";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import ModalToast from "../ModalToast";

interface DetailProductProps {
  id: string;
  name: string;
  image: string;
  price: number;
  size: number;
  brand: string;
  gender: string;
  rating: number;
  concentration: string;
  description: string;
  stock: number;
}

export default function DetailProduct(props: DetailProductProps) {
  const {
    id,
    name,
    image,
    price,
    size,
    brand,
    gender,
    rating,
    concentration,
    description,
    stock,
  } = props;
  const auth = useAuth();

  const [isFavorite, setIsFavorite] = useState(
    auth.user.id == null
      ? false
      : auth.user.wishlist.includes(id)
        ? true
        : false,
  );
  const handleFavoriteClick = async () => {
    if (auth.user.id != null) {
      if (isFavorite) {
        await auth.deleteFromWishlist(id);
        toast.custom((t) => (
          <ModalToast
            closeModal={() => toast.dismiss(t)}
            value="Perfume removed from wishlist"
          />
        ));
      }
      // if item is not in wishlist
      else {
        await auth.addToWishlist(id);
        toast.custom((t) => (
          <ModalToast
            closeModal={() => toast.dismiss(t)}
            value="Perfume added to wishlist"
          />
        ));
      }
      setIsFavorite(!isFavorite);
    } else {
      // alert("Create account to add perfume to wishlist");
      toast.custom((t) => (
        <ModalToast
          closeModal={() => toast.dismiss(t)}
          value="Create account to add perfume to wishlist"
        />
      ));
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCartClick = async () => {
    if (auth.user.id != null) {
      await auth.addToCart(id, quantity);
      toast.custom((t) => (
        <ModalToast
          closeModal={() => toast.dismiss(t)}
          value="Perfume added to cart"
        />
      ));
    } else {
      // TODO: CHANGE POP UP
      // alert('Create account to add perfume to wishlist')
      toast.custom((t) => (
        <ModalToast
          closeModal={() => toast.dismiss(t)}
          value="Create account to add perfume to cart"
        />
      ));
    }
  };

  return (
    <main className="mx-4 flex h-fit flex-col justify-center md:flex-row md:gap-5 lg:gap-16 ">
      <section className="flex justify-center align-middle md:w-1/2 md:justify-end lg:w-5/12">
        <Image
          priority={true}
          draggable={false}
          src={image}
          alt={name}
          width={360}
          height={500}
          className="h-[500px] w-[360px] object-cover"
        />
      </section>
      <section className="my-4 flex flex-col gap-4 md:my-9 md:w-1/2 lg:w-7/12">
        <main className="flex flex-col md:w-5/6 lg:w-2/3">
          <h1 className="text-heading-s uppercase">{brand}</h1>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p>
            {concentration} {size}ml For {gender}
          </p>
          <Star stars={rating} />
          <span className="my-1 text-heading-s font-semibold text-dark-blue">
            {parserCurrency(price)}
          </span>
          <p className="my-2 text-justify">{description}</p>
        </main>
        <section className="flex flex-col gap-4 md:w-2/3">
          <div className="flex select-none flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 ">
            <section className="flex h-9 w-36 items-center justify-between rounded-lg border-2 border-dark-blue align-middle text-xl">
              <HiOutlineMinus
                className="mx-2 h-full w-4 items-center "
                onClick={handleMinusClick}
              />
              <span className="w-6 items-center text-center">{quantity}</span>
              <HiOutlinePlus
                className="mx-2 h-full w-4 items-center "
                onClick={handlePlusClick}
              />
            </section>
            <section>
              <span
                className="flex select-none items-center gap-2 align-middle"
                onClick={handleFavoriteClick}
              >
                Add To Wishlist
                {isFavorite ? (
                  <IoMdHeart className="text-heading-m text-red-600" />
                ) : (
                  <IoMdHeartEmpty className="text-heading-m text-red-600" />
                )}
              </span>
            </section>
          </div>
          <button
            className="h-10 w-52 rounded-lg bg-primary-blue text-white hover:scale-105 "
            onClick={handleAddToCartClick}
          >
            Add to cart
          </button>
          <section className="flex gap-10">
            <div
              className={`flex items-center gap-2 ${stock > 0 ? "" : "hidden"}`}
            >
              <IoMdCheckmark className="text-xl" />
              <p>In Stock!</p>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineTruck className="text-xl" />
              <p>Free shipping</p>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
