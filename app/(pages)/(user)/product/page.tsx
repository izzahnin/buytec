"use client";
import React, { useState } from "react";

// import ProductFilter from "@/components/ProductFilter";
import dynamic from "next/dynamic";

const ProductFilter = dynamic(() => import("@/components/ProductFilter"), {
  loading: () => (
    <div className="custom-height flex w-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  ),
});
export const categorys = [
  {
    id: 1,
    title: "topNotes",
    subCategory: [
      "Amber",
      "Vanilla",
      "Bergamot",
      "Citrus",
      "Orange",
      "Rose",
      "Lemon",
    ],
  },
  {
    id: 2,
    title: "brand",
    subCategory: ["Dior", "Versace", "Diptyque", "Lattafa", "Prada", "HMNS"],
  },
  { id: 3, title: "occasion", subCategory: ["Day", "Night", "Versatile"] },
  { id: 4, title: "gender", subCategory: ["Women", "Men", "Unisex"] },
  {
    id: 5,
    title: "concentration",
    subCategory: ["Eau de Toilette", "Eau de Parfum", "Extrait de Parfum"],
  },
  { id: 6, title: "size", subCategory: ["50", "100"] },
  {
    id: 7,
    title: "origin",
    subCategory: ["France", "Italy", "Indonesia", "UEA"],
  },
];

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(""); // Reset subcategory when changing the main category
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <main className="my-10 flex w-full flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-center gap-4 m-auto">
        <section>
          <span className="font-bold">Category:</span>
          <select
            id="category"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory}
          >
            <option value="">All</option>
            {categorys.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </section>

        <section>
          {selectedCategory && (
            <>
              <span className="font-bold">Subcategory:</span>
              <select
                id="subCategory"
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                value={selectedSubCategory}
              >
                <option value="">All</option>
                {categorys
                  .find((category) => category.title === selectedCategory)
                  ?.subCategory.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
              </select>
            </>
          )}
        </section>
      </div>

      <section className="row-gap-32 mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductFilter selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory}/>
      </section>
    </main>
  );
}
