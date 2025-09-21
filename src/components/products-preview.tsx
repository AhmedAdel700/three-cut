"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { mockProducts } from "@/lib/data/products";
import { useLocale } from "next-intl";

export function ProductsPreview() {
  const locale = useLocale();

  // Prefer featured, then fill with non-featured to make 3
  const featured = mockProducts.filter((p) => p.featured);
  const nonFeatured = mockProducts.filter((p) => !p.featured);
  const featuredProducts = [...featured, ...nonFeatured].slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

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

        {/* Featured Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card
                className={[
                  // Equal height cards
                  "h-full min-h-[440px] grid grid-rows-[auto,1fr] overflow-hidden",
                  // Keep lift + shadow on hover, but remove any border change
                  "group hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2",
                  "border border-border/50 hover:border-transparent bg-card/50 backdrop-blur-sm !p-0 !pb-4",
                ].join(" ")}
              >
                {/* Image block (top, full-width, consistent height) */}
                <div className="relative z-0 w-full h-48 md:h-56 lg:h-56 overflow-hidden">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={locale === "en" ? product.name : product.nameAr}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Make overlay non-blocking so links beneath stay clickable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

                  {/* Featured badge */}
                  {product.featured && (
                    <motion.div
                      className="absolute"
                      style={{ top: 16, left: 16 }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-brand-primary text-brand-neutral-white flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {locale === "en" ? "Featured" : "مميز"}
                      </Badge>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="relative z-10 flex flex-col gap-4">
                  <div className="flex">
                    <Badge variant="secondary" className="text-xs">
                      {locale === "en"
                        ? product.category
                            .replace("-", " ")
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())
                        : product.categoryAr}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-display">
                    {locale === "en" ? product.name : product.nameAr}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {locale === "en"
                      ? product.description
                      : product.descriptionAr}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Price or Contact link */}
                    <Link
                      prefetch
                      href="/contact"
                      className="text-sm font-medium text-brand-accent-red"
                    >
                      {locale === "en" ? "Contact for pricing" : "اتصل للسعر"}
                    </Link>

                    {/* Details button (guard missing slug so first card is always clickable if valid) */}
                    {product.slug ? (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="hover:bg-transparent hover:text-inherit focus-visible:ring-0"
                      >
                        <Link
                          prefetch
                          href={`/products/${product.slug}`}
                          className="flex items-center gap-2"
                        >
                          <span>
                            {locale === "en" ? "View Details" : "عرض التفاصيل"}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        {locale === "en" ? "View Details" : "عرض التفاصيل"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <ScrollReveal>
          <div className="grid place-items-center -mt-5 lg:-mt-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-brand-neutral-white font-semibold rounded-2xl"
              >
                <Link href="/products" className="flex items-center gap-2">
                  <span>{locale === "en" ? "View All" : "عرض الكل"}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
