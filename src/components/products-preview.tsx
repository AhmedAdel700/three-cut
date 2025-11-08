"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import { Categories } from "@/app/types/homeApiTypes";

export function ProductsPreview({ categories }: { categories: Categories }) {
  const t = useTranslations("home");
  const locale = useLocale();

  const categoryList = useMemo(() => categories?.data || [], [categories]);

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    categoryList.length > 0 ? categoryList[0].id : null
  );

  useEffect(() => {
    if (categoryList.length < 2) return;
    const interval = setInterval(() => {
      setActiveCategoryId((prevId) => {
        const currentIndex = categoryList.findIndex((cat) => cat.id === prevId);
        const nextIndex =
          currentIndex === categoryList.length - 1 ? 0 : currentIndex + 1;
        return categoryList[nextIndex].id;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, [categoryList]);

  const activeCategory = categoryList.find(
    (cat) => cat.id === activeCategoryId
  );
  const categoryProducts = activeCategory?.products?.slice(0, 4) || [];

  return (
    <section className="px-4 py-16 lg:py-24 relative overflow-hidden border-t dark-section-bg">
      <div className="container mx-auto grid gap-16 lg:gap-8">
        {/* Header */}
        <ScrollReveal>
          <div className="grid place-items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
              <span className="text-white uppercase tracking-wider text-base font-semibold">
                {t("ourProducts")}
              </span>
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.25] text-center">
              {t("productsTitle")}
            </h2>

            <div className="grid place-items-center">
              <p className="text-lg text-muted-foreground max-w-3xl text-center leading-relaxed">
                {t("productsDesc")}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 bg-card/50 backdrop-blur-[4px] rounded-xl p-1.5 border border-border/50 shadow-lg">
              {categoryList.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`relative px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    activeCategoryId === category.id
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  suppressHydrationWarning
                >
                  {activeCategoryId === category.id && (
                    <motion.div
                      layoutId="categoryBg"
                      className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-accent-red rounded-lg"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Products Display */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryId}
                className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
              >
                {/* Left side - Info */}
                <div className="lg:col-span-3 flex flex-col justify-between order-2 lg:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="space-y-4 h-full flex flex-col"
                  >
                    <div>
                      <h3
                        className="text-xl lg:text-3xl xl:text-4xl font-bold font-display my-3"
                        dangerouslySetInnerHTML={{
                          __html: activeCategory?.name ?? "",
                        }}
                      >
                      </h3>

                      <p
                        className="text-muted-foreground leading-relaxed mb-4 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: activeCategory?.long_desc ?? "",
                        }}
                      ></p>
                    </div>

                    <Button
                      asChild
                      size="default"
                      className="w-full bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-white font-semibold rounded-lg text-sm h-11 mt-5"
                    >
                      <Link
                        href="/products"
                        className="flex items-center justify-center gap-1"
                      >
                        <span>{t("viewAllProducts")}</span>
                        {locale === "en" ? (
                          <ArrowRight className="h-3 w-3" />
                        ) : (
                          <ArrowLeft className="h-3 w-3" />
                        )}
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Right side - Images */}
                <div className="lg:col-span-7 flex items-stretch justify-center order-1 lg:order-2">
                  <motion.div
                    className="grid grid-cols-2 gap-4 max-w-3xl w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {categoryProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="group relative overflow-hidden rounded-lg bg-card/30 backdrop-blur-[2px] border border-border/50 w-full"
                      >
                        <div className="aspect-[4/3] relative w-full h-56">
                          <Image
                            src={product.image || "/placeholder.png"}
                            alt={product.name}
                            fill
                            sizes="(min-width: 1024px) 25vw, 45vw"
                            className="object-cover p-4 group-hover:scale-105 transition-transform duration-500"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <h4 className="text-black/80 font-semibold text-base m-2 line-clamp-1">
                                {product.name}
                              </h4>
                            </div>
                          </div>

                          <Link
                            href={`/products/${product.slug}`}
                            className="absolute inset-0 z-10"
                            aria-label={`View details for ${product.name}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
