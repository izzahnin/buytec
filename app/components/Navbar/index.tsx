"use client";
import Image from "next/image";
import React, { useState } from "react";
import NavItems from "./NavItems";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const alreadyLogin = false;
  function onNavClick() {
    setIsNavOpen((prev) => !prev);
  }

  return (
    <nav className="flex items-center justify-between px-[32px] py-[16px] shadow-lg lg:px-[56px]">
      {/* logo */}
      <section className="font-playfair select-none text-[32px] text-[#001C55] hover:cursor-pointer lg:text-[40px]">
        Elixir
      </section>
      <NavItems />
      {/* category */}

      {/* leading desktop */}
      <section className="hidden gap-5 lg:flex">
        <Image src={"/search.png"} alt={"profile"} width={26} height={26} />
        <Image
          src={"/notification.svg"}
          alt={"profile"}
          width={26}
          height={26}
        />
        <Image src={"/profile.svg"} alt={"profile"} width={26} height={26} />
      </section>

      {/* leading mobile */}
      <section className={`flex lg:hidden`}>
        <div
          className={`space-y-2 hover:cursor-pointer ${
            isNavOpen ? "hidden" : ""
          }`}
          onClick={onNavClick}
        >
          <div className="h-0.5 w-8 bg-gray-600"></div>
          <div className="h-0.5 w-8 bg-gray-600"></div>
          <div className="h-0.5 w-8 bg-gray-600"></div>
        </div>

        <div className={isNavOpen ? "flex" : "hidden"}>
          <Image
            className="hover:cursor-pointer"
            onClick={onNavClick}
            src={"/cross.svg"}
            alt={"profile"}
            width={26}
            height={26}
          />
          {/* hamburger menu dropdown */}
          <div
            className={
              isNavOpen
                ? "absolute left-0 top-16 flex h-screen w-full flex-col bg-white px-8"
                : "hidden"
            }
          >
            {/* already login */}
            <ul className={alreadyLogin ? '' : 'hidden'}>
              <li className="py-1 font-bold duration-300 hover:cursor-pointer hover:text-lg">
                Profile
              </li>
              <li className="py-1 font-bold duration-300 hover:cursor-pointer hover:text-lg">
                Wishlist
              </li>
              <li className="py-1 font-bold duration-300 hover:cursor-pointer hover:text-lg">
                Cart
              </li>
              <li className="py-1 font-bold duration-300 hover:cursor-pointer hover:text-lg">
                Track Order
              </li>
            </ul>
            {/* not yet login */}
            <ul className={alreadyLogin ? 'hidden' : ''}>
              <li className="py-1 font-bold duration-300 hover:cursor-pointer hover:text-lg">
                Log in
              </li>
              <li className="py-1 font-bold duration-300 hover:cursor-pointer hover:text-lg">
                Sign up
              </li>
            </ul>
            <div className="h-0.5 w-full bg-gray-400"></div>
            <ul>
              <li className="py-1 font-medium duration-300 hover:cursor-pointer hover:text-lg">
                Notes
              </li>
              <li className="py-1 font-medium duration-300 hover:cursor-pointer hover:text-lg">
                Brand
              </li>
              <li className="py-1 font-medium duration-300 hover:cursor-pointer hover:text-lg">
                Occasion
              </li>
              <li className="py-1 font-medium duration-300 hover:cursor-pointer hover:text-lg">
                Gender
              </li>
              <li className="py-1 font-medium duration-300 hover:cursor-pointer hover:text-lg">
                Concentration
              </li>
              <li className="py-1 font-medium duration-300 hover:cursor-pointer hover:text-lg">
                Size
              </li>
              <li className="py-1 font-medium duration-300 hover:cursor-pointer hover:text-lg">
                Origin
              </li>
            </ul>
          </div>
        </div>
      </section>
    </nav>
  );
}
