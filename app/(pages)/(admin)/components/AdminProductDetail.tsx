import React from "react";
import Image from "next/image";
import { parserCurrency } from "@/utils/parsercurrency";
import { Star } from "@/components/StarRating";
import KeyNotes from "@/components/KeyNotes";
// import {
//   getBestSellerPerfumesFromLocal,
//   getPerfumeByIdFromLocal,
//   getPerfumeFromLocal,
// } from "@/firebase/perfume/getPerfumeFromLocal";
import AdminPerfumeDetail from "./AdminPerfumeDetail";
import CardReviews from "@/components/CardReviews";

interface AdminProductDetailProps {
  id: string;
}

export default function AdminProductDetail(props: AdminProductDetailProps) {
  const { id } = props;

  // const perfume = await getPerfumeByIdFromLocal(id)!;

  return (
    <main className="mx-4 flex h-fit  justify-center">
      <AdminPerfumeDetail
        // id={perfume.id}
        // brand={perfume.brand}
        // name={perfume.name}
        // price={perfume.price}
        // rating={perfume.rating}
        // concentration={perfume.concentration}
        // image={perfume.image}
        // description={perfume.description}
        // gender={perfume.gender}
        // size={perfume.size}
      />
      <section>
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, temporibus!
        {/* <KeyNotes
          topNotes={perfume.topNotes}
          middleNotes={perfume.middleNotes}
          baseNotes={perfume.baseNotes}
        /> */}
      </section>
      <section>
        {/* <div className="flex flex-col gap-6 ">
          {ReviewList.map((List, index) => (
            <CardReviews
              key={index}
              TextReview={List.Review}
              User={List.User}
              Date={List.Date}
            />
          ))}
        </div> */}
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