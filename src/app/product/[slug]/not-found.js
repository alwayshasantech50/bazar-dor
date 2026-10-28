import Link from "next/link";

const ProductNotFound = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="text-6xl font-bold text-green-700">৪০৪</p>

      <h1 className="mt-4 text-2xl font-bold">
        পণ্য পাওয়া যায়নি
      </h1>

      <p className="mt-3 text-gray-500">
        পণ্যের লিংকটি সঠিক নয় অথবা পণ্যটি এখন পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="btn mt-6 border-0 bg-green-700 text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default ProductNotFound;