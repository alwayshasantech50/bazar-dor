import { Suspense } from "react";
import Hero from "@/components/Hero";
import AllProducts from "@/components/AllProducts";
import ProductGridLoad from "@/components/ProductGridLoad";

const HomePage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Hero />

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>

        <p className="mt-2 text-sm text-gray-500">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর দেখুন।
        </p>

        <div className="mt-6">
          <Suspense fallback={<ProductGridLoad />}>
            <AllProducts />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default HomePage;