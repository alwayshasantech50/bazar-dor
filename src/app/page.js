const HomePage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-3xl font-bold">🛒 বাজার দর</h1>

        <p className="mt-3 text-gray-600">
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <button className="btn mt-6 border-0 bg-green-600 text-white hover:bg-green-700">
          শুরু করি
        </button>
      </div>
    </main>
  );
};

export default HomePage;
