"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { mockProducts } from "@/lib/data/products";
import { useLocale } from "next-intl";

export function ProductsPreview() {
  const locale = useLocale();

  const featuredProducts = mockProducts
    .filter((product) => product.featured)
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-brand-primary to-brand-accent-red bg-clip-text text-transparent">
            title
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {locale === "en"
              ? "Discover our range of cutting-edge industrial cutting systems designed for precision, efficiency, and reliability in demanding applications."
              : "اكتشف مجموعتنا من أنظمة القطع الصناعية المتطورة المصممة للدقة والكفاءة والموثوقية في التطبيقات الصعبة."}
          </p>
        </ScrollReveal>

        {/* Featured Products Grid with Enhanced Animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="group hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={locale === "en" ? product.name : product.nameAr}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-dark/60 to-transparent" />
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    <Badge className="bg-brand-primary text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {locale === "en" ? "Featured" : "مميز"}
                    </Badge>
                  </motion.div>
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {locale === "en"
                        ? product.category
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        : product.categoryAr}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-display mb-3 transition-colors flex-grow">
                    {locale === "en" ? product.name : product.nameAr}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {locale === "en"
                      ? product.description
                      : product.descriptionAr}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-brand-accent-red">
                      {product.price ||
                        (locale === "en"
                          ? "Contact for pricing"
                          : "اتصل للسعر")}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-brand-accent-red/10 group-hover:text-brand-accent-red transition-colors"
                      >
                        <Link href={`/products/${product.slug}`}>
                          {locale === "en" ? "View Details" : "عرض التفاصيل"}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA with Enhanced Animation */}
        <ScrollReveal className="text-center" delay={0.4}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-white font-semibold px-8 rounded-2xl"
            >
              <Link href="/products">
                View All
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
