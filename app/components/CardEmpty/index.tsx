import Link from "next/link";
import React from "react";

import { FaHeart, FaOpencart } from "react-icons/fa6";

interface CardProps {
  type: "wishlist" | "cart";
}

export default function CardEmpty(props: CardProps) {
  const { type } = props;

  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-10">
        {type === "wishlist" ? <FaHeart size={64} /> : <FaOpencart size={64} />}
        <h1 className="text-4xl font-bold">
          {type === "wishlist"
            ? "Your Wishlist Is Currently Empty!"
            : "Your Cart Is Currently Empty!"}
        </h1>
        <p>
          {type === "wishlist"
            ? "Your wishlist is empty, add some products to your whislist."
            : "Your cart is empty, add some products to your cart."}
        </p>
        <Link
          href={"/"}
          className="rounded-full bg-primary-blue p-1 px-4 text-white"
        >
          Return To Shop
        </Link>
      </div>
    </section>
  );
}
