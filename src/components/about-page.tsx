"use client";
import { Button } from "@/components/ui/button";
import { Award, Sparkles, Users, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";
import { PartnerCarousel } from "./PartnerCarousel";
import CallToAction from "./CallToAction";
import Image from "next/image";
import mission from "@/app/assets/Our-Mission.jpg";
import vision from "@/app/assets//Vision.jpg";

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

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
              {locale === "en" ? "About Three Cuts" : "حول ثري كتس"}
            </h1>
            <p className="text-lg lg:text-xl text-brand-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
              {locale === "en"
                ? "Leading the Future of Industrial Cutting Systems with Precision and Reliability"
                : "ريادة مستقبل أنظمة القطع الصناعية بدقة وموثوقية"}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
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

          {/* Features */}
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
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-xl flex items-center justify-center mb-6">
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
                    src={mission}
                    alt="Our Mission"
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
                    {locale === "en" ? "Mission" : "المهمة"}
                  </span>
                  <Sparkles className="h-7 w-7 text-brand-accent-red" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-semibold mb-5 text-white tracking-tight">
                  {locale === "en" ? "Our Mission" : "مهمتنا"}
                </h2>
                <div className="space-y-4 text-base lg:text-lg">
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "At Three Cuts, our mission is to revolutionize industrial cutting by delivering reliable, high-precision systems that drive productivity and performance for businesses across the globe."
                      : "في ثري كتس، مهمتنا هي إحداث ثورة في القطع الصناعي من خلال تقديم أنظمة موثوقة وعالية الدقة تعزز الإنتاجية والأداء للشركات حول العالم."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "We focus on building long-term partnerships through exceptional engineering, responsive support, and a deep understanding of our clients’ operational needs."
                      : "نركز على بناء شراكات طويلة الأمد من خلال الهندسة الاستثنائية، والدعم السريع، وفهم عميق لاحتياجات عملائنا التشغيلية."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "Every solution we provide is tailored to empower industries to perform at their best, reduce downtime, and achieve sustainable growth."
                      : "كل حل نقدمه مصمم خصيصاً لتمكين الصناعات من الأداء بأفضل شكل، وتقليل التوقفات، وتحقيق نمو مستدام."}
                  </p>
                </div>
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
                    {locale === "en" ? "Vision" : "الرؤية"}
                  </span>
                  <Sparkles className="h-7 w-7 text-brand-accent-red" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-semibold mb-5 text-white tracking-tight">
                  {locale === "en" ? "Our Vision" : "رؤيتنا"}
                </h2>
                <div className="space-y-4 text-base lg:text-lg">
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "We envision a future where Three Cuts is synonymous with innovation, quality, and trust in the industrial cutting sector."
                      : "نحن نتطلع إلى مستقبل تكون فيه ثري كتس مرادفاً للابتكار والجودة والثقة في قطاع القطع الصناعي."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "Our goal is to set new benchmarks in sustainability, efficiency, and customer satisfaction by continuously evolving our technologies and services."
                      : "هدفنا هو وضع معايير جديدة في الاستدامة والكفاءة ورضا العملاء من خلال التطوير المستمر لتقنياتنا وخدماتنا."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "We strive to lead not only in technology but also in building a responsible and impactful industrial future for generations to come."
                      : "نسعى إلى الريادة ليس فقط في التقنية، بل في بناء مستقبل صناعي مسؤول وذو تأثير للأجيال القادمة."}
                  </p>
                </div>
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
                    src={vision}
                    alt="Our Vision"
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
