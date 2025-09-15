"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/navigations";
import { useLocale } from "next-intl";

export function ContactTeaser() {
  const locale = useLocale();
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-primary via-brand-accent-red to-brand-primary relative overflow-hidden">
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
        <div className="text-center text-white">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6">
              {locale === "en" ? "Ready to Get Started?" : "مستعد للبدء؟"}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {locale === "en"
                ? "Contact our experts today to discuss your cutting system requirements and discover how Three Cuts can enhance your industrial operations."
                : "اتصل بخبرائنا اليوم لمناقشة متطلبات نظام القطع الخاص بك واكتشف كيف يمكن لثري كتس تحسين عملياتك الصناعية."}
            </p>
          </ScrollReveal>

          {/* Contact Methods with Staggered Animation */}
          <ScrollReveal delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {[
                { icon: Phone, text: "+966 11 234 5678" },
                { icon: Mail, text: "info@threecuts.com" },
                {
                  icon: MapPin,
                  text:
                    locale === "en"
                      ? "Riyadh, Saudi Arabia"
                      : "الرياض، المملكة العربية السعودية",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center gap-3 text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA Buttons with Enhanced Animations */}
          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-brand-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300"
                >
                  <Link href="/contact">
                    Title
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-brand-primary font-semibold px-8 py-6 text-lg rounded-2xl backdrop-blur-sm transition-all duration-300 bg-transparent"
                >
                  <Link href="/products">View All</Link>
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
