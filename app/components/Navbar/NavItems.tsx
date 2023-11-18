import Link from "next/link";
import React, { useState } from "react";
import { FaBeer } from 'react-icons/fa';

export default function NavItems() {
  const [active, setActive] = useState<number | null>(1);

  const navItems = [
    { id: 1, title: "Notes", href: "/" },
    { id: 2, title: "Brand", href: "/example" },
    { id: 3, title: "Occasion", href: "/example" },
    { id: 4, title: "Gender", href: "/example"},
  ];

  return (
    <section>
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
      <section>
        {/* icon dipake dari react icon */}
      </section>
    </section>
  );
}
