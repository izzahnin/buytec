"use client";
import React, { useEffect, useState } from "react";
import CardEmpty from "@/components/CardEmpty";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import CardCart from "@/components/CardCart";
import { getPerfumeByIdFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";

export default function Cart() {
  const auth = useAuth();
  const [cart, setCart] = useState(auth.user.cart);
  const [amount, setAmount] = useState(auth.user.cartAmount);

  useEffect(() => {
    setCart(auth.user.cart);
    setAmount(auth.user.cartAmount);
  }, [auth.user.cart, auth.user.cartAmount]);

  return (
    <div>
      {cart.length == 0 ? (
        <CardEmpty type="cart" />
      ) : (
        // if cart has perfume
        <div className="flex flex-col gap-3 py-6 pl-4">
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
      )}
    </div>
  );
}
