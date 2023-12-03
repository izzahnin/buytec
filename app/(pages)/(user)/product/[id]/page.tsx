import React from "react";

import CardProduct from "@components/ProductCard";
import KeyNotes from "@components/KeyNotes/index";
import CardReviews from "@/components/CardReviews";
import CardReviewsInput from "@/components/CardReviewsInput";

import DetailProduct from "@/components/ProductDetail";
import getPerfumeById from "@/firebase/perfume/getPerfumeById";
import getReviews, {
  GetReviewsProps,
  ReviewEnum,
} from "@/firebase/review/getReviews";
import getBestSellerPerfumes from "@/firebase/perfume/getBestSellerPerfumes";
import {
  getBestSellerPerfumesFromLocal,
  getPerfumeByIdFromLocal,
  getPerfumeFromLocal,
} from "@/firebase/perfume/getPerfumeFromLocal";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import { ReviewProps } from "@/firebase/review/review";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // const perfume = await getPerfumeById(id);
  const perfume = await getPerfumeByIdFromLocal(id)!;
  // review
  // TODO: ADD REVIEWS
  let reviews = await getReviews({
    type: ReviewEnum.perfume,
    perfumeId: id,
  } as GetReviewsProps);

  const submitEffect = async () => {
    reviews = await getReviews({
      type: ReviewEnum.perfume,
      perfumeId: id,
    } as GetReviewsProps);
  }
  // const perfumes = await getBestSellerPerfumes();
  const perfumes = await getBestSellerPerfumesFromLocal();
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
          size={perfume.size} stock={perfume.stock}        />
      </section>

      {/* keynotes */}
      <KeyNotes
        topNotes={perfume.topNotes}
        middleNotes={perfume.middleNotes}
        baseNotes={perfume.baseNotes}
      />

      {/* reviews */}
      <section className="flex h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-heading-m font-medium">Reviews</h1>
        <section className="flex flex-col gap-20 ">
          <CardReviewsInput perfumeId={perfume.id}  />
          <div className="flex flex-col gap-6 ">
            {reviews!.map((review, index) => (
              <CardReviews
                key={index}
                id={review.id}
                userId={review.userId}
                userName={review.userName}
                perfumeId={review.perfumeId}
                text={review.text}
                rating={review.rating}
                date={review.date}
              />
            ))}
          </div>
        </section>
        {/* <h1 className="my-3 w-fit text-center text-heading-s font-medium text-gray-500 hover:cursor-pointer">
          Show more
        </h1> */}
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

// const reviews: ReviewProps[] = [
//   {
//     id: "",
//     userId: "b8nq2zRA64fism84W2GMpdiZ0LI2",
//     userName: "shobur",
//     perfumeId: "yNpphOS3xykaHeejUv5e",
//     text: "Very masspleasing scent!",
//     rating: 4,
//     date: new Date(),
//   },
// ];

const filter = [];
