"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  MdOutlineNotifications,
  MdOutlinePersonOutline,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";

import NavItems from "./NavItems";
import CardSearchProduct from "../CardSearchProduct";
import CardNotification from "@/components/CardNotification";
import isEqual from "lodash/isEqual";
import { useAuth } from "@/firebase/auth/AuthUserProvider";
import getUserTransactions from "@/firebase/transaction/getUserTransactions";
import searchPerfume from "@/firebase/perfume/searchPerfume";
import { PerfumeProps } from "@/firebase/perfume/perfume";

interface Notification {
  id: number;
  title: string;
  description: string;
}

export const notifItems = new Set<Notification>();

export default function Navbar() {
  let alreadyLogin = false;
  const auth = useAuth();
  if (auth.user.id != null) {
    alreadyLogin = true;
  }
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Set<Notification>>(notifItems);

  // State variable for notification count
  const [notificationCount, setNotificationCount] = useState(notifItems.size); // Initialize with the number of items that need review

  const onNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  // fill notifications
  const getNotif = async () => {
    notifItems.clear();
    // console.log("navbar is running again");
    const verif = await auth.checkUserVerified();
    // console.log(verif);
    // check verified
    if (!verif) {
      // to prevent multiple notifications
      if (notifItems.size == 0) {
        notifItems.add({
          id: 0,
          title: "Verify Account",
          description: "Check your email to verify your account",
        });
      }
    }

    // check unreviewed perfumes
    const transactions = await getUserTransactions(auth.user.id!);
    // let id = notifItems.size == 0 ? 1 : 0
    transactions?.forEach((transaction) => {
      let title = "";
      let desc = "";

      if (transaction.packageStatus == "Wait for verification") {
        title = "Order in pending";
        desc = `Order number ${transaction.id} is waiting for verification`;
      } else if (transaction.packageStatus == "Packed") {
        title = "Order is packed";
        desc = `Order number ${transaction.id} is being packed`;
      } else if (transaction.packageStatus == "Sent") {
        title = "Order is sent";
        desc = `Order number ${transaction.id} is on its way`;
      } else if (transaction.packageStatus == "Received") {
        title = "Order done";
        desc = `Order number ${transaction.id} is arrived. Please review`;
      }
      const newNotif = {
        id: +transaction.id,
        title: title,
        description: desc,
      };
      // check if the notification is already exist
      const exist = Array.from(notifItems).some((notif) =>
        isEqual(notif, newNotif),
      );
      if (!exist) {
        notifItems.add(newNotif);
      }
    });
  };
  useEffect(() => {
    setNotifications(notifItems);
    // console.log(`isi notif: ${notifItems.size}`);
    setNotificationCount(notifItems.size);
  }, []);

  getNotif().then(() => {
    setNotifications(notifItems);
    // console.log(`isi notif: ${notifItems.size}`);
    setNotificationCount(notifItems.size);
  });

  // search bar start
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const result = await searchPerfume(searchInput);
    setSearchProduct(result);
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };
  const [searchInput, setSearchInput] = useState("");

  const [searchProduct, setSearchProduct] = useState<PerfumeProps[]>([]);

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
  // search bar end

  // notification start
  const [notificationBarVisible, setNotificationBarVisible] = useState(false);
  const toggleNotificationBar = () => {
    setNotificationBarVisible(!notificationBarVisible);
  };

  return (
    <>
      <nav className="flex flex-col">
        <section className="sticky top-0 z-50 flex h-[70px] w-screen items-center justify-between bg-white px-5 shadow-lg sm:hidden ">
          <Link
            href="/"
            className="select-none font-playfair text-heading-l text-primary-blue"
            onClick={() => setIsNavOpen(false)}
          >
            Elixir
          </Link>
          <div className="flex gap-1">
            <button
              title="search"
              className="p-1 text-heading-s"
              onClick={toggleSearchBar}
            >
              <MdSearch />
            </button>
            <button
              title="notification"
              className={
                alreadyLogin ? "relative p-1 text-heading-s" : "hidden"
              }
              onClick={toggleNotificationBar}
            >
              <MdOutlineNotifications />
              {notificationCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 text-xs text-white">
                  &nbsp;
                </span>
              )}
            </button>
            <button
              title="humburger menu"
              className="p-1 text-heading-m"
              onClick={onNavClick}
            >
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
                title="cart"
                href="/cart"
                className="flex items-center gap-3 p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                <span className="p-1 text-heading-s">
                  <MdOutlineShoppingCart />
                </span>{" "}
                Cart
              </Link>
              <Link
                title="profile"
                href="/profile"
                className="flex items-center gap-3 p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                <span className="p-1 text-heading-s">
                  <MdOutlinePersonOutline />
                </span>{" "}
                Profile
              </Link>
              <hr className="border-gray-300" />
            </section>
            <section
              className={alreadyLogin ? "hidden" : "flex flex-col gap-4"}
            >
              <Link
                href="/signup"
                className="p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="p-1 hover:font-semibold"
                onClick={onNavClick}
              >
                Login
              </Link>
              <hr className="border-gray-300" />
            </section>
          </section>
        </section>
      </nav>

      {/* notification bar */}
      {notificationBarVisible && (
        <main className="sticky top-[70px] z-50 flex w-full sm:hidden  ">
          <section className="absolute right-16 divide-y divide-slate-200 border border-slate-200 md:w-1/4 ">
            {Array.from(notifications).map((item) => (
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
        <section className="relative mx-3 my-2 flex sm:hidden">
          <section className="mx-3 my-2 flex h-11 w-full  items-center rounded-xl border border-dark-blue px-4 align-middle ">
            <MdSearch className="w-5  text-2xl text-dark-blue" />
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full bg-transparent pl-2 text-lg text-dark-blue outline-none"
              onChange={async (e) => {
                await handleSearch(e);
              }}
            />
          </section>
          <section className="absolute mt-16 flex w-full flex-col gap-1 ">
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
                  onClick={() => setSearchBarVisible(false)}
                />
              ))}
          </section>
        </section>
      )}

      <NavItems />
    </>
  );
}
