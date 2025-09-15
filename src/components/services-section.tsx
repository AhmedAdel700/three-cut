"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Flame,
  Droplets,
  Cog,
  Wrench,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";

export function ServicesSection() {
  const locale = useLocale();
  const services = [
    {
      icon: Zap,
      title: locale === "en" ? "Laser Cutting Systems" : "أنظمة القطع بالليزر",
      description:
        locale === "en"
          ? "High-precision fiber laser cutting machines for metal fabrication with exceptional speed and accuracy."
          : "آلات القطع بالليزر الليفي عالية الدقة لتصنيع المعادن بسرعة ودقة استثنائية.",
      features:
        locale === "en"
          ? [
              "Fiber laser technology",
              "Automated loading",
              "Precision cutting",
              "Energy efficient",
            ]
          : [
              "تقنية الليزر الليفي",
              "التحميل الآلي",
              "القطع الدقيق",
              "موفر للطاقة",
            ],
    },
    {
      icon: Flame,
      title:
        locale === "en" ? "Plasma Cutting Solutions" : "حلول القطع بالبلازما",
      description:
        locale === "en"
          ? "Heavy-duty plasma cutting systems for thick materials and high-volume production environments."
          : "أنظمة القطع بالبلازما للخدمة الشاقة للمواد السميكة وبيئات الإنتاج عالية الحجم.",
      features:
        locale === "en"
          ? [
              "High amperage cutting",
              "Thick material capability",
              "Fast cutting speeds",
              "Robust construction",
            ]
          : [
              "قطع عالي الأمبير",
              "قدرة المواد السميكة",
              "سرعات قطع سريعة",
              "بناء قوي",
            ],
    },
    {
      icon: Droplets,
      title: locale === "en" ? "Waterjet Technology" : "تقنية القطع بالماء",
      description:
        locale === "en"
          ? "Ultra-precise waterjet cutting for complex geometries and exotic materials without heat-affected zones."
          : "القطع بالماء فائق الدقة للأشكال الهندسية المعقدة والمواد الغريبة بدون مناطق متأثرة بالحرارة.",
      features:
        locale === "en"
          ? [
              "No heat affected zone",
              "Complex geometries",
              "Any material thickness",
              "Superior edge quality",
            ]
          : [
              "لا توجد منطقة متأثرة بالحرارة",
              "أشكال هندسية معقدة",
              "أي سماكة مادة",
              "جودة حافة فائقة",
            ],
    },
    {
      icon: Cog,
      title: locale === "en" ? "CNC Machining" : "التشغيل الآلي CNC",
      description:
        locale === "en"
          ? "Advanced CNC machining centers for precision manufacturing and complex part production."
          : "مراكز التشغيل الآلي CNC المتقدمة للتصنيع الدقيق وإنتاج القطع المعقدة.",
      features:
        locale === "en"
          ? [
              "Multi-axis machining",
              "High precision",
              "Automated tooling",
              "Quality control",
            ]
          : [
              "التشغيل متعدد المحاور",
              "دقة عالية",
              "الأدوات الآلية",
              "مراقبة الجودة",
            ],
    },
    {
      icon: Wrench,
      title: locale === "en" ? "Installation & Training" : "التركيب والتدريب",
      description:
        locale === "en"
          ? "Complete installation services and comprehensive operator training programs for optimal performance."
          : "خدمات التركيب الكاملة وبرامج التدريب الشاملة للمشغلين للحصول على الأداء الأمثل.",
      features:
        locale === "en"
          ? [
              "Professional installation",
              "Operator training",
              "Safety protocols",
              "Performance optimization",
            ]
          : [
              "التركيب المهني",
              "تدريب المشغلين",
              "بروتوكولات السلامة",
              "تحسين الأداء",
            ],
    },
    {
      icon: HeadphonesIcon,
      title: locale === "en" ? "24/7 Support" : "دعم 24/7",
      description:
        locale === "en"
          ? "Round-the-clock technical support and maintenance services to ensure maximum uptime and productivity."
          : "الدعم الفني على مدار الساعة وخدمات الصيانة لضمان أقصى وقت تشغيل وإنتاجية.",
      features:
        locale === "en"
          ? [
              "24/7 availability",
              "Remote diagnostics",
              "Preventive maintenance",
              "Spare parts supply",
            ]
          : [
              "متاح 24/7",
              "التشخيص عن بُعد",
              "الصيانة الوقائية",
              "توريد قطع الغيار",
            ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-brand-primary to-brand-accent-red bg-clip-text text-transparent">
            title
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {locale === "en"
              ? "Comprehensive cutting solutions designed to meet the diverse needs of modern industrial operations with precision, efficiency, and reliability."
              : "حلول قطع شاملة مصممة لتلبية الاحتياجات المتنوعة للعمليات الصناعية الحديثة بدقة وكفاءة وموثوقية."}
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold font-display mb-4 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-brand-accent-red rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-brand-accent-red/10 group-hover:text-brand-accent-red transition-colors mt-auto"
                  >
                    <span>{locale === "en" ? "Learn More" : "تعرف أكثر"}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <ScrollReveal className="text-center mt-16" delay={0.3}>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-secondary/90 hover:to-brand-accent-red/90 text-white font-semibold px-8 rounded-2xl"
          >
            <Link href="/contact">
              {locale === "en" ? "Get Custom Solution" : "احصل على حل مخصص"}
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
