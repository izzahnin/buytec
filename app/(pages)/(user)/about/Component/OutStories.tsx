import React from "react";

const OutStories = () => {
  return (
    <div className="w-full px-16 py-12 md:px-16 md:py-20">
      <div className="mx-auto grid max-w-[900px] md:grid-cols-2 gap-4">
        <img className="w-[236px] mx-auto my-4" src="/perfume1.png"></img>
        <div className="flex flex-col justify-center gap-6 text-center md:text-start">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl py-2">Our Stories</h1>
          <p className="font-semibold text-xl" >
            Elixir is a leading fragrance chain in Indonesia with around 10
            stores. Dedicated to its discerning buyers, Elixir brings you a wide
            range of Fragrance products Featuring almost more than 50 brands,
            including Chanel, Dior , Diptyque, Versace, Gucci, it offers an
            unrivaled selection of products so as to create a fragrance that is
            exactly what you want.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutStories;
