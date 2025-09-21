"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useLocale } from "next-intl";
import logo from "@/app/assets/logo.png";
import { motion } from "framer-motion";

// X Logo Component
const XLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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
      label: "+20 0128390225",
      href: "tel:+966112345678",
    },
    {
      icon: Mail,
      label: "info@threecuts.com",
      href: "mailto:info@threecuts.com",
    },
    {
      icon: MapPin,
      label: "Al Sarag Mall - Nasr City, Cairo Governorate 11765, Egypt",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: XLogo, href: "#", label: "X" },
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-lg font-semibold font-display mb-6"
            >
              {locale === "en" ? "Quick Links" : "روابط سريعة"}
            </motion.h3>
            <ul className="flex items-center gap-3">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
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
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  viewport={{ once: true, margin: "-30px" }}
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
          <div className="min-w-0 flex flex-col items-center sm:items-start">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-lg font-semibold font-display mb-6"
            >
              {locale === "en" ? "Get in touch" : "تواصل معنا"}
            </motion.h3>
            <ul className="flex flex-col gap-4 items-center sm:items-start">
              {contactInfo.map((info, idx) => (
                <motion.li
                  key={info.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true, margin: "-20px" }}
      >
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true, margin: "-20px" }}
              className="text-brand-neutral-white/60 text-sm text-center md:text-left"
            >
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
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true, margin: "-20px" }}
              className="flex items-center gap-6 text-sm"
            >
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
