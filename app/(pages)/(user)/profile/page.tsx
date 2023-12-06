'use client'
import PersonalData from '@/components/PersonalData';
import CardProductOrder from "@/components/CardProductOrder";
import CardTrackOrder from "@/components/CardTrackOrder";
import React, { useState } from "react";
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import NextLink from 'next/link';

export default function Profile() {
  const [activeTab, setActiveTab] = useState("PersonalData");
  const auth = useAuth();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main>
      <section className="flex flex-col gap-3 m-6">
        <section>
          <div className="flex flex-row items-center justify-center gap-3">
            <span
              onClick={() => handleTabClick("PersonalData")}
              className={`cursor-pointer hover:font-bold hover:bg-grey p-2 ${
                activeTab === "PersonalData" ? "font-bold bg-grey" : ""
              }`}
            >
              Personal Data
            </span>
            <NextLink href="/profile/wishlist" passHref>
              <span className="cursor-pointer hover:font-bold hover:bg-grey p-2">
                Wishlist
              </span>
            </NextLink>
            <span
              onClick={() => handleTabClick("TrackOrder")}
              className={`cursor-pointer hover:font-bold hover:bg-grey p-2 ${
                activeTab === "TrackOrder" ? "font-bold bg-grey" : ""
              }`}
            >
              Track Order
            </span>
          </div>
          <div className="flex items-center justify-center pb-24 pt-3">
            {activeTab === "PersonalData" && <PersonalData />}
            {activeTab === "TrackOrder" && <CardTrackOrder userId={auth.user.id!} />}
          </div>
        </section>
      </section>
    </main>
  );
}
