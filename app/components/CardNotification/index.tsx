import React from "react";
import Link from "next/link";

interface CardNotificationProps {
  title: string;
  description: string;
}

export default function CardNotification(props: CardNotificationProps) {
  const { title, description } = props;
  return (
    <main className="z-40 hidden w-full  gap-2  bg-white p-2 shadow-md lg:flex">
      <section>
        <h1 className=" font-semibold">{title}</h1>
        <p className="line-clamp-2">{description}</p>
      </section>
    </main>
  );
}
