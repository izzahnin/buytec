import Link from "next/link";
import React, { useEffect, useState } from "react";
import { navItems } from "@/components/Navbar/";
import {
  MdSearch,
  MdOutlineShoppingCart,
  MdOutlinePersonOutline,
} from "react-icons/md";
import CardSearchProduct from "../CardSearchProduct";

export default function NavItems() {
  const alreadyLogin = true;
  const [active, setActive] = useState<number | null>(1);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };
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
              className={`p-1 hover:font-semibold `}
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
          >
            <MdOutlineShoppingCart />
          </Link>
          <Link
            href="/profile"
            className={alreadyLogin ? "p-1 text-heading-s" : "hidden"}
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
        <section className="relative mx-7 my-2">
          <section className="hidden h-12 items-center rounded-xl border border-dark-blue px-4 align-middle lg:flex">
            <MdSearch className="w-5 text-2xl text-dark-blue" />
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full bg-transparent pl-2 text-lg text-dark-blue outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
    </>
  );
}
