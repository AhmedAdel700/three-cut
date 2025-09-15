"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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


export function Footer() {
  const currentYear = new Date().getFullYear();
    const locale = useLocale();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const productCategories = [
    {
      href: "/products?category=laser-cutting",
      label: locale === "en" ? "Laser Cutting" : "القطع بالليزر",
    },
    {
      href: "/products?category=plasma-cutting",
      label: locale === "en" ? "Plasma Cutting" : "القطع بالبلازما",
    },
    {
      href: "/products?category=waterjet-cutting",
      label: locale === "en" ? "Waterjet Cutting" : "القطع بالماء",
    },
    {
      href: "/products?category=cnc-machines",
      label: locale === "en" ? "CNC Machines" : "آلات CNC",
    },
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

  return (
    <footer className="bg-gradient-to-br from-brand-secondary via-brand-neutral-dark to-brand-secondary text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Three Cuts Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display">
                  Three Cuts
                </span>
                <span className="text-sm text-white/70">
                  {locale === "en" ? "Cutting Systems" : "أنظمة القطع"}
                </span>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              description
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-10 h-10 p-0 hover:bg-white/10 hover:text-brand-accent-light transition-colors"
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-display mb-6">
              {locale === "en" ? "Quick Links" : "روابط سريعة"}
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-brand-accent-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold font-display mb-6">title</h3>
            <ul className="flex flex-col gap-3">
              {productCategories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-white/80 hover:text-brand-accent-light transition-colors text-sm"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold font-display mb-6">title</h3>
            <ul className="flex flex-col gap-4">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <Link
                    href={info.href}
                    className="flex items-center gap-3 text-white/80 hover:text-brand-accent-light transition-colors text-sm group"
                  >
                    <info.icon className="h-4 w-4 text-brand-accent-red group-hover:scale-110 transition-transform" />
                    <span>{info.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Three Cuts. rights
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-white transition-colors"
              >
                {locale === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-white transition-colors"
              >
                {locale === "en" ? "Terms of Service" : "شروط الخدمة"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
