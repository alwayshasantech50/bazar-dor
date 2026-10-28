import { Suspense } from "react";
import ProductPreview from "@/components/ProductPreview";

const HomePage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">আজকের বাজার দর</h1>

      <p className="mt-2 text-gray-500">
        প্রথমে একটি পণ্যের কার্ড দেখি।
      </p>

      <section className="mt-6" aria-label="পণ্যের প্রিভিউ">
        <Suspense
          fallback={
            <div className="skeleton h-40 w-full max-w-sm rounded-2xl" />
          }
        >
          <ProductPreview />
        </Suspense>
      </section>
    </main>
  );
};

export default HomePage;