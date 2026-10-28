import Link from "next/link";
import BanglaDate from "./BanglaDate";
import { Suspense } from "react";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";

const Navbar = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav
        aria-label="প্রধান নেভিগেশন"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4"
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-2xl">
            🛒
          </span>

          <div>
            <p className="text-xl font-bold">বাজার দর</p>
            <BanglaDate />
          </div>
        </Link>

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
      </nav>
      <div className="border-t border-gray-100">
        <Suspense
          fallback={
            <div className="mx-auto flex max-w-6xl gap-2 overflow-hidden px-4 py-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton h-9 w-20 shrink-0 rounded-lg"
                />
              ))}
            </div>
          }
        >
          <CategoryNav />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <div className="border-t border-gray-100 px-4 py-2">
            <div className="skeleton h-4 w-full" />
          </div>
        }
      >
        <PriceTicker />
      </Suspense>
    </header>
  );
};

export default Navbar;
