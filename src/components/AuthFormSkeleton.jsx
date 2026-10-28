const AuthFormSkeleton = ({ signup = false }) => {
  const fieldCount = signup ? 4 : 2;

  return (
    <main
      role="status"
      aria-label="ফর্ম লোড হচ্ছে"
      aria-busy="true"
      className="flex min-h-[70vh] items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="skeleton mx-auto h-12 w-12 rounded-xl" />
        <div className="skeleton mx-auto mt-4 h-7 w-48" />
        <div className="skeleton mx-auto mt-2 h-4 w-56" />

        <div className="mt-6 space-y-4">
          {Array.from({ length: fieldCount }).map((_, index) => (
            <div key={index}>
              <div className="skeleton mb-2 h-4 w-20" />
              <div className="skeleton h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>

        <div className="skeleton mt-6 h-11 w-full rounded-lg" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="skeleton h-10 rounded-lg" />
          <div className="skeleton h-10 rounded-lg" />
        </div>

        <div className="skeleton mx-auto mt-6 h-4 w-48" />
      </div>
    </main>
  );
};

export default AuthFormSkeleton;