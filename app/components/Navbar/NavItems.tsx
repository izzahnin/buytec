import Link from "next/link";
import React, { useState } from "react";

import { MdSearch, MdOutlineShoppingCart, MdOutlinePersonOutline } from "react-icons/md";

export default function NavItems() {
  const [active, setActive] = useState<number | null>(1);

  const navItems = [
    { id: 1, title: "Notes", href: "/example" },
    { id: 2, title: "Brand", href: "/example" },
    { id: 3, title: "Occasion", href: "/example" },
    { id: 4, title: "Gender", href: "/example"},
    { id: 5, title: "Concentration", href: "/example"},
    { id: 6, title: "Size", href: "/example"},
    { id: 7, title: "Origin", href: "/example"},
  ];

  return (
    <nav className="sticky h-[70px] bg-white xl:px-8 top-0 z-50 flex w-screen justify-between items-center shadow-lg px-5">
      <Link href="/" className="font-playfair select-none text-primary-blue text-heading-l">
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
      <section className="flex text-heading-s gap-1">
        <Link href="/" className="p-1"><MdSearch /></Link>
        <Link href="/cart" className="p-1"><MdOutlineShoppingCart /></Link>
        <Link href="/profile" className="p-1"><MdOutlinePersonOutline /></Link>
      </section>
    </nav>
  );
}
