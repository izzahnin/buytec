import React from "react";

import CardProduct from "@components/ProductCard";
import KeyNotes from "@components/KeyNotes/index";
import CardReviews from "@/components/CardReviews";
import CardReviewsInput from "@/components/CardReviewsInput";

import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import DetailProduct from "@/components/ProductDetail";
import getPerfumeById from "@/firebase/perfume/getPerfumeById";
import getReviews, {
  GetReviewsProps,
  ReviewEnum,
} from "@/firebase/review/getReviews";
import getBestSellerPerfumes from "@/firebase/perfume/getBestSellerPerfumes";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const perfume = await getPerfumeById(id);
  // review
  const reviews = await getReviews({
    type: ReviewEnum.perfume,
    perfumeId: id,
  } as GetReviewsProps);

  const perfumes = await getBestSellerPerfumes();
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
        size={perfume.size}
      />
    ));
  }
  return (
    <main className="flex w-screen flex-col gap-8">
      {/* product detail */}
      <section className=" h-full w-full">
        <DetailProduct
          id={perfume.id}
          brand={perfume.brand}
          name={perfume.name}
          price={perfume.price}
          rating={perfume.rating}
          concentration={perfume.concentration}
          image={perfume.image}
          description={perfume.description}
          gender={perfume.gender}
          size={perfume.size}
        />
      </section>

      {/* keynotes */}
      <KeyNotes topNotes={perfume.topNotes} middleNotes={perfume.middleNotes} baseNotes={perfume.baseNotes} />

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
        <section className="row-gap-32 mx-auto mb-4 grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

const filter = [];
