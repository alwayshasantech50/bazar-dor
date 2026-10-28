import ProductGridLoad from "@/components/ProductGridLoad";

const CategoryLoading = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton mb-8 h-28 rounded-2xl" />

      <ProductGridLoad />
    </main>
  );
};

export default CategoryLoading;