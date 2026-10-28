const ProductGridLoad = () => {
  return (
    <div
      role="status"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="skeleton h-40 rounded-2xl"
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default ProductGridLoad;