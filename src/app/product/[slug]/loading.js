const ProductDetailsLoading = () => {
  return (
    <main
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      aria-busy="true"
      className="mx-auto max-w-6xl px-4 py-8"
    >
      <div className="skeleton mb-6 h-5 w-52" />

      <div className="skeleton h-40 rounded-2xl" />

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="skeleton h-6 w-40" />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="skeleton h-24 rounded-2xl"
            />
          ))}
        </div>

        <div className="skeleton mt-6 h-6 w-48" />

        <div className="skeleton mt-4 h-80 rounded-xl" />
      </div>
    </main>
  );
};

export default ProductDetailsLoading;