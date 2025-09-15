"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Award, Users, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";

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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-brand-primary to-brand-accent-red bg-clip-text text-transparent">
                title
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                description
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "en"
                  ? "Our cutting-edge technology and commitment to excellence have established us as a leader in the industrial cutting systems market. We provide comprehensive solutions that meet the highest standards of precision and reliability."
                  : "تقنيتنا المتطورة والتزامنا بالتميز جعلنا رواداً في سوق أنظمة القطع الصناعية. نحن نقدم حلولاً شاملة تلبي أعلى معايير الدقة والموثوقية."}
              </p>
            </div>

            {/* Features with Staggered Animation */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="up">
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-2xl bg-card/50 hover:bg-card transition-colors"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-display text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-white font-semibold px-8 rounded-2xl"
              >
                <Link href="/contact">
                  {locale === "en" ? "Learn More About Us" : "تعرف أكثر عنا"}
                </Link>
              </Button>
            </ScrollReveal>
          </ScrollReveal>

          {/* Image & Stats */}
          <ScrollReveal direction="right" className="order-1 lg:order-2">
            <div className="relative">
              <motion.div
                className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/laser-cutting-process-metal.jpg"
                  alt={
                    locale === "en"
                      ? "Laser cutting process"
                      : "عملية القطع بالليزر"
                  }
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-dark/60 to-transparent" />
              </motion.div>

              {/* Floating Stats with Animated Counters */}
              <motion.div
                className="absolute -bottom-8 -left-4 lg:-left-8 bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold font-display text-brand-accent-red mb-1">
                        <AnimatedCounter
                          value={achievement.number}
                          suffix={achievement.suffix}
                          duration={2 + index * 0.2}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {achievement.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
