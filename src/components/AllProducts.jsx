import ProductCard from "./ProductCard";

const AllProducts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <p className="text-red-600">
        পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।
      </p>
    );
  }

  const products = await response.json();

  if (products.length === 0) {
    return <p className="text-gray-600">কোনো পণ্য পাওয়া যায়নি।</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AllProducts;