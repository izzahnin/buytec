"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import NavItems from "./NavItems";

import { RxHamburgerMenu } from "react-icons/rx";
import { MdSearch } from "react-icons/md";
import CardSearchProduct from "../CardSearchProduct";

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

  const [isNavOpen, setIsNavOpen] = useState(false);

  const onNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };
  const [searchInput, setSearchInput] = useState("");

  const [searchProduct, setSearchProduct] = useState([
    {
      id: "1",
      name: "Infusion d'Homme",
      image:
        "https://firebasestorage.googleapis.com/v0/b/elixir-8ce95.appspot.com/o/Prada_Infusiond_Homme.jpg?alt=media&token=51a6e28a-f52a-4d1a-a07b-5433eb38a524",
      brand: "Prada",
      concentration: "Eau de Toilette",
      size: 100,
    },
    {
      id: "2",
      name: "Luna Rossa Ocean",
      image:
        "https://firebasestorage.googleapis.com/v0/b/elixir-8ce95.appspot.com/o/Prada_LunaRossaOcean.jpg?alt=media&token=b33498d4-215c-4417-83ec-d57e28b8a5a1",
      brand: "Prada",
      concentration: "Eau de Toilette",
      size: 100,
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(searchProduct);

  useEffect(() => {
    // Filter products based on searchInput
    const filtered = searchProduct.filter(
      (product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchInput.toLowerCase()),
    );

    setFilteredProducts(filtered);
  }, [searchInput, searchProduct]);
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
            <button className="p-1 text-heading-m" onClick={onNavClick}>
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
                href="/cart"
                className="p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                Cart
              </Link>
              <Link
                href="/profile"
                className="p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                Profile
              </Link>
              <hr className="border-gray-300" />
            </section>
            <section
              className={alreadyLogin ? "hidden" : "flex flex-col gap-4"}
            >
              <Link
                href="/a"
                className="p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                Sign Up
              </Link>
              <Link
                href="/a"
                className="p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                Login
              </Link>
              <hr className="border-gray-300" />
            </section>

            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`p-1 hover:font-semibold `}
                onClick={onNavClick}
              >
                {item.title}
              </Link>
            ))}
          </section>
        </section>
      </nav>
      {searchBarVisible && (
        <section className="relative mx-3 my-2">
          <section className="mx-3 my-2 flex h-11  items-center rounded-xl border border-dark-blue px-4 align-middle lg:hidden">
            <MdSearch className="w-5  text-2xl text-dark-blue" />
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full bg-transparent pl-2 text-lg text-dark-blue outline-none"
            />
          </section>
          <section className="absolute mt-4 flex w-full flex-col gap-1 md:w-1/4">
            {searchInput.trim() !== "" &&
              filteredProducts.map((product) => (
                <CardSearchProduct
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  brand={product.brand}
                  concentration={product.concentration}
                  size={product.size}
                />
              ))}
          </section>
        </section>
      )}

      <NavItems />
    </>
  );
}
