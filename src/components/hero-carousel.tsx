"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/navigations";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import CallToAction from "./CallToAction";
import { Slider } from "@/app/types/homeApiTypes";

export function HeroCarousel({ heroData }: { heroData: Slider[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideChanged, setSlideChanged] = useState(false);

  const locale = useLocale();
  const t = useTranslations("home");
  const isRTL = locale === "ar";

  const SLIDE_TO_CONTENT_DELAY = 0.2;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setSlideChanged(true);
      setCurrent(api.selectedScrollSnap() + 1);

      setTimeout(() => {
        setSlideChanged(false);
      }, SLIDE_TO_CONTENT_DELAY * 2200);
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
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, api, current, count, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      className="relative min-h-screen lg:min-h-screen flex justify-center items-center max-w-full overflow-x-hidden pt-24 lg:pt-0"
      style={{
        background: `linear-gradient(135deg,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(48, 53, 59, 0.9) 25%,
          rgba(31, 35, 39, 0.95) 50%,
          rgba(176, 30, 30, 0.1) 75%,
          rgba(0, 0, 0, 0.98) 100%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CallToAction />

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(215, 35, 35, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(48, 53, 59, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center max-w-full">
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
              {heroData?.map((slide, index) => (
                <CarouselItem key={slide.id}>
                  <div className="flex flex-col xl:flex-row items-center justify-center gap-8 w-full min-h-[500px] lg:mt-20 xl:mt-0">
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
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight text-start"
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
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed text-start"
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
                        {slide.subtitle}
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
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="btn-outline !transition-colors !duration-[0.35s] !ease-in-out"
                        >
                          <Link href={`/products`} prefetch>
                            {t("readMore")}
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                      className="flex-1 flex justify-center overflow-visible -mt-5 sm:-mt-22 xl:-mt-0"
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
                          alt={slide.alt_image}
                          width={720}
                          height={500}
                          sizes="(min-width:1280px) 720px, (min-width:640px) 620px, 520px"
                          className="w-[400px] sm:w-[620px] xl:w-[720px] h-auto max-w-none object-contain shrink-0 select-none pointer-events-none"
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
        aria-label={t("prevSlide")}
      >
        {locale === "en" ? (
          <ChevronLeft className="h-6 w-6" />
        ) : (
          <ChevronRight className="h-6 w-6" />
        )}
      </button>

      <button
        onClick={isRTL ? prevSlide : nextSlide}
        className={cn(
          "hidden xl:flex absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110",
          isRTL ? "left-4 lg:left-8" : "right-4 lg:right-8"
        )}
        aria-label={t("nextSlide")}
      >
        {locale === "en" ? (
          <ChevronRight className="h-6 w-6" />
        ) : (
          <ChevronLeft className="h-6 w-6" />
        )}
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {heroData?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-1 w-8 rounded-sm transition-all duration-300",
              index === current - 1
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`${t("goToSlide")} ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
