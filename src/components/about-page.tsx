"use client";
import { Button } from "@/components/ui/button";
import { Award, Sparkles, Users, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";
import { PartnerCarousel } from "./PartnerCarousel";

export function AboutPage() {
  const locale = useLocale();

  const features = [
    {
      icon: Award,
      title: locale === "en" ? "Industry Excellence" : "التميز الصناعي",
      description:
        locale === "en"
          ? "Over 15 years of experience in cutting systems technology"
          : "أكثر من 15 عاماً من الخبرة في تقنية أنظمة القطع",
    },
    {
      icon: Users,
      title: locale === "en" ? "Expert Team" : "فريق خبراء",
      description:
        locale === "en"
          ? "Certified engineers and technicians providing world-class support"
          : "مهندسون وفنيون معتمدون يقدمون دعماً عالمي المستوى",
    },
    {
      icon: Wrench,
      title: locale === "en" ? "Complete Solutions" : "حلول شاملة",
      description:
        locale === "en"
          ? "From consultation to installation and ongoing maintenance"
          : "من الاستشارة إلى التركيب والصيانة المستمرة",
    },
  ];

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
              {locale === "en" ? "About Three Cuts" : "حول ثري كتس"}
            </h1>
            <p className="text-lg lg:text-xl text-brand-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
              Leading the Future of Industrial Cutting Systems with Precision
              and Reliability
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 relative overflow-hidden border-t dark-section-bg">
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
                {locale === "en" ? "Our Story" : "قصتنا"}
              </span>
              <Sparkles className="h-7 w-7 text-brand-accent-red" />
            </motion.div>

            <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
              {locale === "en"
                ? "Our cutting-edge technology and commitment to excellence have established us as a leader in the industrial cutting systems market. We provide comprehensive solutions that meet the highest standards of precision and reliability."
                : "تقنيتنا المتطورة والتزامنا بالتميز جعلنا رواداً في سوق أنظمة القطع الصناعية. نحن نقدم حلولاً شاملة تلبي أعلى معايير الدقة والموثوقية."}
            </p>
          </ScrollReveal>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <motion.div
                  className="p-8 rounded-2xl bg-card/50 hover:bg-card transition-all duration-300 border border-border/50 h-full"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-brand-neutral-white" />
                  </div>
                  <h3 className="font-semibold font-display text-xl mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Section */}
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
                  <span>{locale === "en" ? "Get In Touch" : "تواصل معنا"}</span>
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
        <PartnerCarousel />
      </section>
    </div>
  );
}
