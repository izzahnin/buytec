import React from "react";
import Image from "next/image";

interface AdminProductCardProps {
  id: string;
  name: string;
  image: string;
  brand: string;
  // onClick: () => void;
}

export default function AdminProductCard(props: AdminProductCardProps) {
  const { id, name, image, brand} = props;
  return (
    <main className="flex h-fit w-[240px] cursor-pointer items-center justify-start rounded-lg bg-white p-2 hover:shadow-md gap-1">
      <section className="h-fit w-[64px]  object-cover ">
        <Image
          draggable={false}
          src={image}
          alt={name}
          width={85}
          height={64}
          className="m-auto h-auto w-[64px]"
        />
      </section>
      <section className="flex w-full select-none flex-col justify-center ">
        <h1 className="uppercase">{brand}</h1>
        <h1 className="line-clamp-1 font-semibold ">{name}</h1>
      </section>
    </main>
  );
}
