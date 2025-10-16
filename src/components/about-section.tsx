"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { Link } from "@/navigations";
import { useTranslations } from "next-intl";
import { PartnerCarousel } from "./PartnerCarousel";
import { About, AboutStruct, Partners } from "@/app/types/homeApiTypes";
import Image from "next/image";

export function AboutSection({
  aboutData,
  aboutStructsData,
  partnersData,
}: {
  aboutData?: About;
  aboutStructsData?: AboutStruct[];
  partnersData?: Partners;
}) {
  const t = useTranslations("home");
  return (
    <section className="py-16 lg:py-24 border-t dark-section-bg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* ---------- Header ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
            <span className="text-white uppercase tracking-wider text-base font-semibold">
              {aboutData?.subtitle}
            </span>
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
          </motion.div>

          {/* ---------- About Content ---------- */}
          <ScrollReveal direction="up" className="mb-12">
            <h2
              className="text-3xl lg:text-5xl font-bold font-display mb-6 
                bg-gradient-to-b from-brand-accent-light to-brand-quaternary
                bg-clip-text text-transparent"
            >
              {aboutData?.title}
            </h2>

            <p
              className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: aboutData?.text ?? "",
              }}
            />
          </ScrollReveal>

          {/* ---------- About Structs (Features) ---------- */}
          {aboutStructsData && aboutStructsData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {aboutStructsData.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.1} direction="up">
                  <motion.div
                    className="p-8 rounded-2xl bg-card/50 hover:bg-card transition-all duration-300 border border-border/50 h-full"
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Image
                        src={item.icon}
                        alt={item.alt_icon || item.name}
                        className="h-8 w-8 object-contain"
                        width={32}
                        height={32}
                      />
                    </div>
                    <h3 className="font-semibold font-display text-xl mb-4">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.long_desc}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* ---------- Stats Section (Fallback to i18n) ---------- */}
          <ScrollReveal delay={0.3} direction="up">
            <motion.div
              className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border/50 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    number: 500,
                    suffix: "+",
                    label: t("projects"),
                  },
                  {
                    number: 50,
                    suffix: "+",
                    label: t("countries"),
                  },
                  {
                    number: 15,
                    suffix: "+",
                    label: t("experience"),
                  },
                  { number: 24, suffix: "/7", label: t("support") },
                ].map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold font-display text-brand-accent-red mb-2">
                      <AnimatedCounter
                        value={achievement.number}
                        suffix={achievement.suffix}
                        duration={2 + index * 0.2}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* ---------- CTA ---------- */}
          <ScrollReveal delay={0.4}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-brand-neutral-white font-semibold px-8 rounded-2xl"
            >
              <Link href="/contact">{t("learnMore")}</Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>

      {/* ---------- Partners Carousel ---------- */}
      <PartnerCarousel partnersData={partnersData ?? []} />
    </section>
  );
}
