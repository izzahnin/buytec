import React from 'react'
import CardProduct from "@components/ProductCard";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import getPerfumesByCategory from "@/firebase/perfume/getPerfumesByCategory";
import { getPerfumeFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";

interface ProductFilterProps {
  selectedCategory: string;
  selectedSubCategory: string;
}

export default async function ProductFilter(props: ProductFilterProps) {
  const { selectedCategory, selectedSubCategory } = props;
  // const perfumes = await getAllPerfume();
  const perfumes = await getPerfumeFromLocal();
  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    const filteredPerfumes = perfumes.filter(perfume => (perfume.gender === "male"));
    cardList = filteredPerfumes.map((perfume) => (
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
    <>
      {/* tes produk */}
      <p>{selectedCategory}</p>
      <p>{selectedSubCategory}</p>
      {cardList}
    </>
  )
}
