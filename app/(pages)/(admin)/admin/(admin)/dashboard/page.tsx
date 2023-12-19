'use client'
import CardDashboard from "@/(pages)/(admin)/components/CardDashboard";

import getAllTransaction from "@/firebase/transaction/getAllTransaction";

import getAllPerfume from "@/firebase/perfume/getAllPerfume";
import getBestSellerPerfumes from "@/firebase/perfume/getBestSellerPerfumes";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [totalPurchase, setTotalPurchase] = useState(0); // Initial value
  const [totalProduct, setTotalProduct] = useState(0); // Initial value
  const [bestSellerCount, setBestSellerCount] = useState(0); // Initial value

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await getAllTransaction();
        if (transactions) {
          setTotalPurchase(transactions.length);
        }
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    const fetchPerfumes = async () => {
      try {
        const perfumes = await getAllPerfume();
        if (perfumes) {
          setTotalProduct(perfumes.length);
        }
      } catch (error) {
        console.error("Error fetching perfumes", error);
      }
    };
    const fetchBestSellerPerfumes = async () => {
      try {
        const bestSellerPerfumes = await getBestSellerPerfumes();
        if (bestSellerPerfumes) {
          setBestSellerCount(bestSellerPerfumes.length);
        }
      } catch (error) {
        console.error("Error fetching best seller perfumes", error);
      }
    };

    fetchTransactions();
    fetchPerfumes();
    fetchBestSellerPerfumes();
  }, []); // Run once when the component mounts

  const cardlist = [
    { id: 1, title: "Total Product", total: totalProduct },
    { id: 2, title: "Total Purchase", total: totalPurchase },
    { id: 3, title: "Total Product Best Seller", total: bestSellerCount },
  ];
  
  return (
    <main className="h-creen m-3 my-5 flex flex-col gap-4 overflow-hidden">
      <h1 className="text-heading-s font-bold">Dashboard</h1>
      <section className="grid h-1/2 w-full grid-cols-2 gap-3 bg-white p-3">
        {cardlist.map((card) => {
          return (
            <CardDashboard
              key={card.id}
              title={card.title}
              total={card.total}
            />
          );
        })}
      </section>
    </main>
  );
}
