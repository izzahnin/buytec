import React from "react";
import Image from "next/image";
import { Star } from "../StarRating";
import { ReviewProps } from "@/firebase/review/review";

// interface CardReviewsInterface {
//   TextReview: string;
//   User: string;
//   Date: string;
// }

export default function CardReviews(props: ReviewProps) {
  const { id, userId, userName, perfumeId, text, rating, date } = props;
  const firstLetter = userName.charAt(0);

  return (
    <main>
      <section className="flex w-full flex-row gap-5 rounded-xl p-5 shadow-lg ">
        <section className="flex w-fit flex-col ">
          <div className="flex items-center justify-center rounded-full w-10 h-10 text-lg font-semibold text-black bg-gray-200">
            {firstLetter}
          </div>
        </section>
        <section className="flex flex-col">
          <Star stars={rating} />

          <div className="line-clamp-1 pt-4 text-text-m lg:line-clamp-3 lg:w-fit">
            <span>{text}</span>
          </div>

          <section className="flex flex-row pt-4">
            <div className="w-40">
              <span className="text-text-m">{userName}</span>
            </div>

            <div>
              <span className="text-text-m">
                {new Date(date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
              </span>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
