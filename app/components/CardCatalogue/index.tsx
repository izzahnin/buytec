import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  images: string[];
  alt: string;
  small: boolean;
}

const getCardStyle = (small: boolean) =>
  small
    ? "flex flex-col justify-center items-center gap-4 md:gap-8 lg:gap-8 rounded-2xl bg-grey"
    : "flex flex-col justify-center items-center gap-6 rounded-2xl bg-grey";

const renderImages = (props: CardProps) => {
  const { small, images, alt } = props;

  return small ? (
    <>
      {images.map((image, index) => (
        <Link
          href="/product"
          key={index}
          className="relative h-24 w-14 md:h-52 md:w-32 lg:h-52 lg:w-32"
        >
          <Image
            draggable={false}
            key={index}
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw"
            className="inline-block object-scale-down mix-blend-multiply"
          />
        </Link>
      ))}
    </>
  ) : (
    <Link href="/product">
      <section className="flex gap-20 lg:justify-between">
        {images.slice(0, 2).map((image, index) => (
          <section
            key={index}
            className="relative h-24 w-14 md:h-64 md:w-44 lg:h-64 lg:w-44 object-cover"
          >
            <Image
              key={index}
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="128px"
              className="object-scale-down mix-blend-multiply"
            />
          </section>
        ))}
      </section>

      <section className="flex gap-20 lg:justify-between">
        {images.slice(2, 4).map((image, index) => (
          <section
            key={index + 2}
            className="relative h-24 w-14 md:h-64 md:w-44 lg:h-64 lg:w-44"
          >
            <Image
              key={index + 2}
              src={image}
              alt={`${alt} ${index + 3}`}
              fill
              sizes="128px"
              className="object-scale-down mix-blend-multiply"
            />
          </section>
        ))}
      </section>
    </Link>
  );
};

export default function CardCatalogue(props: CardProps) {
  const { title, small } = props;
  const cardStyle = getCardStyle(small);
  const images = renderImages(props);

  return small ? (
    <section
      className={`h-40 w-40 md:h-80 md:w-80 lg:h-full lg:w-full lg:py-5 ${cardStyle}`}
    >
      <div className="flex w-full justify-between gap-5 px-6">{images}</div>
      <h5 className="text-text-m font-bold md:text-text-l lg:text-text-l select-none">
        {title}
      </h5>
    </section>
  ) : (
    <section
      className={`h-80 w-80 md:h-[670px] md:w-[600px] lg:h-full lg:w-full lg:py-5 ${cardStyle}`}
    >
      <section className="flex flex-col gap-5">{images}</section>
      <h2 className="text-heading-s font-bold md:text-heading-m lg:text-heading-m select-none">
        {title}
      </h2>
    </section>
  );
}
