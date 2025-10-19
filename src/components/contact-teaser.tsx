"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useTranslations } from "next-intl";
import { Contact } from "@/app/types/homeApiTypes";

export function ContactTeaser({ contact }: { contact: Contact }) {
  const t = useTranslations("home");

  return (
    <section className="py-8 bg-gradient-to-r from-brand-primary via-brand-accent-red to-brand-primary relative overflow-hidden border-y-[1.5px]">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center text-brand-neutral-white">
          {/* Title */}
          <ScrollReveal>
            <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6 bg-gradient-to-b from-brand-neutral-white to-brand-accent-light capitalize bg-clip-text text-transparent">
              {contact?.title || t("contact_teaser.title")}
            </h2>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.2}>
            <p className="text-sm md:text-xl text-brand-neutral-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {contact?.short_desc || t("contact_teaser.short_desc")}
            </p>
          </ScrollReveal>

          {/* Button */}
          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="default"
                  className="bg-brand-neutral-white text-brand-primary hover:bg-brand-neutral-white/90 font-semibold py-5 text-base md:text-base rounded-2xl shadow-2xl hover:shadow-brand-neutral-white/25 transition-all duration-300"
                >
                  <Link href="/contact">{t("contact_teaser.cta")}</Link>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default ContactTeaser;
