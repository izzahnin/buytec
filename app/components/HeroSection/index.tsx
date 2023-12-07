import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-dark-blue to-secondary-blue-accent">
      <div className="absolute -top-[80%] right-[30%] hidden aspect-square w-full max-w-2xl rounded-full bg-secondary-blue-accent blur-2xl filter lg:block"></div>
      <div className="absolute -bottom-[80%] right-[5%] hidden aspect-square w-full max-w-2xl rounded-full bg-secondary-blue-accent  blur-3xl filter lg:block"></div>
      <div className="flex items-center justify-center gap-2 md:gap-6  p-10 ">
        <div className="relative aspect-[3/5] w-72">
          <Image
            draggable={false}
            priority={true}
            src="/perfume3.png"
            alt="Hero Perfume"
            sizes={"(max-width: 768px) 100vw, 768px"}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="z-10 w-4/6 max-w-4xl text-center font-playfair text-heading-s sm:text-heading-m text-white md:text-heading-l lg:text-heading-xl select-none">
          Smell Fresh with Dior Newest Parfume
        </h1>
      </div>
    </section>
  );
}
