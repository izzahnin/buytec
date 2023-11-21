import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

interface CardReviewsInterface {
  TextReview: string;
  User: string;
  Date: string;
}

export default function CardReviews(props: CardReviewsInterface) {
  const { TextReview, User, Date } = props;
  const firstLetter = User.charAt(0);

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
          <div className="flex flex-row ">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
          </div>

          <div className="line-clamp-1 pt-4 text-text-m lg:line-clamp-3 lg:w-fit">
            <span>{TextReview}</span>
          </div>

          <section className="flex flex-row pt-4">
            <div className="w-40">
              <span className="text-text-m">{User}</span>
            </div>

            <div>
              <span className="text-text-m">{Date}</span>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
