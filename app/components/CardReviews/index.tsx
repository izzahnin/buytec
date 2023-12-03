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
      <section className="flex w-[430px] flex-row gap-5 rounded-xl p-5 shadow-lg sm:w-[512px] md:w-[592px] lg:w-[712px]">
        <section className="absolute items-center">
          <div className="w-9 sm:w-14">
            <Image
              className="flex items-center justify-center rounded-full"
              src="/images/ProfileReview.png"
              alt="PreviewUser"
              width={56}
              height={56}
              layout="fixed"
            />
          </div>
          <div className="absolute left-3 top-1 flex items-center justify-center rounded-full text-lg font-semibold text-black sm:left-[19.5px] sm:top-[13px] sm:text-2xl">
            {firstLetter}
          </div>
        </section>

        <section className="flex flex-col pl-14 sm:pl-24">
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
