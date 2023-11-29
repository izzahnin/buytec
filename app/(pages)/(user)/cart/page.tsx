import Link from "next/link";
import React from "react";
import { FaOpencart } from "react-icons/fa6";

export default function page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-10">
        <FaOpencart size={64} />
        <h1 className="text-4xl font-bold">Your Cart Is Currently Empty!</h1>
        <p>
          Before proceed to checkout you must add some products to your cart.
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