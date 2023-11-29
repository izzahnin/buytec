"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import NavItems from "./NavItems";

import { RxHamburgerMenu } from "react-icons/rx";
import { MdSearch } from "react-icons/md";

export const navItems = [
  { id: 1, title: "Notes", href: "/product" },
  { id: 2, title: "Brand", href: "/product" },
  { id: 3, title: "Occasion", href: "/product" },
  { id: 4, title: "Gender", href: "/product" },
  { id: 5, title: "Concentration", href: "/product" },
  { id: 6, title: "Size", href: "/product" },
  { id: 7, title: "Origin", href: "/product" },
];

export default function Navbar() {
  const alreadyLogin = true;

  const [active, setActive] = useState<number | null>(1);

  const resetActive = () => {
    setActive(null);
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  const onNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  return (
    <>
      <nav className="flex flex-col">
        <section className="sticky top-0 z-50 flex h-[70px] w-screen items-center justify-between bg-white px-5 shadow-lg lg:hidden ">
          <Link
            href="/"
            className="select-none font-playfair text-heading-l text-primary-blue"
            onClick={() => setIsNavOpen(false)}
          >
            Elixir
          </Link>
          <div className="flex gap-1">
            <button className="p-1 text-heading-s" onClick={toggleSearchBar}>
              <MdSearch />
            </button>
            <button className="p-1 text-heading-m" onClick={() => {
              onNavClick();
              resetActive();
            }}>
              <RxHamburgerMenu />
            </button>
          </div>
        </section>
        <section
          className={
            isNavOpen
              ? "absolute left-0 top-16 z-50 flex h-screen w-full flex-col overflow-y-hidden bg-white px-8 duration-500 ease-in-out lg:hidden"
              : "hidden"
          }
        >
          <section className="flex w-full flex-col gap-4 px-2 py-3 text-center">
            <section
              className={alreadyLogin ? "flex flex-col gap-4" : "hidden"}
            >
              <Link
                href="/"
                className="p-1 hover:font-semibold"
                onClick={resetActive}
              >
                Cart
              </Link>
              <Link
                href="/"
                className="p-1 hover:font-semibold"
                onClick={resetActive}
              >
                Profile
              </Link>
              <hr className="border-gray-300" />
            </section>
            <section
              className={alreadyLogin ? "hidden" : "flex flex-col gap-4"}
            >
              <Link href="/" className="p-1 hover:font-semibold">
                Sign Up
              </Link>
              <Link href="/" className="p-1 hover:font-semibold">
                Login
              </Link>
              <hr className="border-gray-300" />
            </section>

            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`p-1 hover:font-semibold ${
                  active === item.id ? "font-semibold" : ""
                }`}
                onClick={() => {
                  setActive(active === item.id ? null : item.id);
                }}
              >
                {item.title}
              </Link>
            ))}
          </section>
        </section>
      </nav>
      {searchBarVisible && (
        <section className="mx-7 my-2 flex h-11  items-center rounded-xl border border-dark-blue px-4 align-middle lg:hidden">
          <MdSearch className="w-5  text-2xl text-dark-blue" />
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full bg-transparent pl-2 text-lg text-dark-blue outline-none"
          />
        </section>
      )}

      <NavItems />
    </>
  );
}
