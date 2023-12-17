import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  MdSearch,
  MdOutlineShoppingCart,
  MdOutlinePersonOutline,
  MdOutlineNotifications,
} from "react-icons/md";

import { notifItems } from "@/components/Navbar/";
import CardSearchProduct from "@/components/CardSearchProduct";
import CardNotification from "@/components/CardNotification";

import { useAuth } from "@/firebase/auth/AuthUserProvider";
import { PerfumeProps } from "@/firebase/perfume/perfume";
import searchPerfume from "@/firebase/perfume/searchPerfume";

export default function NavItems() {
  let alreadyLogin = false;
  const auth = useAuth();
  if (auth.user.id != null) {
    alreadyLogin = true;
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const result = await searchPerfume(searchInput);
    setSearchProduct(result);
  };

  // search bar start
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };
  const [searchProduct, setSearchProduct] = useState<PerfumeProps[]>([
    // {
    //   id: "1",
    //   name: "Infusion d'Homme",
    //   image:
    //     "https://firebasestorage.googleapis.com/v0/b/elixir-8ce95.appspot.com/o/Prada_Infusiond_Homme.jpg?alt=media&token=51a6e28a-f52a-4d1a-a07b-5433eb38a524",
    //   brand: "Prada",
    //   concentration: "Eau de Toilette",
    //   size: 100,
    // },
    // {
    //   id: "2",
    //   name: "Luna Rossa Ocean",
    //   image:
    //     "https://firebasestorage.googleapis.com/v0/b/elixir-8ce95.appspot.com/o/Prada_LunaRossaOcean.jpg?alt=media&token=b33498d4-215c-4417-83ec-d57e28b8a5a1",
    //   brand: "Prada",
    //   concentration: "Eau de Toilette",
    //   size: 100,
    // },
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

    setNotificationCount(notifItems.size);
  }, [searchInput, searchProduct]);
  // search bar end

  // notification start
  const [notificationBarVisible, setNotificationBarVisible] = useState(false);
  const toggleNotificationBar = () => {
    setNotificationBarVisible(!notificationBarVisible);
  };
  // State variable for notification count
  const [notificationCount, setNotificationCount] = useState(0); // Initialize with the number of items that need review

  useEffect(() => {
    setNotificationCount(notifItems.size);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 hidden h-[70px] w-screen items-center justify-between bg-white px-5 shadow-lg sm:flex xl:px-8">
        <Link
          href="/"
          className="select-none font-playfair text-heading-l text-primary-blue"
        >
          Elixir
        </Link>
        {/* <section className="flex gap-4 px-2 py-3 text-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`p-1 hover:font-semibold `}
            >
              {item.title}
            </Link>
          ))}
        </section> */}
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
          <button
            className={alreadyLogin ? "relative p-1 text-heading-s" : "hidden"}
            onClick={toggleNotificationBar}
          >
            <MdOutlineNotifications />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 text-xs text-white">
                &nbsp;
              </span>
            )}
          </button>
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

      {/* notification bar */}
      {notificationBarVisible && (
        <main className="sticky top-[70px] z-50  w-full ">
          <section className="absolute  right-16 divide-y divide-slate-200 border border-slate-200 md:w-1/4 ">
            {Array.from(notifItems).map((item) => (
              <CardNotification
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </section>
        </main>
      )}

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
              onChange={async (e) => await handleSearch(e)}
            />
          </section>
          <section className="absolute mt-4 flex w-full flex-col gap-1 md:w-1/4">
            {searchInput.trim() !== "" &&
              filteredProducts.map((product) => (
                // <Link
                //   key={product.id}
                //   href={`/product/${product.id}/${product.name.replace(
                //     /\s+/g,
                //     "-",
                //   )}`}
                //   // onClick={() => {
                //   //   setSearchInput("");
                //   //   setSearchBarVisible(false);
                //   // }}
                // >
                  <CardSearchProduct
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    brand={product.brand}
                    concentration={product.concentration}
                    size={product.size}
                  />
                // </Link>
              ))}
          </section>
        </section>
      )}
    </>
  );
}
