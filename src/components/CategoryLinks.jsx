"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryLinks = ({ categories }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের বিভাগ"
      className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3"
    >
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            {category.slug === "dal" ? (
              <Image
                src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fad8.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
              />
            ) : (
              <span
                aria-hidden="true"
                style={{
                  fontFamily:
                    '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                }}
              >
                {category.icon}
              </span>
            )}

            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryLinks;