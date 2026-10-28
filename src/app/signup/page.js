"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/SocialLogin";

const SignupPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (!name) {
            toast.error("আপনার নাম লিখুন।");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না।");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
                return;
            }

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
            router.replace("/signin");
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
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        বাজার দর-এ আপনাকে স্বাগতম
                    </p>
                </div>

                <form
                    onSubmit={handleSignup}
                    onInvalid={(event) => {
                        toast.error(event.target.validationMessage, {
                            id: "auth-validation",
                        });
                    }}
                    aria-busy={isLoading}
                    className="mt-6 space-y-4"
                >
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="আপনার নাম"
                            required
                            disabled={isLoading}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
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
                            autoComplete="new-password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            minLength={8}
                            maxLength={128}
                            required
                            disabled={isLoading}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="আবার পাসওয়ার্ড লিখুন"
                            minLength={8}
                            maxLength={128}
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

                        {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
                    </button>
                </form>
                <SocialLogin disabled={isLoading} />
                <p className="mt-6 text-center text-sm text-gray-600">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default SignupPage;