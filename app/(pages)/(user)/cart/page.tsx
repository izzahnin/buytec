"use client";
import React, { useEffect, useState } from "react";
import CardEmpty from "@/components/CardEmpty";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import CardCart from "@/components/CardCart";
import { getPerfumeByIdFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  const auth = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(auth.user.cart);
  const [selectedCart, setSelectedCart] = useState<string[]>([]);
  const [selectedCartAmount, setSelectedCartAmount] = useState<number[]>([]);
  const [amount, setAmount] = useState(auth.user.cartAmount);
  const [total, setTotal] = useState(0);
  let change = 0;

  const handleCheckbox = (id: string) => {
    if (selectedCart.includes(id)) {
      // remove from selected
      const newSelected = selectedCart.filter((target) => target != id);
      const newSelectedAmount = selectedCartAmount.filter(
        (val, index) => index != selectedCart.findIndex((value) => value == id),
      );
      setSelectedCartAmount(newSelectedAmount);
      setSelectedCart(newSelected);
    } else {
      // add to selected
      const newSelected = [id, ...selectedCart];
      const newSelectedAmount = [
        amount[cart.findIndex((value) => value == id)],
        ...selectedCartAmount,
      ];
      setSelectedCartAmount(newSelectedAmount);
      setSelectedCart(newSelected);
    }
    change = 1;
    console.log(selectedCart);
  };

  const handleBuy = () => {
    auth.placeOrder(selectedCart, selectedCartAmount, total, formattedTotal);
    router.push("/checkout");
  };

  useEffect(() => {
    setCart(auth.user.cart);
    const newTotal = selectedCart.reduce((sum, id, index) => {
      const perfume = getPerfumeByIdFromLocal(id)!;
      const subtotal =
        perfume.price * amount[cart.findIndex((value) => value == id)];
      return sum + subtotal;
    }, 0);
    setAmount(auth.user.cartAmount);
    // setSelectedCart(selectedCart);
    setTotal(newTotal);
  }, [auth.user.cart, auth.user.cartAmount, amount, selectedCart, cart]);

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

            <section className="flex flex-col gap-10 md:flex-row md:justify-center md:gap-5">
              <div className="flex flex-col gap-4 md:w-11/12">
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
                      handleCheckbox={handleCheckbox}
                    />
                  );
                })}
              </div>

              <section className="flex md:w-5/12 md:justify-center">
                <div className="flex h-fit w-full flex-col gap-4  rounded-sm border-solid md:w-11/12">
                  <span className="font-bold">SUMMARY</span>
                  <section className="flex flex-row justify-between gap-2 border-t-2">
                    <span className="mt-4 text-[#8C8A8C]">ORDER TOTAL</span>
                    <span className="mt-4 font-bold">{formattedTotal}</span>
                  </section>
                  <section className="flex justify-center">
                    <button
                      className="mt-1 h-10 w-full justify-center rounded bg-primary-blue-accent font-extrabold text-white"
                      type="button"
                      onClick={handleBuy}
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
