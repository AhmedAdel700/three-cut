"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import image1 from "@/app/assets/sample1.webp";
import image2 from "@/app/assets/sample2.webp";
import image3 from "@/app/assets/sample3.webp";

interface SampleItem {
  id: number;
  src: string | StaticImageData;
  thumbnail: string | StaticImageData;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
}

const sampleItems: SampleItem[] = [
  {
    id: 1,
    src: image1,
    thumbnail: image1,
    title: "Stainless Steel Nameplate (Laser-cut)",
    titleAr: "لوحة اسم من الستانلس (مقطوعة بالليزر)",
    category: "Laser Cutting",
    categoryAr: "القطع بالليزر",
    description:
      "Laser-cut stainless steel nameplate with deburred edges and clean internal corners.",
    descriptionAr:
      "لوحة اسم من الستانلس مقطوعة بالليزر بحواف مصقولة وزوايا داخلية نظيفة.",
  },
  {
    id: 2,
    src: image2,
    thumbnail: image2,
    title: "Thick Steel Bracket (Plasma-cut)",
    titleAr: "حامل فولاذي سميك (مقطوع بالبلازما)",
    category: "Plasma Cutting",
    categoryAr: "القطع بالبلازما",
    description:
      "Heavy-duty bracket cut from thick plate, suitable for industrial fixtures.",
    descriptionAr: "حامل قوي مقطوع من صفيحة سميكة، مناسب للتجهيزات الصناعية.",
  },
  {
    id: 3,
    src: image3,
    thumbnail: image3,
    title: "Marble Inlay Sample (Waterjet)",
    titleAr: "عينة تطعيم رخام (مقطوعة بالماء)",
    category: "Waterjet Cutting",
    categoryAr: "القطع بالماء",
    description:
      "Precision waterjet-cut marble inlay demonstrating tight fits and smooth edges.",
    descriptionAr:
      "تطعيم رخام مقطوع بدقة بالماء يظهر انطباقًا محكمًا وحوافًا ملساء.",
  },
  {
    id: 4,
    src: image3,
    thumbnail: image3,
    title: "Decorative Metal Screen Panel",
    titleAr: "لوح معدني ديكوري مُفرّغ",
    category: "Laser Cutting",
    categoryAr: "التكنولوجيا",
    description: "Laser-perforated decorative panel for interiors and façades.",
    descriptionAr: "لوح ديكوري مُفرّغ بالليزر للاستخدامات الداخلية والواجهات.",
  },
  {
    id: 5,
    src: image1,
    thumbnail: image2,
    title: "Acrylic Signage Letters",
    titleAr: "حروف إعلانية من الأكريليك",
    category: "Equipment",
    categoryAr: "المعدات",
    description:
      "CNC-cut acrylic letters with polished edges for premium signage.",
    descriptionAr:
      "حروف أكريليك مقطوعة بالـ CNC بحواف مصقولة ليافطات عالية الجودة.",
  },
  {
    id: 6,
    src: image1,
    thumbnail: image1,
    title: "Composite Gasket (Waterjet-cut)",
    titleAr: "جوان مركّب (مقطوع بالماء)",
    category: "Components",
    categoryAr: "المكونات",
    description:
      "Waterjet-cut gasket from composite sheet for sealing applications.",
    descriptionAr: "جوان مقطوع بالماء من خامة مركّبة لتطبيقات العزل والإحكام.",
  },
];

export function SamplesGallery() {
  const [selectedItem, setSelectedItem] = useState<SampleItem | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const locale = useLocale();

  const categories = [
    { id: "all", name: locale === "en" ? "All" : "الكل" },
    {
      id: "laser-cutting",
      name: locale === "en" ? "Laser Cutting" : "القطع بالليزر",
    },
    {
      id: "plasma-cutting",
      name: locale === "en" ? "Plasma Cutting" : "القطع بالبلازما",
    },
    {
      id: "waterjet-cutting",
      name: locale === "en" ? "Waterjet Cutting" : "القطع بالماء",
    },
  ];

  const filteredItems =
    filter === "all"
      ? sampleItems
      : sampleItems.filter(
          (item) => item.category.toLowerCase().replace(" ", "-") === filter
        );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="px-4 py-16 lg:py-24 relative overflow-hidden border-t dark-section-bg">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-16 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
            <span className="text-white uppercase tracking-wider text-base font-semibold">
              Samples of Our Work
            </span>
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight text-center">
            Precision Cutting Samples
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {locale === "en"
              ? "Explore material and product samples cut on our CNC/laser/waterjet systems—real parts, ready for use."
              : "استكشف عينات مواد ومنتجات مقطوعة بأنظمة CNC والليزر والقطع بالماء — قطع حقيقية جاهزة للاستخدام."}
          </p>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal
          className="flex flex-wrap justify-center gap-3 mb-12"
          delay={0.2}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  filter === category.id
                    ? "bg-gradient-to-r from-brand-primary to-brand-accent-red text-brand-neutral-white"
                    : "hover:bg-secondary hover:scale-105"
                )}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </ScrollReveal>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter} // re-animate when filter changes
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card
                className="h-full flex flex-col group cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm"
                onClick={() => setSelectedItem(item)}
              >
                {/* Media */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={locale === "en" ? item.title : item.titleAr}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-16 h-16 bg-brand-neutral-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-brand-neutral-white" />
                    </div>
                  </motion.div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-primary/90 text-brand-neutral-white">
                      {locale === "en" ? item.category : item.categoryAr}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-display mb-2">
                      {locale === "en" ? item.title : item.titleAr}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {locale === "en" ? item.description : item.descriptionAr}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="relative max-w-4xl max-h-[90vh] w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                  className="absolute -top-12 right-0 text-brand-neutral-white hover:bg-brand-neutral-white/10 z-10"
                >
                  <X className="h-6 w-6" />
                </Button>

                <div className="relative h-[70vh] rounded-2xl overflow-hidden">
                  <Image
                    src={selectedItem.src || "/placeholder.svg"}
                    alt={
                      locale === "en"
                        ? selectedItem.title
                        : selectedItem.titleAr
                    }
                    fill
                    className="object-contain"
                  />
                </div>

                <motion.div
                  className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 mt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-brand-primary text-brand-neutral-white">
                      {locale === "en"
                        ? selectedItem.category
                        : selectedItem.categoryAr}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3">
                    {locale === "en"
                      ? selectedItem.title
                      : selectedItem.titleAr}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? selectedItem.description
                      : selectedItem.descriptionAr}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
