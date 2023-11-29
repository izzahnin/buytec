import React, { useState, useEffect } from "react";
import CardProduct from "@components/ProductCard";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import Link from "next/link";
import getBestSellerPerfumes from "@/firebase/perfume/getBestSellerPerfumes";

export default async function ProductSection() {
  const perfumes = await getBestSellerPerfumes();
  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    cardList = perfumes
      .map((perfume) => (
        <CardProduct
          id={perfume.id}
          brand={perfume.brand}
          name={perfume.name}
          price={perfume.price}
          rating={perfume.rating}
          concentration={perfume.concentration}
          size={perfume.size}
          image={perfume.image}
          key={perfume.id}
        />
      ));
  }

  return (
    <main className="flex w-full flex-col gap-6 justify-center items-center">
      <h1 className="my-3 mt-5 text-center text-heading-m font-bold">
        Best Seller
      </h1>
      <section className="row-gap-32 mx-auto grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardList}
      </section>
      <Link href="/product">
        <button className=" text-center  bg-primary-blue text-white mx-auto px-12 py-1 rounded-md border-2 border-heading-m lg:text-heading-m font-medium transition-all  duration-300 ease-in-out hover:scale-105">
         Explore All
        </button>
      </Link>
    </main>
  );
}
