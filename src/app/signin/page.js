"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/SocialLogin";
import LoginRequiredNotice from "@/components/LoginRequiredNotice";

const SigninPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignin = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email").trim();
        const password = formData.get("password");

        setIsLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "সাইন ইন করা যায়নি।");
                return;
            }

            toast.success("সাইন ইন সফল হয়েছে!");
            router.replace("/");
            router.refresh();
        } catch {
            toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="text-center">
                    <Link
                        href="/"
                        aria-label="বাজার দর হোম"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-2xl"
                    >
                        🛒
                    </Link>

                    <h1 className="mt-4 text-2xl font-bold">
                        সাইন ইন করুন
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন
                    </p>
                </div>

                <form
                    onSubmit={handleSignin}
                    onInvalid={(event) => {
                        toast.error(event.target.validationMessage, {
                            id: "auth-validation",
                        });
                    }}
                    aria-busy={isLoading}
                    className="mt-6 space-y-4"
                >
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="username"
                            placeholder="you@example.com"
                            required
                            disabled={isLoading}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="আপনার পাসওয়ার্ড"
                            required
                            disabled={isLoading}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn w-full border-0 bg-green-700 text-white hover:bg-green-800"
                    >
                        {isLoading && (
                            <span
                                aria-hidden="true"
                                className="loading loading-spinner loading-sm"
                            />
                        )}

                        {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                    </button>
                </form>
                <SocialLogin disabled={isLoading} />

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </section>
            <LoginRequiredNotice />
        </main>
    );
};

export default SigninPage;