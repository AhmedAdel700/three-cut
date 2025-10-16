"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useTranslations } from "next-intl";
import { Services } from "@/app/types/homeApiTypes";
import Image from "next/image";

export function ServicesSection({ servicesData }: { servicesData: Services }) {
  const t = useTranslations("home");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden border-t dark-section-bg">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-brand-accent-red/5 rounded-full blur-xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-brand-tertiary/5 rounded-full blur-xl"
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10 flex flex-col gap-10 lg:gap-16">
        {/* Header */}
        <ScrollReveal className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
            <span className="text-white uppercase tracking-wider text-base font-semibold">
              {servicesData.title || t("services.title")}
            </span>
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.3] mb-3">
            {servicesData.short_desc || t("services.heading")}
          </h2>

          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("services.description")}
          </p>
        </ScrollReveal>

        {/* Services List */}
        <motion.div
          className="flex flex-col gap-8 md:gap-12 xl:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.data.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } group`}
            >
              {/* Text Side */}
              <div className="flex-1 flex flex-col gap-6 text-center lg:text-start">
                {/* Icon & Number */}
                <div className="flex items-center justify-start sm:justify-center lg:justify-start gap-6">
                  <motion.div
                    className="relative w-16 h-16 lg:w-20 lg:h-20"
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, -2, 2, 0],
                      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="relative w-full h-full bg-gradient-to-br from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-2xl flex items-center justify-center">
                      {service.icon && (
                        <Image
                          src={service.icon}
                          alt={service.alt_icon || service.name}
                          width={40}
                          height={40}
                          className="object-contain text-brand-neutral-white drop-shadow-lg"
                        />
                      )}
                    </div>
                  </motion.div>

                  <span className="text-4xl lg:text-6xl font-bold text-brand-accent-red/30 font-display">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-6 w-full text-start">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-display text-brand-accent-light transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg text-gray-300 transition-colors duration-300 max-w-2xl mx-auto lg:mx-0">
                    {service.short_desc}
                  </p>
                </div>

                {/* Long Description */}
                {service.long_desc && (
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-2xl">
                    {service.long_desc}
                  </p>
                )}
              </div>

              {/* Image Side */}
              <div className="flex-1 flex justify-center w-full">
                <motion.div
                  className="w-full h-44 xl:w-full xl:h-80 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 rounded-3xl border border-brand-accent-red/20 flex items-center justify-center group-hover:border-brand-accent-red/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-accent-red/5 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-red/5 via-transparent to-brand-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={service.image}
                    alt={service.alt_image || service.name}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full rounded-3xl"
                  />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <ScrollReveal className="text-center mt-16 lg:mt-20" delay={0.6}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-white font-semibold px-8 rounded-2xl"
            >
              <Link href="/services">{t("services.moreServices")}</Link>
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
