"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import logo1 from "@/app/assets/img1.png";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export function PartnerCarousel() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [api, setApi] = useState<CarouselApi>();

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300, 600], [1, 0.98, 0.96]);

  const partners = Array.from({ length: 10 }).map((_, i) => ({
    image: logo1,
    title: `Partner ${i + 1}`,
  }));

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <motion.section className="pt-40" style={{ scale }}>
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          className="text-center mb-12 flex flex-col gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <Sparkles className="h-6 w-6 text-brand-accent-red" />
            <span className="text-brand-accent-light uppercase tracking-wider text-sm font-semibold">
              {locale === "en" ? "Our Partners" : "شركاؤنا"}
            </span>
            <Sparkles className="h-6 w-6 text-brand-accent-red" />
          </motion.div>

          <motion.h2
            className="text-3xl lg:text-5xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our Trusted Partners For Growth And Innovation
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-xl mx-auto capitalize"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Chosen by forward-thinking companies worldwide to accelerate growth
            and unlock new opportunities.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              direction: isRTL ? "rtl" : "ltr",
              slidesToScroll: 3,
            }}
          >
            <CarouselContent className="-ms-2 md:-ms-4">
              {partners.map((partner, index) => (
                <CarouselItem
                  key={index}
                  className="ps-2 md:ps-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                  // ✅ 5 items per row at large screen
                >
                  <div className="h-32 rounded-xl flex items-center justify-center p-6 transition-all duration-300">
                    <Image
                      src={partner.image}
                      alt={partner.title}
                      width={120}
                      height={80}
                      className="object-contain max-w-full max-h-full brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </motion.section>
  );
}
