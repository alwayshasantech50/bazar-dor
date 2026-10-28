const ProfileLoading = () => {
  return (
    <main
      role="status"
      aria-label="প্রোফাইল লোড হচ্ছে"
      aria-busy="true"
      className="mx-auto max-w-2xl px-4 py-12"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="skeleton h-8 w-48" />

        <div className="mt-6 space-y-5">
          <div>
            <div className="skeleton h-4 w-16" />
            <div className="skeleton mt-2 h-6 w-48" />
          </div>

          <div>
            <div className="skeleton h-4 w-20" />
            <div className="skeleton mt-2 h-6 w-full max-w-72" />
          </div>
        </div>

        <div className="skeleton mt-8 h-12 w-44 rounded-lg" />
      </div>
    </main>
  );
};

export default ProfileLoading;