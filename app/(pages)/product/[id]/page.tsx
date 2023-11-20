import KeyNotes from "@/components/KeyNotes/index";
import CardReviews from "@/components/CardReviews";
import CardReviewsInput from "@/components/CardReviewsInput";
import React from "react";

export default function ProductDetail() {
  return (
    <>
      <div>Product detail page</div>
      <KeyNotes />

      <section className="flex h-screen flex-col items-center justify-center py-96">
        <section>
          <h1 className="text-heading-m font-medium">Reviews</h1>
        </section>
        <section className="flex flex-col gap-20 ">
          <div>
            <CardReviewsInput />
          </div>
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
        <section className="pt-14">
          <h1 className=" text-heading-s font-medium text-gray-500">
            Show more
          </h1>
        </section>
      </section>
    </>
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
