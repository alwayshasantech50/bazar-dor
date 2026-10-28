import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const unitNames = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const emojiImages = {
  "🫘": "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fad8.svg",
  "🫙": "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fad9.svg",
  "🫚": "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1fada.svg",
};

const formatNumber = (value) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const ProductDetailsPage = async ({ params }) => {
  const { slug } = await params;

  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const products = await response.json();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];
  const unit = unitNames[product.unit] || product.unit;
  const emojiImage = emojiImages[product.image];

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  let changeColor = "text-gray-500";
  let changeIcon = "—";

  if (isUp) {
    changeColor = "text-green-600";
    changeIcon = "▲";
  } else if (isDown) {
    changeColor = "text-red-600";
    changeIcon = "▼";
  }

  const percentage = Math.abs(product.change.pct).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const priceDifference = product.today - product.yesterday;

  let changeDescription = "গতকালের তুলনায় আজ দাম অপরিবর্তিত।";

  if (priceDifference > 0) {
    changeDescription = `গতকালের তুলনায় আজ দাম বেড়েছে ${formatNumber(
      priceDifference
    )} টাকা।`;
  } else if (priceDifference < 0) {
    changeDescription = `গতকালের তুলনায় আজ দাম কমেছে ${formatNumber(
      Math.abs(priceDifference)
    )} টাকা।`;
  }

  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : null;

  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : null;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : null;

  const summaryCards = [
    {
      label: "সর্বনিম্ন দাম",
      value: lowestPrice,
      color: "text-green-600",
      description: "বাজারে পাওয়া সর্বনিম্ন দাম",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: highestPrice,
      color: "text-red-600",
      description: "বাজারে পাওয়া সর্বোচ্চ দাম",
    },
    {
      label: "গড় দাম",
      value: averagePrice,
      color: "text-green-700",
      description: "প্রতি বাজারের মধ্যমূল্যের গড়",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="ব্রেডক্রাম্ব" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-green-700">
              হোম
            </Link>
          </li>

          <li aria-hidden="true">›</li>

          <li>
            <Link
              href={`/category/${product.category}`}
              className="hover:text-green-700"
            >
              {product.categoryNameBn}
            </Link>
          </li>

          <li aria-hidden="true">›</li>

          <li aria-current="page" className="text-gray-700">
            {product.nameBn}
          </li>
        </ol>
      </nav>

      <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f1] text-4xl">
            {emojiImage ? (
              <Image
                src={emojiImage}
                alt=""
                width={40}
                height={40}
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
                {product.image}
              </span>
            )}
          </span>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি {unit} · {product.categoryNameBn}
            </p>

            <p className="mt-2 text-sm text-gray-700">
              {changeDescription}
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-2xl bg-[#f0f5f1] px-6 py-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-3xl font-bold">
            {formatNumber(product.today)}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            টাকা / {unit}
          </p>

          <p className={`mt-2 text-sm font-semibold ${changeColor}`}>
            {changeIcon} {percentage}%
          </p>
        </div>
      </section>

      <section
        aria-labelledby="price-summary"
        className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
      >
        <h2 id="price-summary" className="text-lg font-bold">
          দামের সারসংক্ষেপ
        </h2>

        {markets.length > 0 ? (
          <>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-gray-200 p-4"
                >
                  <h3 className="text-sm text-gray-600">
                    {card.label}
                  </h3>

                  <p className={`mt-2 text-xl font-bold ${card.color}`}>
                    {formatNumber(card.value)} টাকা
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <h2
              id="market-prices"
              className="mb-4 mt-6 text-lg font-bold"
            >
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table
                aria-labelledby="market-prices"
                className="w-full min-w-[560px] text-left text-sm"
              >
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      বাজার
                    </th>

                    <th scope="col" className="px-4 py-3 font-medium">
                      বিভাগ
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-medium"
                    >
                      সর্বনিম্ন
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-medium"
                    >
                      সর্বোচ্চ
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-medium"
                    >
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market) => (
                    <tr
                      key={`${market.division}-${market.market}`}
                      className="border-t border-gray-200 even:bg-[#f0f5f1]"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-normal"
                      >
                        {market.market}
                      </th>

                      <td className="px-4 py-3">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        {formatNumber(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        {formatNumber(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                        {formatNumber((market.min + market.max) / 2)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              সব দাম প্রতি {unit}। গড় দাম সর্বনিম্ন ও সর্বোচ্চ দামের
              মধ্যমূল্য থেকে হিসাব করা হয়েছে।
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না।
          </p>
        )}
      </section>
    </main>
  );
};

export default ProductDetailsPage;