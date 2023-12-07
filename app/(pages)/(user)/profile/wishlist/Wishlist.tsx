"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import CardWishlist from "@/components/CardWishlist";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import CardEmpty from "@/components/CardEmpty";
import { wishlistItems } from "./page";

export default function Wishlist() {
  const auth = useAuth();
  // const router = useRouter();
  const [wishlist, setwishlist] = useState(auth.user.wishlist);
  // const [selectedWishlist, setSelectedWishlist] = useState<string[]>([]);
  // const [selectedWishlistAmount, setSelectedWishlistAmount] = useState<
  //   number[]
  // >([]);
  // let change = 0;
  useEffect(() => {}, [auth.user.wishlist]);

  return (
    <main className="mx-auto flex w-screen flex-col">
      <section>
        {wishlistItems.length == 0 ? (
          <CardEmpty type="wishlist" />
        ) : (
          <section className="mx-auto my-8 flex h-screen w-11/12 flex-col gap-6">
            <section className="flex flex-row gap-1">
              <NextLink href="/profile" passHref>
                <span className="cursor-pointer">Profile</span>
              </NextLink>
              <span>/</span>
              <span>Wishlist</span>
            </section>

            <div className="flex flex-col gap-4">
              {wishlistItems.map((List, index) => (
                <CardWishlist
                  key={index}
                  title={List.title}
                  price={List.price}
                  image={List.image}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
