import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <main className="flex h-fit w-screen flex-col items-center justify-center">
      <Image
        draggable={false}
        className="relative w-full"
        src="/images/home__about-background.png"
        alt="aboutBackground"
        width={500}
        height={500}
      />

      <section className="absolute flex w-1/4 flex-col items-center justify-center gap-2 text-center sm:text-heading-s text-white md:gap-4 md:text-heading-m lg:gap-6 lg:text-heading-l xl:gap-12">
        <h1 className="font-semibold">About Us</h1>
        <Link
          href={"/about"}
          className=" px-12 py-1 rounded-md border-2 border-white lg:text-heading-m font-medium transition-all  duration-300 ease-in-out hover:scale-105"
        >
          More
        </Link>
      </section>
    </main>
  );
}
