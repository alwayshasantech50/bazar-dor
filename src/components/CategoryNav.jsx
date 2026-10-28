import CategoryLinks from "./CategoryLinks";

const CategoryNav = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-3 text-sm text-red-600">
        বিভাগগুলো লোড করা যায়নি।
      </p>
    );
  }

  const categories = await response.json();

  return <CategoryLinks categories={categories} />;
};

export default CategoryNav;