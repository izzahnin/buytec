import React, { useState, useEffect } from 'react'
import CardProduct from '../ProductCard'
import getAllPerfume  from '@/firebase/parfume/getAllPerfume';

export default async function ProductSection() {
  const perfumes = await getAllPerfume();
  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    cardList = perfumes.slice(0,4).map((perfume) => (
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
    <main className='flex flex-col gap-6 w-full'>
      <h1 className='text-heading-m text-center mt-5 my-3 font-bold'>Best Seller</h1>
      <section className='grid grid-cols-1 mx-auto  gap-6 row-gap-32 sm:grid-cols-2 lg:grid-cols-4'>
        {cardList}
      </section>
    </main>
  )
}
