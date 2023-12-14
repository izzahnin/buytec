"use client";
import React, { useEffect, useState } from "react";
import ProductDetail from "../../../components/AdminProductDetail";
// import AdminListProduct from "../../components/AdminListProduct";
// import { getPerfumeFromLocal } from "@/firebase/perfume/getPerfumeFromLocal";
import AdminListProduct from "../../../components/AdminListProduct";
import { AdminLoginState, useAdmin } from "@/firebase/admin/AdminContext";
import { useRouter } from "next/navigation";

export default function Product() {
  const adminAuth = useAdmin();
  const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [userValid, setUserValid] = useState(false);
  // const [selectedPerfume, setSelectedPerfume] = useState<PerfumeProps | null>();

  useEffect(() => {
    const checkAuth = () => {
      if (adminAuth.admin.username != null) {
        setUserValid(true);
      } else {
        router.push("/admin/product");
      }
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 2000);

    return () => clearTimeout(timer);

  });

  const onClick = (perfumeId: string) => {
    setSelectedProductId(perfumeId);
  };
  if (userValid) {
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
          <ProductDetail id="1" />
        </main>
      </section>
    );
  }
}
