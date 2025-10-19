"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Projects } from "@/app/types/homeApiTypes";

export function SamplesGallery({ projects }: { projects: Projects }) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const t = useTranslations("home");
  const locale = useLocale();

  const allProjects = projects?.data || [];

  const categories = [
    { id: "all", name: t("all") },
    ...Array.from(new Set(allProjects.map((p) => p.alt_icon))).map((cat) => ({
      id: cat?.toLowerCase().replace(/\s+/g, "-") || "",
      name: cat || "",
    })),
  ];

  const filteredItems =
    filter === "all"
      ? allProjects
      : allProjects.filter(
          (item) => item.alt_icon?.toLowerCase().replace(/\s+/g, "-") === filter
        );

  const selectedProject = allProjects.find((p) => p.id === selectedItem);

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
        <ScrollReveal className="text-center mb-16 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
            <span className="text-white uppercase tracking-wider text-base font-semibold">
              {t("section_title")}
            </span>
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.25] text-center">
            {projects?.title}
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {projects?.short_desc}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="h-full flex"
            >
              <Card
                className="!pt-0 h-full w-full flex flex-col group cursor-pointer overflow-hidden 
        hover:shadow-2xl hover:shadow-brand-primary/10 
        transition-all duration-500 hover:-translate-y-2 
        border-border/50 bg-card/50 backdrop-blur-sm"
                onClick={() => setSelectedItem(item.id)}
              >
                {/* Media */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  />

                  {/* Search icon */}
                  <div
                    className="absolute inset-0 hidden xl:flex items-center justify-center 
            opacity-0 group-hover:opacity-100 
            transition-all duration-500 ease-in-out"
                  >
                    <div
                      className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full 
              flex items-center justify-center transform scale-90 
              group-hover:scale-100 transition-transform duration-500 ease-in-out"
                    >
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div
                    className={`absolute top-3 ${
                      locale === "en" ? "left-3" : "right-3"
                    } bg-red-500 rounded-lg`}
                  >
                    <Badge className="bg-brand-primary/90 text-white text-xs px-2 py-0.5">
                      {item.alt_icon || t("category")}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between min-h-[100px]">
                  <div>
                    <h3 className="text-sm font-bold font-display mb-2">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                      {item.short_desc}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="hidden xl:flex fixed inset-0 z-50 bg-black/60 backdrop-blur-sm items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="relative bg-black rounded-xl shadow-2xl w-full max-w-2xl lg:max-w-5xl max-h-[80vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 text-white">
                  <Badge className="bg-brand-primary text-white">
                    {selectedProject.alt_icon}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-col lg:flex-row">
                  <div className="relative h-64 lg:h-80 lg:flex-1 flex items-center justify-center">
                    <Image
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="p-4 space-y-3 lg:flex-1 lg:flex lg:flex-col lg:justify-start">
                    <h3 className="text-lg lg:text-xl font-bold text-white">
                      {selectedProject.name}
                    </h3>
                    <p className="text-sm lg:text-base text-white leading-relaxed">
                      {selectedProject.long_desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
