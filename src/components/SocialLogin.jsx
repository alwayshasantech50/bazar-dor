"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SocialLogin = ({ disabled = false }) => {
  const [pendingProvider, setPendingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    if (pendingProvider || disabled) return;

    setPendingProvider(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/auth-result",
        errorCallbackURL: "/auth-result?failed=1",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।");
        setPendingProvider(null);
      }
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setPendingProvider(null);
    }
  };

  const isDisabled = disabled || pendingProvider !== null;

  return (
    <div className="mt-6">
      <div className="divider text-xs text-gray-500">
        অথবা
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => handleSocialLogin("google")}
          className="btn btn-outline w-full border-gray-300"
        >
          {pendingProvider === "google" && (
            <span
              aria-hidden="true"
              className="loading loading-spinner loading-sm"
            />
          )}

          {pendingProvider === "google"
            ? "অপেক্ষা করুন..."
            : "Google দিয়ে"}
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={() => handleSocialLogin("github")}
          className="btn w-full border-0 bg-gray-900 text-white hover:bg-gray-800"
        >
          {pendingProvider === "github" && (
            <span
              aria-hidden="true"
              className="loading loading-spinner loading-sm"
            />
          )}

          {pendingProvider === "github"
            ? "অপেক্ষা করুন..."
            : "GitHub দিয়ে"}
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;