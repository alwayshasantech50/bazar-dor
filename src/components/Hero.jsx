import Image from "next/image";

const Hero = () => {
  return (
    <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="w-full md:w-2/3">
          <p className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            প্রতিদিনের বাজারের খবর
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম— বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn btn-sm mt-6 border-0 bg-green-700 text-white hover:bg-green-800 sm:btn-md"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex w-full items-center justify-center md:w-1/3">
          <Image
            src="/images/bazar-hero.png"
            alt="তাজা ফল ও সবজিতে ভরা বাজারের ঝুড়ি"
            width={320}
            height={260}
            className="h-auto w-56 object-contain lg:w-72"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
