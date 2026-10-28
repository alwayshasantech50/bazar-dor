import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

const UpdateProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=login-required");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold">প্রোফাইল আপডেট করুন</h1>

        <p className="mt-2 text-sm text-gray-500">
          নিচের ফর্ম থেকে আপনার নাম পরিবর্তন করুন।
        </p>

        <UpdateProfileForm currentName={session.user.name} />
      </section>
    </main>
  );
};

export default UpdateProfilePage;