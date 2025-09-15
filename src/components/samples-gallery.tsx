"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import image from "@/app/assets/1.jpg";
interface SampleItem {
  id: number;
  type: "image" | "video";
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
    type: "image",
    src: image,
    thumbnail: image,
    title: "Precision Laser Cut Components",
    titleAr: "مكونات مقطوعة بالليزر بدقة",
    category: "Laser Cutting",
    categoryAr: "القطع بالليزر",
    description:
      "High-precision automotive parts cut with fiber laser technology",
    descriptionAr: "قطع غيار السيارات عالية الدقة مقطوعة بتقنية الليزر الليفي",
  },
  {
    id: 2,
    type: "image",
    src: image,
    thumbnail: image,
    title: "Heavy-Duty Plasma Cutting",
    titleAr: "القطع بالبلازما للخدمة الشاقة",
    category: "Plasma Cutting",
    categoryAr: "القطع بالبلازما",
    description: "Thick steel plates cut with high-amperage plasma system",
    descriptionAr: "ألواح فولاذية سميكة مقطوعة بنظام البلازما عالي الأمبير",
  },
  {
    id: 3,
    type: "image",
    src: image,
    thumbnail: image,
    title: "Waterjet Precision Samples",
    titleAr: "عينات دقة القطع بالماء",
    category: "Waterjet Cutting",
    categoryAr: "القطع بالماء",
    description:
      "Complex geometries achieved with ultra-high pressure waterjet",
    descriptionAr: "أشكال هندسية معقدة تم تحقيقها بالقطع بالماء عالي الضغط",
  },
  {
    id: 4,
    type: "image",
    src: image,
    thumbnail: image,
    title: "Advanced Control Systems",
    titleAr: "أنظمة التحكم المتقدمة",
    category: "Technology",
    categoryAr: "التكنولوجيا",
    description: "State-of-the-art CNC control panels for precision operation",
    descriptionAr: "لوحات تحكم CNC متطورة للتشغيل الدقيق",
  },
  {
    id: 5,
    type: "image",
    src: image,
    thumbnail: image,
    title: "Industrial Cutting Tables",
    titleAr: "طاولات القطع الصناعية",
    category: "Equipment",
    categoryAr: "المعدات",
    description:
      "Heavy-duty cutting tables designed for high-volume production",
    descriptionAr: "طاولات قطع للخدمة الشاقة مصممة للإنتاج عالي الحجم",
  },
  {
    id: 6,
    type: "image",
    src: image,
    thumbnail: image,
    title: "Waterjet Cutting Head Detail",
    titleAr: "تفاصيل رأس القطع بالماء",
    category: "Components",
    categoryAr: "المكونات",
    description: "Close-up view of precision waterjet cutting head assembly",
    descriptionAr: "عرض مقرب لتجميع رأس القطع بالماء الدقيق",
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
    { id: "technology", name: locale === "en" ? "Technology" : "التكنولوجيا" },
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
      transition: {
        staggerChildren: 0.1,
      },
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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-brand-primary to-brand-accent-red bg-clip-text text-transparent">
            {locale === "en" ? "Samples of Our Work" : "عينات من أعمالنا"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {locale === "en"
              ? "Explore our portfolio of precision cutting projects showcasing the quality and capabilities of our advanced cutting systems."
              : "استكشف محفظة مشاريع القطع الدقيقة التي تعرض جودة وقدرات أنظمة القطع المتقدمة لدينا."}
          </p>
        </ScrollReveal>

        {/* Filter Buttons with Animation */}
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
                    ? "bg-gradient-to-r from-brand-primary to-brand-accent-red text-white"
                    : "hover:bg-secondary hover:scale-105"
                )}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </ScrollReveal>

        {/* Gallery Grid with Enhanced Animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter} // Re-animate when filter changes
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card
                className="group cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={locale === "en" ? item.title : item.titleAr}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.type === "video" ? (
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </motion.div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-primary/90 text-white">
                      {locale === "en" ? item.category : item.categoryAr}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold font-display mb-2 group-hover:text-brand-primary transition-colors">
                    {locale === "en" ? item.title : item.titleAr}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {locale === "en" ? item.description : item.descriptionAr}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Lightbox Modal */}
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
                  className="absolute -top-12 right-0 text-white hover:bg-white/10 z-10"
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
                    <Badge className="bg-brand-primary text-white">
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
