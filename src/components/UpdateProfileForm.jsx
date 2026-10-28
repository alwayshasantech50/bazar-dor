"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UpdateProfileForm = ({ currentName }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (isUpdating) return;

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();

    if (!name) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার নাম আপডেট হয়েছে!");
      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      onInvalid={(event) => {
        toast.error(event.target.validationMessage, {
          id: "profile-validation",
        });
      }}
      aria-busy={isUpdating}
      className="mt-6 space-y-5"
    >
      <div>
        <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium"
        >
          নাম
        </label>

        <input
          id="profile-name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={currentName}
          placeholder="আপনার নাম"
          required
          disabled={isUpdating}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isUpdating}
          className="btn border-0 bg-green-700 text-white hover:bg-green-800"
        >
          {isUpdating && (
            <span
              aria-hidden="true"
              className="loading loading-spinner loading-sm"
            />
          )}

          {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>

        <Link href="/profile" className="btn btn-ghost">
          ফিরে যান
        </Link>
      </div>
    </form>
  );
};

export default UpdateProfileForm;