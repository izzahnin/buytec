import React, { useState } from "react";

import CardProduct from "@components/ProductCard";
import getAllPerfume from "@/firebase/parfume/getAllPerfume";

export default async function Product() {
  const perfumes = await getAllPerfume();
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
        image={perfume.image}
        key={perfume.id}
      />
    ));
  }

  return (
    <main className="my-10 flex w-full flex-col gap-6">
      <section className="flex  justify-center gap-3 uppercase text-[#585858] ">
        <h1 className="border-b-2 border-solid border-dark-blue px-4 text-dark-blue">
          Dior
        </h1>
        <h1 className="px-4 duration-100 ease-in-out hover:border-b-2 hover:border-solid hover:border-dark-blue hover:text-dark-blue">
          Versace
        </h1>
        <h1 className="px-4 duration-100 ease-in-out hover:border-b-2 hover:border-solid hover:border-dark-blue hover:text-dark-blue">
          Prada
        </h1>
        <h1 className="px-4 duration-100 ease-in-out hover:border-b-2 hover:border-solid hover:border-dark-blue hover:text-dark-blue">
          Lattafa
        </h1>
        <h1 className="px-4 duration-100 ease-in-out hover:border-b-2 hover:border-solid hover:border-dark-blue hover:text-dark-blue">
          Hmns
        </h1>
      </section>
      <section className="row-gap-32 mx-auto grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardList}
      </section>
    </main>
  );
}
