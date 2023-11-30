
import React from 'react'
import Image from 'next/image';
import getAllPerfume from '@/firebase/perfume/getAllPerfume';
import Link from 'next/link';

interface CardSearchProductProps {
  id: string;
  name: string;
  image: string;
  brand: string;
  concentration: string;
  size: number;
}

export default function CardSearchProduct(props: CardSearchProductProps) {
  const{ id, name, image, brand, concentration, size } = props;

  return (
    <Link href={"/product/"} className="hidden lg:flex z-40  bg-white border-[1px] rounded-xl shadow-md p-2 gap-2 w-full">
      <Image src={image} alt={name} width={40} height={40} className='object-cover w-[50px]'/> 
      <section>
        <h1 className='uppercase' >{brand}</h1>
        <p className='font-semibold'>{name}</p>
        <p className='text-sm'>{concentration} ({size}ml)</p>
      </section>
    </Link>
  )
}
