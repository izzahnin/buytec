import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TransactionProps } from "@/firebase/transaction/transaction";
import getPerfumeById from "@/firebase/perfume/getPerfumeById";
import { PerfumeProps } from "@/firebase/perfume/perfume";
import { parserCurrency } from "@/utils/parsercurrency";

interface AdminPurchaseDetailProps {
  data: TransactionProps;
  onClose: () => void;
}

interface PerfumeWithAdditionalInfo extends PerfumeProps {
  amount: number;
  totalAmount: number;
}

export default function AdminListPurchase(props: AdminPurchaseDetailProps) {
  const { data, onClose } = props;
  const [perfumes, setPerfumes] = useState<PerfumeWithAdditionalInfo[]>([]);
  const totalProductAmount = data.amount.reduce(
    (acc, amount) => acc + amount,
    0,
  );

  useEffect(() => {
    const fetchPerfumes = async () => {
      const perfumeDetails = await Promise.all(
        data.perfumeId.map(async (perfumeId, index) => {
          const perfume = await getPerfumeById(perfumeId.id);
          return {
            ...perfume,
            amount: data.amount[index],
            totalAmount: data.totalAmount[index],
          };
        }),
      );
      setPerfumes(perfumeDetails);
    };

    fetchPerfumes();
  }, [data.perfumeId, data.amount, data.totalAmount]);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-screen w-screen bg-white sm:h-auto sm:w-2/4 sm:rounded-lg">
          <section className="flex flex-col text-xl text-black">
            <header className="border-b-2 font-bold">
              <div className="flex items-center gap-10 px-6 py-4 sm:flex-row-reverse sm:justify-between">
                <button onClick={onClose} className="text-heading-l">
                  &times;
                </button>
                <p className="pt-2 text-primary-blue-accent">Order Details</p>
              </div>
            </header>

            <div>
              <ul>
                {perfumes.map((perfume) => (
                  <li key={perfume.id} className="flex items-center gap-2 p-4">
                    <section className="relative h-28 w-24">
                      <Image
                        src={perfume.image as string}
                        alt={perfume.name}
                        fill
                        sizes="(max-width: 100px) 100vw"
                      />
                    </section>

                    <section className="flex flex-col gap-1 text-text-l">
                      <p className="font-bold">{perfume.name}</p>
                      <p>Price: {parserCurrency(perfume.price)}</p>
                      <p>Total Product: {perfume.amount}</p>
                      <p className="font-bold">
                        Subtotal: {parserCurrency(perfume.totalAmount)}
                      </p>
                    </section>
                  </li>
                ))}

                <div className="flex justify-between p-6 text-text-xl">
                  <p>
                    Total Product:{" "}
                    <span className="font-bold">{totalProductAmount}</span>
                  </p>
                  <p>
                    Summary:{" "}
                    <span className="font-bold">
                      {parserCurrency(data.total)}
                    </span>
                  </p>
                </div>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
