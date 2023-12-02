import React from "react";
import Image from "next/image";

export default function CardReviewsInput() {
  return (
    <main>
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

          <div className="flex-grow">
            <input
              style={{ width: '100%', wordWrap: 'break-word', overflowWrap: 'break-word' }}
              className="mt-2 text-text-l outline-none"
              type="text"
              name="review"
              id=""
              placeholder="Write your review..."
            />
          </div>
        </section>

        <div className="w-full self-end sm:ml-auto sm:w-auto sm:pl-2 sm:pt-2 md:w-auto">
          <button
            className="h-8 w-full rounded-lg bg-primary-blue-accent text-text-l font-black text-white sm:h-[35px] sm:w-[160px]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </section>
    </main>
  );
}
