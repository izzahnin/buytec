import React from "react";
import Link from "next/link";

import { FaTwitterSquare, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex w-full flex-col gap-12 bg-dark-blue px-8 py-8 text-white">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 lg:px-40 lg:pt-24">
        <div>
          <Link
            href="/"
            className="select-none font-playfair text-heading-l text-white"
          >
            Elixir
          </Link>
          <p className="select-none py-4 font-playfair text-white ">
            Email: elixier@gmail.com
          </p>
          <p className="select-none py-4 font-playfair text-white ">
            Phone: 00000000
          </p>
          <p className="select-none py-4 text-2xl text-white ">
            Our Social Media
          </p>

          <div className="flex gap-6">
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>

        <div className="flex gap-24 lg:col-span-1">
          <div>
            <h6 className="font-semibold">Categories</h6>
            <ul>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">
                Notes
              </li>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">
                Brand
              </li>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">
                Occasion
              </li>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">
                Gender
              </li>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">
                Concentration
              </li>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">
                Size
              </li>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">
                Origin
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold">Pages</h6>
            <ul>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">About Us</li>
              <li className="py-2 text-sm duration-300 hover:cursor-pointer">All Product</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="h-0.5 w-[99%] bg-white lg:w-11/12"></div>
      </div>

      <p className="text-start lg:text-center">
        © 2023 Elixir Inc. All rights reserved
      </p>
    </div>
  );
}