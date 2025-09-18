"use client";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";
import { services } from "@/lib/data/services";

export function ServicesPage() {
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="min-h-screen border-b">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 text-brand-neutral-white relative overflow-hidden section-bg">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
              {locale === "en" ? "Our Services" : "خدماتنا"}
            </h1>
            <p className="text-lg lg:text-xl text-brand-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
              {locale === "en"
                ? "Comprehensive cutting solutions designed to meet the diverse needs of modern industrial operations with precision, efficiency, and reliability."
                : "حلول قطع شاملة مصممة لتلبية الاحتياجات المتنوعة للعمليات الصناعية الحديثة بدقة وكفاءة وموثوقية."}
            </p>
          </div>
        </div>
      </section>

      {/* Services Content Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden border-t dark-section-bg">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-brand-accent-red/5 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-brand-tertiary/5 rounded-full blur-xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
              <span className="text-white uppercase tracking-wider text-base font-semibold">
                {locale === "en" ? "Our Services" : "خدماتنا"}
              </span>
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
              {locale === "en" ? "Precision Cutting Solutions" : "حلول القطع الدقيقة"}
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {locale === "en"
                ? "Comprehensive cutting solutions designed to meet the diverse needs of modern industrial operations with precision, efficiency, and reliability."
                : "حلول قطع شاملة مصممة لتلبية الاحتياجات المتنوعة للعمليات الصناعية الحديثة بدقة وكفاءة وموثوقية."}
            </p>
          </ScrollReveal>

          {/* Alternating Rows Layout */}
          <motion.div
            className="space-y-16 lg:space-y-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } group`}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  {/* Icon and Number */}
                  <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
                    <motion.div
                      className="relative w-16 h-16 lg:w-20 lg:h-20"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.6, ease: "easeInOut" },
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="relative w-full h-full bg-gradient-to-br from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-2xl flex items-center justify-center">
                        <service.icon className="text-brand-neutral-white drop-shadow-lg h-8 w-8 lg:h-10 lg:w-10" />
                      </div>
                    </motion.div>

                    <span className="text-4xl lg:text-6xl font-bold text-brand-accent-red/30 font-display">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold font-display text-brand-accent-light transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-gray-300 transition-colors duration-300 max-w-2xl mx-auto lg:mx-0">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 group/feature justify-center lg:justify-start"
                        initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        <ChevronRight className="w-4 h-4 text-brand-accent-red flex-shrink-0 group-hover/feature:translate-x-1 transition-transform duration-200" />
                        <span className="text-sm lg:text-base text-muted-foreground group-hover/feature:text-brand-neutral-white transition-colors duration-200 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual Separator */}
                <div className="hidden lg:block">
                  <motion.div
                    className="w-px h-32 xl:h-40 bg-gradient-to-b from-transparent via-brand-accent-red/50 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Mobile separator */}
                <div className="lg:hidden w-16 h-px bg-gradient-to-r from-transparent via-brand-accent-red/50 to-transparent" />

                {/* Visual/Icon Side */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    className="w-64 h-32 lg:w-80 lg:h-40 xl:w-96 xl:h-48 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 rounded-3xl border border-brand-accent-red/20 flex items-center justify-center group-hover:border-brand-accent-red/40 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent-red/10 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {/* Background gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-red/5 via-transparent to-brand-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Large icon */}
                    <service.icon className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-brand-accent-red/30 group-hover:text-brand-accent-red/50 transition-all duration-500 group-hover:scale-110" />

                    {/* Animated border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent-red rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <ScrollReveal className="text-center mt-16 lg:mt-20" delay={0.6}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-brand-neutral-white font-semibold px-8 rounded-2xl"
              >
                <Link
                  href="/contact"
                  className="relative z-10 flex items-center gap-3"
                >
                  <span>
                    {locale === "en" ? "Get Custom Solution" : "احصل على حل مخصص"}
                  </span>
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
