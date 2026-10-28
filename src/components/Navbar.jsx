import Link from "next/link";
import BanglaDate from "./BanglaDate";

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
          <Link
            href="/signin"
            className="btn btn-ghost btn-sm sm:btn-md"
          >
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
    </header>
  );
};

export default Navbar;