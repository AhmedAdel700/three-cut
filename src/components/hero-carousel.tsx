"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import image1 from "@/app/assets/img1.png";
import image2 from "@/app/assets/img5.png";
import image3 from "@/app/assets/img4.png";
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
    image: image2,
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
    image: image3,
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideChanged, setSlideChanged] = useState(false);
  const locale = useLocale();
  const isRTL = locale === "ar";

  const SLIDE_TO_CONTENT_DELAY = 0.42;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setSlideChanged(true);
      setCurrent(api.selectedScrollSnap() + 1);

      setTimeout(() => {
        setSlideChanged(false);
      }, SLIDE_TO_CONTENT_DELAY * 1000);
    });
  }, [api]);

  const nextSlide = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const prevSlide = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const goToSlide = useCallback(
    (index: number) => {
      if (api) api.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    if (!isAutoPlaying || !api) return;
    const interval = setInterval(() => {
      if (current === count) {
        api.scrollTo(0);
      } else {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, api, current, count, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden pt-3"
      style={{
        background: `linear-gradient(135deg,
      var(--color-red-lighter) 0%,
      var(--color-red-dark) 40%,
      var(--color-black) 100%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6 w-full">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={slide.id}>
                  <div className="flex flex-col xl:flex-row items-center justify-center gap-8 w-full min-h-[500px]">
                    {/* Text */}
                    <motion.div
                      className="max-w-2xl flex-1 text-center xl:text-left"
                      key={`text-${slide.id}-${current}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={
                        slideChanged
                          ? { opacity: 0, y: 50 }
                          : { opacity: 1, y: 0 }
                      }
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: slideChanged ? 0 : 0,
                      }}
                    >
                      <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                          slideChanged
                            ? { opacity: 0, y: 30 }
                            : { opacity: 1, y: 0 }
                        }
                        transition={{
                          duration: 0.8,
                          delay: slideChanged ? 0 : 0.05,
                        }}
                      >
                        {locale === "en" ? slide.title : slide.titleAr}
                      </motion.h1>
                      <motion.p
                        className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                          slideChanged
                            ? { opacity: 0, y: 30 }
                            : { opacity: 1, y: 0 }
                        }
                        transition={{
                          duration: 0.8,
                          delay: slideChanged ? 0 : 0.1,
                        }}
                      >
                        {locale === "en" ? slide.subtitle : slide.subtitleAr}
                      </motion.p>
                      <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start"
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                          slideChanged
                            ? { opacity: 0, y: 30 }
                            : { opacity: 1, y: 0 }
                        }
                        transition={{
                          duration: 0.8,
                          delay: slideChanged ? 0 : 0.15,
                        }}
                      >
                        <Button asChild size="lg" className="btn-primary">
                          <a href={slide.ctaLink}>
                            {locale === "en" ? slide.cta : slide.ctaAr}
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="btn-outline"
                        >
                          <Link href="/contact">Contact Us</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                    {/* Image */}
                    <motion.div
                      className="flex-1 flex justify-center overflow-visible"
                      key={`image-${slide.id}-${current}`}
                      initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                      animate={
                        slideChanged
                          ? { opacity: 0, x: isRTL ? -50 : 50 }
                          : { opacity: 1, x: 0 }
                      }
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: slideChanged ? 0 : 0.08,
                      }}
                    >
                      <motion.div
                        className="shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={locale === "en" ? slide.title : slide.titleAr}
                          width={720}
                          height={500}
                          sizes="(min-width:1280px) 720px, (min-width:640px) 620px, 520px"
                          className="w-[425px] sm:w-[620px] xl:w-[720px] h-auto max-w-none object-contain shrink-0 select-none pointer-events-none"
                          priority={index === 0}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={isRTL ? nextSlide : prevSlide}
        className={cn(
          "hidden xl:flex absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110",
          isRTL ? "right-4 lg:right-8" : "left-4 lg:left-8"
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={isRTL ? prevSlide : nextSlide}
        className={cn(
          "hidden xl:flex absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110",
          isRTL ? "left-4 lg:left-8" : "right-4 lg:right-8"
        )}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-1 w-8 rounded-sm transition-all duration-300",
              index === current - 1
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
