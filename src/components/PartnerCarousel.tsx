"use client";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Utility for conditional classnames

const PartnerCarousel = () => {
  const locale = useLocale();
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  // Update direction based on locale
  useEffect(() => {
    setDirection(locale === "ar" ? "rtl" : "ltr");
  }, [locale]);

  const partners = [
    { image: "/path/to/image1.jpg", title: "Partner 1" },
    { image: "/path/to/image2.jpg", title: "Partner 2" },
    { image: "/path/to/image3.jpg", title: "Partner 3" },
    { image: "/path/to/image4.jpg", title: "Partner 4" },
  ];

  return (
    <div className="w-full p-4">
      <div
        className={cn(
          "relative overflow-hidden",
          direction === "rtl" ? "rtl" : "ltr"
        )}
      >
        <div className="flex transition-transform duration-500 ease-in-out transform">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex-none w-[90%] sm:w-[40%] md:w-[30%] lg:w-[20%] mx-2 rounded-lg overflow-hidden relative group"
            >
              <img
                src={partner.image}
                alt={partner.title}
                className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                }}
              >
                <h3 className="text-white text-lg font-semibold">
                  {partner.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {/* Carousel navigation */}
        <button
          onClick={() => {
            const carousel = document.querySelector(".flex");
            carousel?.scrollBy({ left: 300, behavior: "smooth" });
          }}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            const carousel = document.querySelector(".flex");
            carousel?.scrollBy({ left: -300, behavior: "smooth" });
          }}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default PartnerCarousel;
