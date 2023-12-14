import React from "react";

interface CardDashboardProps {
  title: string;
  total: number;
}

export default function CardDashboard(props: CardDashboardProps) {
  const { title, total } = props;
  return (
    <main className="flex flex-col justify-center rounded-md bg-sky-100 p-3 text-center">
      <h1>{title}</h1>
      <p className="text-heading-l font-bold">{total}</p>
    </main>
  );
}
