import Link from "next/link";
import React from "react";

import {
  MdOutlineLocalShipping,
  MdOutlineShoppingBag,
  MdPersonAddAlt,
} from "react-icons/md";

export default function Bar() {
  return (
    <nav className="flex bg-white h-screen w-64 flex-col p-4 shadow-xl">
      <Link href={"/admin"} className="m-2 text-heading-m font-bold">
        Admin
      </Link>
      <section className="flex flex-col gap-2">
        <Link
          href={"admin/product"}
          className=" flex cursor-pointer rounded-xl items-center gap-2 p-2  hover:bg-zinc-200"
        >
          <span className="text-2xl"><MdOutlineShoppingBag /></span>
          <span>Product</span>
        </Link>
        <Link
          href={"admin/product"}
          className=" flex cursor-pointer rounded-xl items-center gap-2 p-2  hover:bg-zinc-200"
        >
          <span className="text-2xl"><MdOutlineLocalShipping /></span> <span>Shipping</span>
        </Link>
        <Link
          href={"admin/product"}
          className=" flex cursor-pointer rounded-xl items-center gap-2 p-2  hover:bg-zinc-200"
        >
          <span className="text-2xl"><MdPersonAddAlt /> </span><span>Add Admin</span>
        </Link>
      </section>
    </nav>
  );
}
