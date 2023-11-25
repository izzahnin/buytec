import Link from "next/link";
import React, { useState } from "react";
import { navItems } from "@/components/Navbar/";

import {
  MdSearch,
  MdOutlineShoppingCart,
  MdOutlinePersonOutline,
} from "react-icons/md";

export default function NavItems() {
  const alreadyLogin = false;
  
  const [active, setActive] = useState<number | null>(1);

  return (
    <nav className="sticky top-0 z-50 hidden h-[70px] w-screen items-center justify-between bg-white px-5 shadow-lg lg:flex xl:px-8">
      <Link
        href="/"
        className="select-none font-playfair text-heading-l text-primary-blue"
      >
        Elixir
      </Link>
      <section className="flex gap-4 px-2 py-3 text-center">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`p-1 hover:font-semibold ${
              active === item.id && "font-semibold"
            }`}
            onClick={() => setActive(item.id)}
          >
            {item.title}
          </Link>
        ))}
      </section>
      <section className="flex gap-1 items-center">
        <Link href="/" className="p-1 text-heading-s">
          <MdSearch />
        </Link>
        <Link href="/cart" className={alreadyLogin ? "p-1 text-heading-s" : "hidden"}>
          <MdOutlineShoppingCart />
        </Link>
        <Link href="/profile" className={alreadyLogin ? "p-1 text-heading-s" : "hidden"}>
          <MdOutlinePersonOutline />
        </Link>
        <Link href="/signup" className={alreadyLogin ? "hidden" : "p-1 bg-primary-blue text-white px-4 rounded-full"}>
          Sign Up
        </Link>
        <Link href="/login" className={alreadyLogin ? "hidden" : "p-1 border border-dark-blue text-primary-blue px-4 rounded-full"}>
          Login
        </Link>
      </section>
    </nav>
  );
}
