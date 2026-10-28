import ProductCard from "./ProductCard";

const HomeProducts = async () => {
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

  const topRisers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const topFallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-xl font-bold">
          <span className="text-green-600">▲</span> আজ দাম বেড়েছে
        </h2>

        {topRisers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topRisers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            আজ কোনো পণ্যের দাম বাড়েনি।
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">
          <span className="text-red-600">▼</span> আজ দাম কমেছে
        </h2>

        {topFallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topFallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            আজ কোনো পণ্যের দাম কমেনি।
          </p>
        )}
      </section>

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>

        <p className="mt-2 text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে।
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeProducts;