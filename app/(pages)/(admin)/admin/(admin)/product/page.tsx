"use client";
import React, { useState } from "react";
import ProductDetail from "../../../components/AdminProductDetail";
// import AdminListProduct from "../../components/AdminListProduct";
// import { getPerfumeFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";
import ProductCard from "../../../components/AdminProductCard";
import AdminListProduct from "../../../components/AdminListProduct";
import AdminPerfumeDetail from "../../../components/AdminPerfumeDetail";
import { PerfumeProps } from "@/firebase/perfume/perfume";

export default function Product() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  // const [selectedPerfume, setSelectedPerfume] = useState<PerfumeProps | null>();

  const onClick = (perfumeId: string) => {
    setSelectedProductId(perfumeId);
  }

  return (
    <section className="m-6 flex  gap-6">
      <AdminListProduct />

      <main className=" flex w-5/6 flex-col rounded-xl bg-white p-4 shadow-xl">
        <h1 className="text-lg font-semibold text-slate-500">Details</h1>
        {/* {selectedProductId && (
          <ProductDetail
            id={selectedProductId}
            // Other props you want to pass
          />
        )} */}
        <ProductDetail id="1"/>
      </main>
    </section>
  );
}
