import React, { useState } from "react";
import CardProductOrder from "../CardProductOrder";

export default function CardTrackOrder() {
  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (status:string) => {
    setActiveButton(status);
  };

  const filteredOrders = OrderList.filter((order) => {
    if (activeButton === "All") {
      return true;
    } else {
      return order.orderstatus === activeButton;
    }
  });

  return (
    <main className="rounded-xl border-2 w-11/12 border-solid border-primary-blue-accent">
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
                activeButton === "Sent" && "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Sent")}
            >
              Sent
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
                activeButton === "Received" && "bg-[#E4EBF5] text-primary-blue-accent"
              }`}
              type="button"
              onClick={() => handleButtonClick("Received")}
            >
              Received
            </button>
          </div>
        </div>
        <section className="flex flex-col gap-7">
          {filteredOrders.map((List, index) => (
            <CardProductOrder
              key={index}
              date={List.date}
              orderstatus={List.orderstatus}
              resi={List.resi}
              Parfum_image={List.Image}
              Parfume_name={List.Name}
              Parfume_qty={List.Qty}
              Parfume_price={List.Price}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

const OrderList = [
  {
    date: "20 Nov 2023",
    orderstatus: "Received",
    resi: "123456789",
    Image: "/images/Prada_LunaRossaOcean.jpg",
    Name: "Ameer Al Oudh Intense Oud",
    Qty: 1,
    Price: "2.999.999",
  },
  {
    date: "25 Des 2023",
    orderstatus: "Sent",
    resi: "123456789",
    Image: "/images/Prada_LunaRossaOcean.jpg",
    Name: "Ameer Al Oudh Intense Oud",
    Qty: 2,
    Price: "2.999.999",
  },
];
