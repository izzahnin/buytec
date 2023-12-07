'use client'
import React, { useState } from "react";
import NextLink from "next/link";
import CardWishlist from "@/components/CardWishlist";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import { useRouter } from "next/router";
import CardEmpty from "@/components/CardEmpty";
import CardTrackOrder from "@/components/CardTrackOrder";

export default function TrackOrder() {
  const auth = useAuth();

  return (
    <main className="mx-auto flex w-screen flex-col">
      <section className="mx-auto my-8 flex h-full w-11/12 flex-col gap-6">
        <section className="flex flex-row gap-1">
          <NextLink href="/profile" passHref>
            <span className="cursor-pointer">Profile</span>
          </NextLink>
          <span>/</span>
          <span>Track Order</span>
        </section>
        <CardTrackOrder userId={auth.user.id!} />
      </section>
    </main>
  );
}
