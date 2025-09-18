"use client";
import { Button } from "@/components/ui/button";
import { Award, Sparkles, Users, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";
import { PartnerCarousel } from "./PartnerCarousel";

export function AboutSection() {
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

  const achievements = [
    {
      number: 500,
      suffix: "+",
      label: locale === "en" ? "Projects Completed" : "مشروع مكتمل",
    },
    {
      number: 50,
      suffix: "+",
      label: locale === "en" ? "Countries Served" : "دولة نخدمها",
    },
    {
      number: 15,
      suffix: "+",
      label: locale === "en" ? "Years Experience" : "سنة خبرة",
    },
    {
      number: 24,
      suffix: "/7",
      label: locale === "en" ? "Support Available" : "دعم متاح",
    },
  ];

  return (
    <section className="py-16 lg:py-24 border-t dark-section-bg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
            <span className="text-white uppercase tracking-wider text-base font-semibold">
              Our Story
            </span>
            <Sparkles className="h-7 w-7 text-brand-accent-red" />
          </motion.div>

          <ScrollReveal direction="up" className="mb-12">
            <h2
              className="text-3xl lg:text-5xl font-bold font-display mb-6 
bg-gradient-to-b from-brand-accent-light to-brand-quaternary
bg-clip-text text-transparent"
            >
              About Three Cuts
            </h2>
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

          {/* Stats Section */}
          <ScrollReveal delay={0.3} direction="up">
            <motion.div
              className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border/50 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
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

          {/* CTA Button */}
          <ScrollReveal delay={0.4}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-brand-neutral-white font-semibold px-8 rounded-2xl"
            >
              <Link href="/contact">
                {locale === "en" ? "Learn More About Us" : "تعرف أكثر عنا"}
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>

      <PartnerCarousel />
    </section>
  );
}
