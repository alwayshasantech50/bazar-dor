import ProductCard from "./ProductCard";

const ProductPreview = async () => {
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
  const firstProduct = products[0];

  if (!firstProduct) {
    return <p className="text-gray-600">কোনো পণ্য পাওয়া যায়নি।</p>;
  }

  return (
    <div className="max-w-sm">
      <ProductCard product={firstProduct} />
    </div>
  );
};

export default ProductPreview;