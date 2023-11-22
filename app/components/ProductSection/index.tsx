import React, { useState, useEffect } from "react";
import CardProduct from "@components/ProductCard";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";

export default async function ProductSection() {
  const perfumes = await getAllPerfume();
  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    cardList = perfumes
      .slice(0, 4)
      .map((perfume) => (
        <CardProduct
          id={perfume.id}
          brand={perfume.brand}
          name={perfume.name}
          price={perfume.price}
          rating={perfume.rating}
          concentration={perfume.concentration}
          image={perfume.image}
          key={perfume.id}
        />
      ));
  }

  return (
    <main className="flex w-full flex-col gap-6">
      <h1 className="my-3 mt-5 text-center text-heading-m font-bold">
        Best Seller
      </h1>
      <section className="row-gap-32 mx-auto grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardList}
      </section>
    </main>
  );
}
