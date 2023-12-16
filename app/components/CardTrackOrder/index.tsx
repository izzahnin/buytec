import React, { useEffect, useState } from "react";
import CardProductOrder from "../CardProductOrder";
import { TransactionProps } from "@/firebase/transaction/transaction";
import getUserTransactions from "@/firebase/transaction/getUserTransactions";

interface CardTrackOrderProps {
  userId: string,
}

export default function CardTrackOrder(props: CardTrackOrderProps) {
  const { userId } = props;
  const [activeButton, setActiveButton] = useState("All");
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(null);
  const handleButtonClick = (status:string) => {
    setActiveButton(status);
  };
  
  // const getTransactions = await getUserTransactions(userId);
  // setTransactions(() => getTransactions!);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTransactions = await getUserTransactions(userId);
        setTransactions(userTransactions!);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchData();
  }, [userId]);
  

  // const filteredOrders = OrderList.filter((order) => {
  //   if (activeButton === "All") {
  //     return true;
  //   } else {
  //     return order.orderstatus === activeButton;
  //   }
  // });

  return (
    <main className="rounded-xl border-2 w-full border-solid border-primary-blue-accent">
      <section className="flex flex-col gap-6 sm:gap-10 md:gap-20 px-12 py-8">
        <div className="flex flex-row items-center gap-9 w-11/12">
          <span className="text-text-xl font-extrabold text-primary-blue-accent">
            Status
          </span>
          <div className="flex flex-row gap-2 sm:gap-5 w-10/12 sm:text-text-l text-text-s">
            <button
              className={`h-7 w-20 sm:h-12 sm:w-32 items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent ${
                activeButton === "All" && "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("All")}
            >
              All
            </button>
            <button
              className={`h-7 w-20 sm:h-12 sm:w-32 items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent ${
                activeButton === "Packed" && "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Packed")}
            >
              Packed
            </button>
            <button
              className={`h-7 w-20 sm:h-12 sm:w-32 items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent ${
                activeButton === "Sent" && "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Sent")}
            >
              Sent
            </button>
            <button
              className={`h-7 w-20 sm:h-12 sm:w-32 items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent ${
                activeButton === "Received" && "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Received")}
            >
              Received
            </button>
            <button
              className={`h-7 w-20 sm:h-12 sm:w-32 items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent ${
                activeButton === "Wait for verification" && "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Wait for verification")}
            >
              Wait for verification
            </button>
          </div>
        </div>
        <section className="flex flex-col gap-7">
          {transactions && transactions.map((transaction, index) => (
            transaction.perfumeId.map((perfume, index) => (
              <CardProductOrder
                key={index}
                date={new Date(transaction.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                orderstatus={transaction.packageStatus}
                resi={transaction.id}
                Parfum_image={perfume.image}
                Parfume_name={perfume.name}
                Parfume_qty={transaction.amount[index]}
                Parfume_price={transaction.totalAmount[index].toString()}
                // verification="Wait for verification"
              />
            ))
          ))}
        </section>
      </section>
    </main>
  );
}

// const OrderList = [
//   {
//     date: "20 Nov 2023",
//     orderstatus: "Received",
//     resi: "123456789",
//     Image: "/images/Prada_LunaRossaOcean.jpg",
//     Name: "Ameer Al Oudh Intense Oud",
//     Qty: 1,
//     Price: "2.999.999",
//   },
//   {
//     date: "25 Des 2023",
//     orderstatus: "Sent",
//     resi: "123456789",
//     Image: "/images/Prada_LunaRossaOcean.jpg",
//     Name: "Ameer Al Oudh Intense Oud",
//     Qty: 2,
//     Price: "2.999.999",
//   },
// ];
