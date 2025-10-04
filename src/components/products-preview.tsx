"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { mockProducts, productCategories } from "@/lib/data/products";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";

export function ProductsPreview() {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("metal");

  // Auto-switch categories every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev === "metal" ? "non-metal" : "metal"));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Get products for the active category (4 products)
  const categoryProducts = mockProducts
    .filter((product) => product.category === activeCategory)
    .slice(0, 4);

  const activeCategoryData = productCategories.find(
    (cat) => cat.id === activeCategory
  );

  return (
    <section className="px-4 py-16 lg:py-24 relative overflow-hidden border-t dark-section-bg">
      {/* Page container */}
      <div className="container mx-auto grid gap-16 lg:gap-24">
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
                {locale === "en" ? "Our Products" : "منتجاتنا"}
              </span>
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl lg:text-5xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.25] text-center">
              {locale === "en"
                ? "Precision Cutting Systems for Every Need"
                : "أنظمة قطع دقيقة لكل الاحتياجات"}
            </h2>

            <div className="grid place-items-center">
              <p className="text-lg text-muted-foreground max-w-3xl text-center leading-relaxed">
                {locale === "en"
                  ? "Discover our range of cutting-edge industrial cutting systems designed for precision, efficiency, and reliability in demanding applications."
                  : "اكتشف مجموعتنا من أنظمة القطع الصناعية المتطورة المصممة للدقة والكفاءة والموثوقية في التطبيقات الصعبة."}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 bg-card/50 backdrop-blur-md rounded-xl p-1.5 border border-border/50 shadow-lg">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                  suppressHydrationWarning
                >
                  {activeCategory === category.id && (
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
                  <span className="relative z-10">
                    {locale === "en" ? category.name : category.nameAr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Products Display - 30% info / 70% images */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
              >
                {/* Left side - Info (30%) */}
                <div className="lg:col-span-3 flex flex-col justify-between order-2 lg:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="space-y-4 h-full flex flex-col"
                  >
                    <div className="flex-grow space-y-5">
                      <Badge className="bg-brand-primary text-white mb-3 text-sm">
                        {locale === "en"
                          ? activeCategoryData?.name
                          : activeCategoryData?.nameAr}
                      </Badge>

                      <h3 className="text-xl lg:text-2xl font-bold font-display mb-3">
                        {locale === "en"
                          ? `${activeCategoryData?.name} Cutting Solutions`
                          : `حلول قطع ${activeCategoryData?.nameAr}`}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                        {locale === "en"
                          ? `Advanced ${activeCategoryData?.name?.toLowerCase()} cutting systems designed for precision, efficiency, and reliability.`
                          : `أنظمة قطع ${activeCategoryData?.nameAr} متقدمة مصممة للدقة والكفاءة والموثوقية.`}
                      </p>

                      <div className="space-y-3">
                        {categoryProducts.slice(0, 2).map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 p-3 bg-card/30 rounded-lg"
                          >
                            <div className="w-14 h-14 relative rounded overflow-hidden bg-muted flex-shrink-0">
                              <Image
                                src={product.images[0]}
                                alt={
                                  locale === "en"
                                    ? product.name
                                    : product.nameAr
                                }
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm truncate">
                                {locale === "en"
                                  ? product.name
                                  : product.nameAr}
                              </h4>
                              <p className="text-sm text-muted-foreground truncate">
                                {locale === "en"
                                  ? product.description
                                  : product.descriptionAr}
                              </p>
                            </div>
                            {product.featured && (
                              <Star className="h-4 w-4 text-brand-primary flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
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
                        <span>
                          {locale === "en"
                            ? "View All Products"
                            : "عرض جميع المنتجات"}
                        </span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Right side - Images (70%) */}
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
                        className="group relative overflow-hidden rounded-lg bg-card/30 backdrop-blur-sm border border-border/50 w-full"
                      >
                        <div className="aspect-[4/3] relative w-full h-56">
                          <Image
                            src={product.images[0]}
                            alt={
                              locale === "en" ? product.name : product.nameAr
                            }
                            fill
                            sizes="(min-width: 1024px) 25vw, 45vw"
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Overlay with product info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <h4 className="text-white font-semibold text-xs mb-1 line-clamp-1">
                                {locale === "en"
                                  ? product.name
                                  : product.nameAr}
                              </h4>
                            </div>
                          </div>

                          {/* View details link */}
                          <Link
                            href={`/products/${product.slug}`}
                            className="absolute inset-0 z-10"
                            aria-label={
                              locale === "en"
                                ? `View details for ${product.name}`
                                : `عرض تفاصيل ${product.nameAr}`
                            }
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
