import React, { useEffect } from 'react'
import CardProduct from "@components/ProductCard";
import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import getPerfumesByCategory from "@/firebase/perfume/getPerfumesByCategory";
import { getPerfumeFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";
import { PerfumeProps } from '@/firebase/perfume/perfume';

interface ProductFilterProps {
  selectedCategory: string;
  selectedSubCategory: string;
}

export default async function ProductFilter(props: ProductFilterProps) {
  const { selectedCategory, selectedSubCategory } = props;
  // const perfumes = await getAllPerfume();
  let perfumes: PerfumeProps[] | undefined = []

    if (selectedCategory != '' && selectedSubCategory != '') {
      if (selectedCategory == 'size') {
        perfumes = await getPerfumesByCategory({category: selectedCategory, subcategory: parseInt(selectedSubCategory)});
      } else {
        perfumes = await getPerfumesByCategory({category: selectedCategory, subcategory: selectedSubCategory});
      }
    } else {
      perfumes = await getAllPerfume();
    }

  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    // const filteredPerfumes = perfumes.filter(perfume => (perfume.gender === "male"));
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
    <>
      {cardList}
    </>
  )
}
