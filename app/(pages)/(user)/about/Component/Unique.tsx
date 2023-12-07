import React from "react";

const Unique = () => {
  return (
    <div className="w-full px-16 py-12 md:px-16 md:py-20">
      <div className="md:grid-row-2 mx-auto  grid gap-8">
        <h1 className="py-2 text-center text-heading-l font-bold lg:text-heading-xl">
          What Makes Us Unique
        </h1>
        <div className="flex flex-col justify-center gap-16 text-center md:flex-row md:text-start">
          <div className="flex flex-col gap-5">
            <p className="text-2xl font-bold">Locally Inspired</p>
            <p className="text-xl font-medium">
              Our perfumes are meticulously crafted to reflect the cultural
              heritage, traditions, and landscapes of various regions. From the
              vibrant streets of Marrakech to the serene cherry blossom gardens
              of Kyoto, each fragrance tells a unique story that resonates with
              its origin
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-2xl font-bold">High-Quality Ingredients</p>
            <p className="text-xl font-medium">
              {`We believe that the key to an extraordinary scent lies in the
              quality of ingredients. That's why we collaborate with expert
              perfumers who source the finest and ethically-sourced materials
              from around the world. We never compromise on the quality of our
              products, ensuring a long-lasting and luxurious experience.`}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-2xl font-bold">Personalized Service</p>
            <p className="text-xl font-medium">
              {`              We understand that choosing the perfect scent is a deeply personal
              experience. Our team of fragrance experts is always ready to
              assist you in finding a fragrance that complements your
              personality and style. Whether you're exploring new scents or
              seeking to rediscover an old favorite, we're here to guide you
              every step of the way.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unique;
