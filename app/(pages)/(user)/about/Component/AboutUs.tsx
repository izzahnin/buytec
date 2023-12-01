import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="relative">
      <img
        src="/images/About_Background.svg"
        alt="About Us"
        className="w-full overflow-hidden brightness-[.15] h-[600px] object-cover "
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <h1 className="py-4 text-4xl font-bold text-white md:text-5xl lg:text-7xl">
          About Us
        </h1>
        <p className="text-lg text-white md:text-xl lg:text-2xl">
          At Elixir, we believe that perfumes are more than just scents; they
          are expressions of one's individuality and style. Our passion for
          exquisite fragrances led us to curate a collection that captures the
          essence of diverse personalities, bringing you an unparalleled
          olfactory experience.
        </p>
      </div>
    </div>

    // <div className="relative mx-auto flex w-full flex-col items-center justify-center">

    //   <section className=" w-screen overflow-hidden">
    //     <div className="relative">
    //       <Image
    //         className="w-screen overflow-hidden brightness-[.15]"
    //         src="/images/About_Background.svg"
    //         alt="about"
    //         width={500}
    //         height={500}
    //       />
    //       <section className="absolute top-1/4 flex flex-col items-center justify-center gap-6 px-40 text-center text-white ">
    //         <h1 className="font p-2 text-5xl font-black">About Us</h1>
    //         <p className="text-base md:py-6 md:text-xl lg:text-2xl">
    //           At Elixir, we believe that perfumes are more than just scents;
    //           they are expressions of one's individuality and style. Our passion
    //           for exquisite fragrances led us to curate a collection that
    //           captures the essence of diverse personalities, bringing you an
    //           unparalleled olfactory experience.
    //         </p>
    //       </section>
    //     </div>
    //   </section>
    // </div>
  );
};

export default AboutUs;
