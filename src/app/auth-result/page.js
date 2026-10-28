"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AuthResultPage = () => {
  const router = useRouter();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const finishLogin = async () => {
      const searchParams = new URLSearchParams(window.location.search);

      if (searchParams.has("failed") || searchParams.has("error")) {
        toast.error("সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
        router.replace("/signin");
        return;
      }

      try {
        const { data: session, error } = await authClient.getSession();

        if (error || !session) {
          toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
          router.replace("/signin");
          return;
        }

        toast.success("সাইন ইন সফল হয়েছে!");
        router.replace("/");
        router.refresh();
      } catch {
        toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        router.replace("/signin");
      }
    };

    finishLogin();
  }, [router]);

  return (
    <main
      aria-busy="true"
      aria-label="সাইন ইন যাচাই হচ্ছে"
      className="mx-auto max-w-md px-4 py-16"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p role="status" className="text-center text-sm text-gray-600">
          সাইন ইন যাচাই হচ্ছে...
        </p>

        <div className="skeleton mx-auto mt-6 h-12 w-12 rounded-full" />
        <div className="skeleton mx-auto mt-4 h-5 w-40" />
        <div className="skeleton mt-4 h-10 w-full" />
      </div>
    </main>
  );
};

export default AuthResultPage;