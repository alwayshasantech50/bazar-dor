import Image from "next/image";

const PriceTicker = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <p className="px-4 py-2 text-center text-xs text-gray-500">
        বাজারের সর্বশেষ দাম লোড করা যায়নি।
      </p>
    );
  }

  const products = await response.json();
  const tickerProducts = products.slice(0, 10);

  if (tickerProducts.length === 0) {
    return null;
  }

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

  return (
    <section
      aria-label="বাজারের সর্বশেষ দাম"
      className="price-ticker overflow-hidden border-t border-gray-100 bg-white py-2"
    >
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 items-center"
          >
            {tickerProducts.map((product) => {
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

              const percentage = Math.abs(
                product.change.pct
              ).toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });

              const emojiImage = emojiImages[product.image];

              return (
                <li
                  key={product.id}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5 text-xs"
                >
                  {emojiImage ? (
                    <Image
                      src={emojiImage}
                      alt=""
                      width={18}
                      height={18}
                      unoptimized
                    />
                  ) : (
                    <span aria-hidden="true">{product.image}</span>
                  )}

                  <span>
                    {product.nameBn}{" "}
                    {product.today.toLocaleString("bn-BD")} টাকা/
                    {unitNames[product.unit] || product.unit}
                  </span>

                  <span className={`font-semibold ${changeColor}`}>
                    {changeIcon} {percentage}%
                  </span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
};

export default PriceTicker;