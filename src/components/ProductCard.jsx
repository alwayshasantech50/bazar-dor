import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const unitNames = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  // Use images for emojis that some devices cannot display.
  const emojiImages = {
    "🫘": "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fad8.svg",
    "🫙": "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fad9.svg",
    "🫚": "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1fada.svg",
  };

  const emojiImage = emojiImages[product.image];

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  let badgeColor = "bg-gray-100 text-gray-600";
  let changeIcon = "—";

  if (isUp) {
    badgeColor = "bg-green-50 text-green-600";
    changeIcon = "▲";
  } else if (isDown) {
    badgeColor = "bg-red-50 text-red-600";
    changeIcon = "▼";
  }

  const price = product.today.toLocaleString("bn-BD");

  const percentage = Math.abs(product.change.pct).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-3xl">
          {emojiImage ? (
            <Image
              src={emojiImage}
              alt={product.nameBn}
              width={32}
              height={32}
              unoptimized
            />
          ) : (
            <span
              role="img"
              aria-label={product.nameBn}
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
          <h3 className="font-bold">{product.nameBn}</h3>

          <p className="mt-1 text-sm text-gray-500">
            প্রতি {unitNames[product.unit] || product.unit}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-1">
            <span className="text-xl font-bold">{price}</span>
            <span className="ml-1 text-sm">টাকা</span>
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {changeIcon} {percentage}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;