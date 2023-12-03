import React, { useState } from 'react'
// import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import { getPerfumeFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";
import ProductCard from './AdminProductCard';

export default function AdminListProduct() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const handleProductCardClick = (productId: string) => {
    setSelectedProductId(productId);
  };
  const perfumes = getPerfumeFromLocal();
  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    cardList = perfumes.map((perfume) => (
      <ProductCard
        id={perfume.id}
        brand={perfume.brand}
        name={perfume.name}
        image={perfume.image}
        key={perfume.id}
        // onClick={() => handleProductCardClick(perfume.id)}
      />
    ));
  }
  return (
    <main className=" flex w-3/5 flex-col rounded-xl bg-white p-4 shadow-xl">
    <h1 className="text-lg font-semibold text-slate-500">Perfume</h1>
    {/* <AdminListProduct /> */}
    <section className="grid grid-cols-2 gap-1">
      {cardList}
    </section>
  </main>
  )
}
