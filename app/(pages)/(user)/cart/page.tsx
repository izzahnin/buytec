"use client";
import React, { useEffect, useState } from "react";
import CardEmpty from "@/components/CardEmpty";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import CardCart from "@/components/CardCart";
import { getPerfumeByIdFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";
import NextLink from "next/link";

export default function Cart() {
  const auth = useAuth();
  const [cart, setCart] = useState(auth.user.cart);
  const [amount, setAmount] = useState(auth.user.cartAmount);

  useEffect(() => {
    setCart(auth.user.cart);
    setAmount(auth.user.cartAmount);
  }, [auth.user.cart, auth.user.cartAmount]);

  const total = cart.reduce((sum, id, index) => {
    const perfume = getPerfumeByIdFromLocal(id)!;
    const subtotal = perfume.price * amount[index];
    return sum + subtotal;
  }, 0);

  const formattedTotal = total.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return (
    <main className="w-screen">
      <section>
        {cart.length == 0 ? (
          <CardEmpty type="cart" />
        ) : (
          // if cart has perfume

          <section className="mx-auto mb-32 mt-8 flex w-11/12 flex-col justify-center gap-6">
            <div className="flex flex-row gap-1">
              <NextLink href="/" passHref>
                <span className="cursor-pointer">Home</span>
              </NextLink>
              <span>/</span>
              <span>Cart</span>
            </div>

            <section className="flex flex-col md:flex-row gap-10 md:justify-center md:gap-5">
              <div className="flex md:w-11/12 flex-col gap-4">
                {cart.map((id, index) => {
                  // TODO: CHANGE METHOD
                  const perfume = getPerfumeByIdFromLocal(id)!;
                  return (
                    <CardCart
                      key={perfume.id}
                      id={perfume.id}
                      title={perfume.name}
                      image={perfume.image}
                      price={perfume.price}
                      subtotal={perfume.price * amount[index]}
                      quantity={amount[index]}
                    />
                  );
                })}
              </div>

              <section className="flex md:w-5/12 md:justify-center">
                <div className="flex h-fit w-full md:w-11/12 flex-col  gap-4 rounded-sm border-solid">
                  <span className="font-bold">SUMMARY</span>
                  <section className="flex flex-row border-t-2 justify-between gap-2">
                    <span className="mt-4 text-[#8C8A8C]">ORDER TOTAL</span>
                    <span className="mt-4 font-bold">{formattedTotal}</span>
                  </section>
                  <section className="flex justify-center">
                    <button
                      className="w-full mt-1 h-10 justify-center rounded bg-primary-blue-accent font-extrabold text-white"
                      type="button"
                    >
                      BUY
                    </button>
                  </section>
                </div>
              </section>
            </section>
          </section>
        )}
      </section>
    </main>
  );
}
