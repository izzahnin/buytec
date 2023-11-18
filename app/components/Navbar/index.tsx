"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import NavItems from "./NavItems";

import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const alreadyLogin = false;

  function onNavClick() {
    setIsNavOpen((prev) => !prev);
  }


  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      {windowWidth <= 1024 ? (
        <nav className="sticky top-0 z-50 flex h-[70px] w-screen items-center justify-between px-5 shadow-lg ">
          <Link
            href="/"
            className="text-primary-blue text-heading-l select-none font-playfair"
          >
            Elixir
          </Link>
          <button className="text-heading-m m p-1" onClick={onNavClick}>
            <RxHamburgerMenu />
          </button>
        </nav>
      ) : (
        <NavItems />
      )}
    </>
  );
}
