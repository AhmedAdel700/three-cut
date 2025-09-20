"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useLocale } from "next-intl";
import logo from "@/app/assets/logo.png";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "+966 11 234 5678",
      href: "tel:+966112345678",
    },
    {
      icon: Mail,
      label: "info@threecuts.com",
      href: "mailto:info@threecuts.com",
    },
    {
      icon: MapPin,
      label:
        locale === "en"
          ? "Riyadh, Saudi Arabia"
          : "الرياض، المملكة العربية السعودية",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const brandDescription =
    locale === "en"
      ? "Three Cuts delivers high-quality products with consistent standards, safe handling, and responsive service across KSA. We partner with businesses to ensure freshness, reliability, and on-time fulfillment."
      : "توفر Three Cuts منتجات عالية الجودة بمعايير ثابتة وسلامة عالية وخدمة سريعة في جميع أنحاء المملكة. نعمل مع شركائنا لضمان الجودة والالتزام بالمواعيد.";

  return (
    <footer className="bg-gradient-to-br from-red-900 via-black to-red-800 text-brand-neutral-white">
      {/* Top Brand Block (centered) */}
      <div className="container mx-auto px-4 lg:px-6 pt-12 lg:pt-16">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="block w-full max-w-[240px]">
            <motion.div
              className="relative h-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={logo}
                alt="Three Cuts Logo"
                fill
                className="object-contain brightness-0 invert transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </Link>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-brand-neutral-white/80 text-sm leading-relaxed max-w-3xl"
          >
            {brandDescription}
          </motion.p>
        </div>
      </div>

      {/* Middle Content: Links & Contact with divider */}
      <div className="container mx-auto px-4 lg:px-6 pb-12 lg:pb-10 mt-10">
        <div className="flex flex-col items-center sm:flex-row sm:items-stretch justify-center gap-8 sm:gap-12">
          {/* Quick Links (left) */}
          <div className="min-w-0 flex flex-col items-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold font-display mb-6"
            >
              {locale === "en" ? "Quick Links" : "روابط سريعة"}
            </motion.h3>
            <ul className="flex items-center gap-3">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-brand-neutral-white/80 hover:text-brand-accent-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Socials (centered row) */}
            <div className="flex flex-wrap items-center sm:justify-center gap-4 mt-6 sm:mt-8">
              {socialLinks.map((social, idx) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    className="
                  group
                  w-10 h-10
                  rounded-full
                  border border-white/15
                  bg-white/5
                  backdrop-blur
                  flex items-center justify-center
                  transition
                  hover:bg-white/15 hover:border-white/25
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                  text-brand-neutral-white/80 hover:text-brand-accent-light
                "
                  >
                    <social.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block sm:w-[1px] bg-white/40"></div>

          {/* Contact Info (right) */}
          <div className="min-w-0 flex flex-col items-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold font-display mb-6"
            >
              {locale === "en" ? "Get in touch" : "تواصل معنا"}
            </motion.h3>
            <ul className="flex flex-col gap-4">
              {contactInfo.map((info, idx) => (
                <motion.li
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={info.href}
                    className="group flex items-center gap-3 text-brand-neutral-white/80 hover:text-brand-accent-light transition-colors text-sm"
                    title={info.label}
                  >
                    <info.icon className="h-4 w-4 text-brand-accent-red transition-transform group-hover:scale-110" />
                    <span className="break-words">{info.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-brand-neutral-white/60 text-sm text-center md:text-left">
              Created By{" "}
              <Link
                href={"https://www.be-group.com/en"}
                target="_blank"
                className="text-orange-400 font-semibold cursor-pointer"
              >
                Be Group
              </Link>{" "}
              © {currentYear}{" "}
              {locale === "en" ? "All Rights Reserved." : "جميع الحقوق محفوظة."}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-brand-neutral-white/60 hover:text-brand-neutral-white transition-colors"
              >
                {locale === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
              </Link>
              <Link
                href="/terms"
                className="text-brand-neutral-white/60 hover:text-brand-neutral-white transition-colors"
              >
                {locale === "en" ? "Terms of Service" : "شروط الخدمة"}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
