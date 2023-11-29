"use client";
import React from "react";
import Link from "next/link";

import { navItems } from "@/components/Navbar/";

import { FaTwitterSquare, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-12 bg-dark-blue  text-white">
      <main className="flex flex-col sm:flex-row gap-8 justify-between mx-8 mt-4 md:mx-12 md:my-6 lg:mx-16 lg:mt-8">
        <section className="flex flex-col gap-4">
          <Link
            href="/"
            className="select-none font-playfair text-heading-l text-white"
          >
            Elixir
          </Link>
          <div className="flex select-none flex-col gap-2 text-white">
            <span>Email: elixir@gmail.com</span>
            <span>Phone: 0812-3456-7890</span>
          </div>
          <div className="flex flex-col select-none py-4 text-white gap-2 ">
            <span>
              Our Social Media
            </span>
            <div className="flex gap-2 items-center">
              <a target="_blank" href={"https://www.instagram.com/"} className="bg-white p-1 text-dark-blue rounded-full">
                <FaInstagram size={24} />
              </a>
              <a target="_blank" href={"https://twitter.com/"} className="bg-white p-1 text-dark-blue rounded-full">
                <FaTwitter size={24} />
              </a>
              <a target="_blank" href={"https://www.tiktok.com/"} className="bg-white p-1 text-dark-blue rounded-full">
                <FaTiktok size={24} />
              </a>
            </div>
          </div>
        </section>
        <section className="flex md:w-1/4 md:justify-between gap-16">
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold">Categories</h6>
            <section className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={` hover:font-semibold `}
                >
                  {item.title}
                </Link>
              ))}
            </section>
          </div>
          <div  className="flex flex-col gap-2">
            <h6 className="font-semibold">Pages</h6>
            <section className="flex flex-col gap-1">
              <Link href={"/about"} className=" hover:font-semibold">
                About Us
              </Link>
              <Link href={"/product"} className=" hover:font-semibold">
                Product
              </Link>
            </section>
          </div>
        </section>
      </main>
      <footer className="flex justify-center border-t-2 py-6 select-none mx-8 md:mx-12 lg:mx-16">
        <span className="text-center text-sm">
          © 2023 Elixir Inc. All rights reserved
        </span>
      </footer>
    </footer>
  );
}
