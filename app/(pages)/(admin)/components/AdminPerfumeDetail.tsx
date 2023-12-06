import React from "react";
import Image from "next/image";
import { parserCurrency } from "@/utils/parsercurrency";
import { Star } from "@/components/StarRating";
// import { getBestSellerPerfumesFromLocal, getPerfumeByIdFromLocal, getPerfumeFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";

// interface AdminPerfumeDetailProps {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   size: number;
//   brand: string;
//   gender: string;
//   rating: number;
//   concentration: string;
//   description: string;
  
// }

export default function AdminPerfumeDetail(
  // props: AdminPerfumeDetailProps
  ) {
  // const {
  //   id,
  //   name,
  //   image,
  //   price,
  //   size,
  //   brand,
  //   gender,
  //   rating,
  //   concentration,
  //   description,
  // } = props;

  return (
    <main className="mx-4 w-full flex h-fit  justify-center gap-6">
      <section className="flex w-fit justify-center  items-center object-cover">
        <Image
          draggable={false}
          src={
            "https://firebasestorage.googleapis.com/v0/b/elixir-8ce95.appspot.com/o/Prada_Infusiond_Homme.jpg?alt=media&token=51a6e28a-f52a-4d1a-a07b-5433eb38a524"
          }
          alt={"alt"}
          width={200}
          height={200}
          className="h-[200px] w-auto"
        />
      </section>
      <section className="my-4 w-2/3 flex flex-col gap-4">
        <main className="flex flex-col">
          <h1 className="text-heading-s uppercase">Brand</h1>
          <h1 className="text-2xl font-semibold">Name</h1>
          <p>edp 100ml For women</p>
          <Star stars={1} />
          <span className="my-1 text-heading-s font-semibold text-dark-blue">
            {parserCurrency(123)}
          </span>
          <p className="my-2 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo magnam
            sed nulla deleniti. Minus libero fuga iure ipsa quibusdam nam?
          </p>
        </main>
      </section>
    </main>
  );
}
