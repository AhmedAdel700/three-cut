"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useTranslations } from "next-intl";
import { PartnerCarousel } from "./PartnerCarousel";
import CallToAction from "./CallToAction";
import Image from "next/image";
import { AboutPageResponse } from "@/app/types/aboutApiTypes";

export function AboutPage({ aboutData }: { aboutData: AboutPageResponse }) {
  const t = useTranslations("about");

  const about = aboutData?.data?.about?.data;
  const aboutStructs = aboutData?.data?.about_structs?.data || [];

  return (
    <div className="min-h-screen border-b">
      <CallToAction />

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

        <div className="container mx-auto px-4 lg:px-6 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
            {about?.title || t("heroTitle")}
          </h1>
          <p className="text-lg lg:text-xl text-brand-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
            {about?.short_desc || t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 relative overflow-hidden border-t dark-section-bg">
        {/* Animated Background */}
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
          {/* Our Story */}
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
                {t("ourStory")}
              </span>
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
            </motion.div>

            <p
              className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: about?.long_desc || t("ourStoryDesc"),
              }}
            />
          </ScrollReveal>

          {/* Features from API */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {aboutStructs.map((item) => (
              <ScrollReveal key={item.id} delay={item.id * 0.1} direction="up">
                <motion.div
                  className="p-8 rounded-2xl bg-card/50 hover:bg-card transition-all duration-300 border border-border/50 h-full"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-xl flex items-center justify-center mb-6">
                    <Image
                      src={item.icon}
                      alt={item.alt_icon || item.name}
                      width={40}
                      height={40}
                      className="object-contain"
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
          </div> */}

          {/* Mission Section */}
          <ScrollReveal className="relative mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center rounded-3xl bg-card/60 border border-border/50 p-8 lg:p-12 backdrop-blur-sm shadow-xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand-secondary/30 to-brand-accent-red/30 blur opacity-40 group-hover:opacity-60 transition" />
                  <Image
                    src={about?.image || "/fallback-mission.jpg"}
                    alt={about?.alt_image || t("missionAlt")}
                    width={600}
                    height={400}
                    className="relative rounded-2xl object-cover shadow-2xl ring-1 ring-border/50 group-hover:scale-[1.01] transition"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent-red/10 text-brand-accent-red text-sm font-medium mb-4">
                  <Sparkles className="h-7 w-7 text-brand-accent-red" />
                  <span className="text-white uppercase tracking-wider text-base font-semibold">
                    {t("mission")}
                  </span>
                  <Sparkles className="h-7 w-7 text-brand-accent-red" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-semibold mb-5 text-white tracking-tight">
                  {t("ourMission")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {about?.short_desc || t("missionDesc")}
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Vision Section */}
          <ScrollReveal className="relative mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center rounded-3xl bg-card/60 border border-border/50 p-8 lg:p-12 backdrop-blur-sm shadow-xl">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-tertiary/10 text-brand-tertiary text-sm font-medium mb-4">
                  <Sparkles className="h-7 w-7 text-brand-accent-red" />
                  <span className="text-white uppercase tracking-wider text-base font-semibold">
                    {t("vision")}
                  </span>
                  <Sparkles className="h-7 w-7 text-brand-accent-red" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-semibold mb-5 text-white tracking-tight">
                  {t("ourVision")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {about?.long_desc || t("visionDesc")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-1 md:order-2 mb-6"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand-tertiary/30 to-brand-accent-red/30 blur opacity-40 group-hover:opacity-60 transition" />
                  <Image
                    src={about?.banner || "/fallback-vision.jpg"}
                    alt={about?.alt_banner || t("visionAlt")}
                    width={600}
                    height={400}
                    className="relative rounded-2xl object-cover shadow-2xl ring-1 ring-border/50 group-hover:scale-[1.01] transition"
                  />
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal className="text-center">
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
                  <span>{t("getInTouch")}</span>
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Partners Carousel */}
        {/* <PartnerCarousel partnersData={aboutData.data.partners.data} /> */}
      </section>
    </div>
  );
}
