import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=login-required");
  }

  const user = session.user;

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>

        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-sm text-gray-500">নাম</dt>
            <dd className="mt-1 break-words font-semibold">
              {user.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">ইমেইল</dt>
            <dd className="mt-1 break-all">{user.email}</dd>
          </div>
        </dl>

        <Link
          href="/profile/update"
          className="btn mt-8 border-0 bg-green-700 text-white hover:bg-green-800"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </main>
  );
};

export default ProfilePage;