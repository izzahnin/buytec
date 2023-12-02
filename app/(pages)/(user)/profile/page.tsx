'use client'
import CardProductOrder from "@/components/CardProductOrder";
import CardTrackOrder from "@/components/CardTrackOrder";
import React, { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("PersonalData");

  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };

  return (
    <main>
      <section className="flex flex-col gap-3">
        <div className="flex items-start justify-start pl-10 md:pl-20 pt-14 text-heading-m text-dark-blue">
          <h1>Profile</h1>
        </div>

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
            <span
              onClick={() => handleTabClick("Address")}
              className={`cursor-pointer hover:font-bold hover:bg-grey p-2 ${
                activeTab === "Address" ? "font-bold bg-grey" : ""
              }`}
            >
              Address
            </span>
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
            {activeTab === "TrackOrder" && <CardTrackOrder />}
          </div>
        </section>
      </section>
    </main>
  );
}
