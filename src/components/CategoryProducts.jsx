"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const CategoryProducts = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("default");

  // Copy the array so sorting doesn't change the original products.
  const sortedProducts = [...products];

  if (sortOrder === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortOrder === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <section className="mt-6" aria-label="বিভাগের পণ্য">
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white p-4">
        <label
          htmlFor="price-sort"
          className="shrink-0 text-sm text-gray-600"
        >
          সাজান:
        </label>

        <select
          id="price-sort"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="select select-bordered select-sm w-full max-w-52"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-4 mt-6 text-sm text-gray-500">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে।
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;