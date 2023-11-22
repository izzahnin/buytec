import React from "react";

import CardProduct from "@components/ProductCard";
import KeyNotes from "@components/KeyNotes/index";
import CardReviews from "@/components/CardReviews";
import CardReviewsInput from "@/components/CardReviewsInput";

import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import DetailProduct from "@/components/ProductDetail";

export default async function ProductDetail() {
  const perfumes = await getAllPerfume();
  let cardList: JSX.Element[] = [];
  if (perfumes != undefined) {
    cardList = perfumes
      .slice(0, 4)
      .map((perfume) => (
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
    <main className="flex w-screen flex-col gap-8">
      {/* product detail */}
      <section className=" h-full w-full">
        <DetailProduct
          id={"1"}
          brand={"Lattafa"}
          name={"Ameer Al Oudh Intense Oud"}
          price={259000}
          rating={4}
          concentration={"Extrait de Parfum"}
          image={"https://firebasestorage.googleapis.com/v0/b/elixir-8ce95.appspot.com/o/Lattafa_Ameer%20Al%20Oudh%20Intense%20Oud.jpg?alt=media&token=7da0a2f0-ea2d-4b26-ae0c-4b9552d1010a"}
          description={
            "Ameer Al Oudh Intense Oud is a rich and luxurious fragrance that opens with woody notes and oud. The heart of the fragrance is a creamy and sweet blend of vanilla and sugar, while the base is dark and smoky with agarwood (oud), sandalwood, and herbal notes. This fragrance is perfect for those who love bold and exotic scents."
          }
          gender={"Unisex"}
          size={100}
        />
      </section>
      {/* keynotes */}
      <KeyNotes />

      {/* reviews */}
      <section className="flex h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-heading-m font-medium">Reviews</h1>
        <section className="flex flex-col gap-20 ">
          <CardReviewsInput />
          <div className="flex flex-col gap-6 ">
            {ReviewList.map((List, index) => (
              <CardReviews
                key={index}
                TextReview={List.Review}
                User={List.User}
                Date={List.Date}
              />
            ))}
          </div>
        </section>
          <h1 className="my-3 w-fit text-center text-heading-s font-medium text-gray-500 hover:cursor-pointer">
            Show more
          </h1>
      </section>
      
      {/* other product */}
      <section className="flex flex-col gap-6">
        <h1 className="my-3 mt-5 text-center text-heading-m font-bold">
          Best Seller
        </h1>
        <section className="row-gap-32 mb-4 mx-auto grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cardList}
        </section>
      </section>
    </main>
  );
}

const ReviewList = [
  {
    Review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatum.",
    User: "Nurul Izzah",
    Date: "20 November 2023",
  },
  {
    Review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatum",
    User: "User 2",
    Date: "12 Desember 2023",
  },
];
