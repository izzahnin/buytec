import React from "react";
import Image from "next/image";

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
        <section
          key={index}
          className="relative h-24 w-14 md:h-52 md:w-32 lg:h-52 lg:w-32"
        >
          <Image key={index} src={image} alt={`${alt} ${index + 1}`} fill />
        </section>
      ))}
    </>
  ) : (
    <>
      <section className="flex gap-20 lg:gap-32">
        {images.slice(0, 2).map((image, index) => (
          <section
            key={index}
            className="relative h-24 w-14 md:h-64 md:w-44 lg:h-64 lg:w-44"
          >
            <Image key={index} src={image} alt={`${alt} ${index + 1}`} fill />
          </section>
        ))}
      </section>

      <section className="flex gap-20 lg:gap-32">
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
            />
          </section>
        ))}
      </section>
    </>
  );
};

export default function CardCatalogue(props: CardProps) {
  const { title, small } = props;
  const cardStyle = getCardStyle(small);
  const images = renderImages(props);

  return small ? (
    <section
      // className={`h-[155px] w-[155px] md:h-[312px] md:w-[312px] lg:h-[312px] lg:w-[312px] ${cardStyle}`}
      className={`h-40 w-40 md:h-80 md:w-80 lg:h-80 lg:w-80 ${cardStyle}`}
    >
      <div className="flex gap-5 ">{images}</div>
      <h5 className="text-text-m md:text-text-l lg:text-text-l">{title}</h5>
    </section>
  ) : (
    <section
      className={`h-80 w-80 md:h-[670px] md:w-[600px] lg:h-[670px] lg:w-[600px] ${cardStyle}`}
    >
      <section className="flex flex-col gap-5">{images}</section>
      <h2 className="text-heading-s md:text-heading-m lg:text-heading-m">
        {title}
      </h2>
    </section>
  );
}
