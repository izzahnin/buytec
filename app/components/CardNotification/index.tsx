import React from "react";
import Link from "next/link";

interface CardNotificationProps {
  title: string;
  description: string;
}

export default function CardNotification(props: CardNotificationProps) {
  const { title, description } = props;
  return (
    <main className="z-40 flex w-full gap-2 bg-white p-2 shadow-md">
      <section>
        <h1 className=" font-semibold">{title}</h1>
        <div className="line-clamp-2">{description}</div>
      </section>
    </main>
  );
}
