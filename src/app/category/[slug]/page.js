import Image from "next/image";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

const CategoryPage = async ({ params }) => {
  const { slug } = await params;

  // Check whether this category exists.
  const categoryResponse = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      cache: "no-store",
    }
  );

  if (!categoryResponse.ok) {
    throw new Error("বিভাগের তথ্য লোড করা যায়নি।");
  }

  const categories = await categoryResponse.json();

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  // Fetch only products belonging to this category.
  const productResponse = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (!productResponse.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const products = await productResponse.json();

  if (products.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-3xl">
          {category.slug === "dal" ? (
            <Image
              src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fad8.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
            />
          ) : (
            <span
              aria-hidden="true"
              style={{
                fontFamily:
                  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
              }}
            >
              {category.icon}
            </span>
          )}
        </span>

        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>

          <p className="mt-1 text-sm text-gray-500">
            এই বিভাগের আজকের দাম ও পরিবর্তন দেখুন।
          </p>
        </div>
      </section>

      <section className="mt-8" aria-label="বিভাগের পণ্য">
        <p className="mb-4 text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে।
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;