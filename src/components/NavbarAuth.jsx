"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const NavbarAuth = () => {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [failedImage, setFailedImage] = useState(null);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const { error: logoutError } = await authClient.signOut();

      if (logoutError) {
        toast.error(logoutError.message || "লগ আউট করা যায়নি।");
        return;
      }

      toast.success("লগ আউট সফল হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <div
        role="status"
        aria-label="অ্যাকাউন্টের তথ্য লোড হচ্ছে"
        className="flex items-center gap-2"
      >
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="skeleton h-5 w-20 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <button
        type="button"
        onClick={() => refetch()}
        className="btn btn-ghost btn-sm"
      >
        অ্যাকাউন্ট আবার লোড করুন
      </button>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="btn btn-sm border-0 bg-green-700 text-white hover:bg-green-800 sm:btn-md"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const displayName = user.name || "ব্যবহারকারী";
  const initial = Array.from(displayName.trim())[0] || "ব";
  const showImage = user.image && failedImage !== user.image;

  return (
    <details className="dropdown dropdown-end">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg p-1 hover:bg-green-50 [&::-webkit-details-marker]:hidden">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-bold text-green-700">
          {showImage ? (
            <Image
              src={user.image}
              alt=""
              width={40}
              height={40}
              unoptimized
              onError={() => setFailedImage(user.image)}
              className="h-10 w-10 object-cover"
            />
          ) : (
            <span aria-hidden="true">{initial}</span>
          )}
        </span>

        <span className="max-w-28 truncate text-sm font-medium sm:max-w-40">
          {displayName}
        </span>

        <span aria-hidden="true" className="text-xs text-gray-500">
          ▾
        </span>
      </summary>

      <div className="dropdown-content z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
        <p className="truncate text-sm font-semibold">{displayName}</p>

        <p className="mt-1 break-all text-xs text-gray-500">{user.email}</p>

        <div className="my-3 border-t border-gray-100" />

        <Link
          href="/profile"
          onClick={(event) => {
            event.currentTarget.closest("details")?.removeAttribute("open");
          }}
          className="btn btn-ghost btn-sm mb-2 w-full justify-start"
        >
          আমার প্রোফাইল
        </Link>
        
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="btn btn-sm w-full border-0 bg-red-50 text-red-600 hover:bg-red-100"
        >
          {isLoggingOut && (
            <span
              aria-hidden="true"
              className="loading loading-spinner loading-sm"
            />
          )}

          {isLoggingOut ? "লগ আউট হচ্ছে..." : "লগ আউট"}
        </button>
      </div>
    </details>
  );
};

export default NavbarAuth;
