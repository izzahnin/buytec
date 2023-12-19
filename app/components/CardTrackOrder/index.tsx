import React, { useEffect, useState } from "react";
import CardProductOrder from "../CardProductOrder";
import { TransactionProps } from "@/firebase/transaction/transaction";
import getUserTransactions from "@/firebase/transaction/getUserTransactions";

interface CardTrackOrderProps {
  userId: string;
}

export default function CardTrackOrder(props: CardTrackOrderProps) {
  const { userId } = props;
  const [activeButton, setActiveButton] = useState("All");
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(
    null,
  );
  const handleButtonClick = (status: string) => {
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
        // console.error("Error fetching transactions:", error);
      }
    };

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
    <main className="w-full rounded-xl border-2 border-solid border-primary-blue-accent">
      <section className="flex flex-col gap-8 p-3 md:p-5 lg:px-12 lg:py-8">
        <div className="flex w-full flex-row items-center gap-3">
          <span className="text-lg font-extrabold text-primary-blue-accent">
            Status
          </span>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 text-sm md:grid-cols-5 md:grid-rows-none ">
            <button
              className={`line-clamp-1 h-10 w-full items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent mx-auto py-2 ${
                activeButton === "All" &&
                "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("All")}
            >
              All
            </button>
            <button
              className={`line-clamp-1 overflow-ellipsis overflow-hidden h-fit w-full items-center justify-center whitespace-nowrap rounded-lg border-2 border-solid border-primary-blue-accent mx-auto p-2 ${
                activeButton === "Wait for verification" &&
                "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Wait for verification")}
            >
              Wait for verification
            </button>
            <button
              className={`line-clamp-1 h-10 w-full items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent mx-auto py-2 ${
                activeButton === "Packed" &&
                "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Packed")}
            >
              Packed
            </button>
            <button
              className={`line-clamp-1 h-10 w-full items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent mx-auto py-2 ${
                activeButton === "Sent" &&
                "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Sent")}
            >
              Sent
            </button>
            <button
              className={`line-clamp-1 h-10 w-full items-center justify-center rounded-lg border-2 border-solid border-primary-blue-accent mx-auto py-2 ${
                activeButton === "Received" &&
                "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Received")}
            >
              Received
            </button>
          </div>
        </div>
        <section className="flex flex-col gap-7">
          {transactions &&
            transactions.map((transaction, index) =>
              transaction.perfumeId.map((perfume, index) => (
                <CardProductOrder
                  key={index}
                  date={new Date(transaction.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  orderstatus={transaction.packageStatus}
                  resi={transaction.id}
                  Parfum_image={perfume.image as string}
                  Parfume_name={perfume.name}
                  Parfume_qty={transaction.amount[index]}
                  Parfume_price={transaction.totalAmount[index].toString()}
                  // verification="Wait for verification"
                />
              )),
            )}
        </section>
      </section>
    </main>
  );
}
