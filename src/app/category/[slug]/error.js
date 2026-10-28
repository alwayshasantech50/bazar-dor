"use client";

const CategoryError = ({ reset }) => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">
        তথ্য লোড করা যায়নি
      </h1>

      <p className="mt-3 text-gray-500">
        অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>

      <button
        onClick={() => reset()}
        className="btn mt-6 border-0 bg-green-700 text-white hover:bg-green-800"
      >
        আবার চেষ্টা করুন
      </button>
    </main>
  );
};

export default CategoryError;