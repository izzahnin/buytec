import Link from "next/link";
import React, { useState } from "react";
import { navItems } from "@/components/Navbar/";

import {
  MdSearch,
  MdOutlineShoppingCart,
  MdOutlinePersonOutline,
} from "react-icons/md";

export default function NavItems() {
  const alreadyLogin = true;

  const [active, setActive] = useState<number | null>(1);
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const resetActive = () => {
    setActive(null);
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 hidden h-[70px] w-screen items-center justify-between bg-white px-5 shadow-lg lg:flex xl:px-8">
        <Link
          href="/"
          className="select-none font-playfair text-heading-l text-primary-blue"
          onClick={resetActive}
        >
          Elixir
        </Link>
        <section className="flex gap-4 px-2 py-3 text-center">
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
        <section className="flex items-center gap-1">
          <button className="p-1 text-heading-s" onClick={toggleSearchBar}>
            <MdSearch />
          </button>
          <Link
            href="/cart"
            className={alreadyLogin ? "p-1 text-heading-s" : "hidden"}
            onClick={resetActive}
          >
            <MdOutlineShoppingCart />
          </Link>
          <Link
            href="/profile"
            className={alreadyLogin ? "p-1 text-heading-s" : "hidden"}
            onClick={resetActive}
          >
            <MdOutlinePersonOutline />
          </Link>
          <Link
            href="/signup"
            className={
              alreadyLogin
                ? "hidden"
                : "rounded-full bg-primary-blue p-1 px-4 text-white"
            }
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className={
              alreadyLogin
                ? "hidden"
                : "rounded-full border border-dark-blue p-1 px-4 text-primary-blue"
            }
          >
            Login
          </Link>
        </section>
      </nav>
      {/* search bar */}
      {searchBarVisible && (
        <section className="mx-7 my-2 hidden h-12 items-center  rounded-xl border border-dark-blue px-4 align-middle lg:flex">
          <MdSearch className="w-5  text-2xl text-dark-blue" />
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full bg-transparent pl-2 text-lg text-dark-blue outline-none"
          />
        </section>
      )}
    </>
  );
}
