import { Suspense } from "react";
import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";
import ProductGridLoad from "@/components/ProductGridLoad";

const HomePage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Hero />

      <Suspense fallback={<ProductGridLoad />}>
        <HomeProducts />
      </Suspense>
    </main>
  );
};

export default HomePage;