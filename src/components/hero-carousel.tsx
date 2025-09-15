"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";
import image1 from "@/app/assets/1.jpg"

import type { StaticImageData } from "next/image";

interface HeroSlide {
  id: number;
  image: string | StaticImageData;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  cta: string;
  ctaAr: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: image1,
    title: "Advanced Laser Cutting Technology",
    titleAr: "تقنية القطع بالليزر المتقدمة",
    subtitle:
      "Precision engineering meets industrial excellence with our state-of-the-art laser cutting systems.",
    subtitleAr:
      "الهندسة الدقيقة تلتقي بالتميز الصناعي مع أنظمة القطع بالليزر المتطورة.",
    cta: "Explore Laser Systems",
    ctaAr: "استكشف أنظمة الليزر",
    ctaLink: "/products?category=laser-cutting",
  },
  {
    id: 2,
    image: image1,
    title: "Heavy-Duty Plasma Cutting",
    titleAr: "القطع بالبلازما للخدمة الشاقة",
    subtitle:
      "Powerful plasma cutting solutions for the most demanding industrial applications and thick materials.",
    subtitleAr:
      "حلول قطع البلازما القوية للتطبيقات الصناعية الأكثر تطلباً والمواد السميكة.",
    cta: "View Plasma Systems",
    ctaAr: "عرض أنظمة البلازما",
    ctaLink: "/products?category=plasma-cutting",
  },
  {
    id: 3,
    image: image1,
    title: "Ultra-Precision Waterjet Cutting",
    titleAr: "القطع بالماء فائق الدقة",
    subtitle:
      "Achieve unmatched precision with our waterjet cutting systems for complex shapes and exotic materials.",
    subtitleAr:
      "حقق دقة لا مثيل لها مع أنظمة القطع بالماء للأشكال المعقدة والمواد الغريبة.",
    cta: "Discover Waterjet",
    ctaAr: "اكتشف القطع بالماء",
    ctaLink: "/products?category=waterjet-cutting",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const locale = useLocale();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Slides with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-neutral-dark/80 via-brand-neutral-dark/60 to-transparent z-10" />
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={locale === "en" ? slide.title : slide.titleAr}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content with Enhanced Animations */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex items-center"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              {heroSlides.map(
                (slide, index) =>
                  index === currentSlide && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <motion.h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <span
                          className="text-white drop-shadow-lg"
                          style={{
                            textShadow:
                              "0 0 20px rgba(242, 162, 58, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {locale === "en" ? slide.title : slide.titleAr}
                        </span>
                      </motion.h1>
                      <motion.p
                        className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {locale === "en" ? slide.subtitle : slide.subtitleAr}
                      </motion.p>
                      <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        <Button
                          asChild
                          size="lg"
                          className="bg-gradient-to-r from-brand-primary to-brand-accent-red hover:from-brand-primary/90 hover:to-brand-accent-red/90 text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300 hover:scale-105"
                        >
                          <a href={slide.ctaLink}>
                            {locale === "en" ? slide.cta : slide.ctaAr}
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="border-2 border-white/30 text-white hover:bg-white hover:text-brand-neutral-dark font-semibold px-8 py-6 text-lg rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-transparent"
                        >
                          <Link href="/contact">title</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
