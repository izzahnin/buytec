"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import submitReview from "@/firebase/review/submitReview";
import { ReviewInputStar } from "./reviewsInputStar";
import { useRouter } from "next/navigation";

interface ReviewsInputProps {
  perfumeId: string;
  // submitEffect: () => Promise<void>
}

export default function CardReviewsInput(props: ReviewsInputProps) {
  const { perfumeId } = props;
  const router = useRouter();
  const auth = useAuth();
  const [alreadyReview, setAlreadyReview] = useState(auth.user.review);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewInputError, setReviewInputError] = useState<string | null>(null);
  const [reviewStarInputError, setReviewStarInputError] = useState<string | null>(null);
  // user can review if user already login and buy the product
  const canReview = auth.user.id == null ? false : auth.user.buy.includes(perfumeId) ? true : false;

  useEffect(() => {
    setAlreadyReview(auth.user.review);
  }, [auth.user.review])

  const handleOnClickStar = (rating: number) => {;
    setRating(rating);
    setReviewStarInputError(null);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!review.trim()) {
      setReviewInputError("Please enter this field.");
      return;
    }

    if (rating == 0) {
      setReviewStarInputError("Please rate with star");
      return;
    }

    await submitReview({
      userId: auth.user.id!,
      userName: auth.user.name!,
      perfumeId: perfumeId,
      text: review,
      rating: rating,
      date: new Date(),
    });
    await auth.addReview(perfumeId);
    router.refresh();
    // await submitEffect()
  };
  return (
    <main className={!canReview ? 'hidden' : alreadyReview.includes(perfumeId) ? 'hidden' : ''}>
      <section className="flex flex-col flex-wrap gap-5 rounded-xl p-5 shadow-lg lg:w-[712px]">
        <section className="flex flex-row gap-5">
          <div>
            <Image
              className="flex w-12 items-center justify-center rounded-full sm:w-14"
              src="/images/profile.png"
              alt="PreviewUser"
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col pl-2 sm:pl-5">
            <ReviewInputStar
              stars={rating}
              onClickStar={handleOnClickStar}
            />
            {reviewStarInputError && (
              <p className=" text-sm text-red-500 md:text-base">
                {reviewStarInputError}
              </p>
            )}
            <div className="flex-grow">
              <input
                style={{
                  width: "100%",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
                className="mt-2 text-text-l outline-none"
                placeholder="Write your review..."
                type="text"
                name="review"
                value={review}
                onChange={(e) => {
                  setReview(e.target.value);
                  setReviewInputError(null);
                }}
              />
            </div>
            {reviewInputError && (
              <p className="text-sm text-red-500 md:text-base">
                {reviewInputError}
              </p>
            )}
          </div>
        </section>

        <div className="w-full self-end sm:ml-auto sm:w-auto sm:pl-2 sm:pt-2 md:w-auto">
          <button
            className="h-8 w-full rounded-lg bg-primary-blue-accent text-text-l font-black text-white sm:h-[35px] sm:w-[160px]"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </section>
    </main>
  );
}
