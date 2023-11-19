import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-screen overflow-hidden bg-gradient-to-r from-dark-blue to-secondary-blue-accent">
      <div className="absolute -top-[80%] right-[30%] hidden aspect-square w-full max-w-2xl rounded-full bg-secondary-blue-accent blur-2xl filter xl:block"></div>
      <div className="absolute -bottom-[80%] right-[5%] hidden aspect-square w-full max-w-2xl rounded-full bg-secondary-blue-accent blur-2xl filter xl:block"></div>
      <div className="flex items-center justify-center space-x-10 p-10 ">
        <div className="relative aspect-[3/5] w-72">
          <Image
            src="/perfume3.png"
            alt="Hero Perfume"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="z-10 w-full max-w-4xl text-center font-playfair text-heading-s text-white md:text-heading-xl">
          Smell Fresh with Dior Newest Parfume
        </h1>
      </div>
    </section>
  );
}
