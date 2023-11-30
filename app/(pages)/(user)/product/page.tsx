import React, { useState } from "react";

import CardProduct from "@components/ProductCard";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import getPerfumesByCategory from "@/firebase/perfume/getPerfumesByCategory";
import { getPerfumeFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";

export const categoryBrand = [
  { id: 1, title: "Dior"},
  { id: 2, title: "Versace"},
  { id: 3, title: "Diptyque"},
  { id: 4, title: "Chanel"},
]


export default async function Product() {
  // const perfumes = await getAllPerfume();
  const perfumes = await getPerfumeFromLocal();
  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    cardList = perfumes.map((perfume) => (
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
    <main className="my-10 flex w-full flex-col gap-6">
      <section className="flex  justify-center gap-3 uppercase text-[#585858] h-12">
        {categoryBrand.map((category) => (
          <button className=" hover:border-b-2 hover:border-dark-blue px-4 hover:text-dark-blue" key={category.id}>
            {category.title}
          </button>
        ))}

        {/* <h1 className="border-b-2 border-solid border-dark-blue px-4 text-dark-blue">
          Dior
        </h1> */}

      </section>
      <section className="row-gap-32 mx-auto grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardList}
      </section>
    </main>
  );
}
