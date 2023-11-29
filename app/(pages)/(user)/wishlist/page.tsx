import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";

export default function page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-10">
        <FaHeart size={64} />
        <h1 className="text-4xl font-bold">Your Wishlist Is Currently Empty!</h1>
        <p>
          Your wishlist is empty, add some products to your whislist.
        </p>
        <Link
          href={"/"}
          className="rounded-full bg-primary-blue p-1 px-4 text-white"
        >
          Return To Shop
        </Link>
      </div>
    </div>
  );
}
