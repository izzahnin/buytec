import React from "react";
import NextLink from "next/link";
import CardWishlist from "@/components/CardWishlist";

export default function wishlist() {
  return (
    <main className="w-screen">
      <section className="mx-auto mt-8 mb-32 flex w-11/12 flex-col justify-center gap-6">
        <section className="flex flex-row gap-1">
          <NextLink href="/profile" passHref>
            <span className="cursor-pointer">Profile</span>
          </NextLink>
          <span>/</span>
          <span>Wishlist</span>
        </section>

          <div className="flex flex-col gap-4">
            {Wishlist.map((List, index) => (
              <CardWishlist 
              key={index}
              title={List.title}
              price={List.price}
              image={List.image}
              />
            ))}
          </div>
      
      </section>
    </main>
  );
}

const Wishlist = [
  {
    title: "Ameer Al Oudh Intense Oud",
    price: "2.999.999",
    image: "/images/Prada_LunaRossaOcean.jpg",
  },
  {
    title: "Ameer Al Oudh Intense Oud",
    price: "2.999.999",
    image: "/images/Prada_LunaRossaOcean.jpg",
  },
  {
    title: "Ameer Al Oudh Intense Oud",
    price: "2.999.999",
    image: "/images/Prada_LunaRossaOcean.jpg",
  }
]