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
  Youtube,
  Send,
  Camera,
  Music,
  Pin,
} from "lucide-react";
import { useTranslations } from "next-intl";
import logo from "@/app/assets/logo.png";
import { motion } from "framer-motion";
import { SettingsApiResponse } from "@/app/types/appApiTypes";

// X Logo Component
const XLogo = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer({
  appsettingsData,
}: {
  appsettingsData: SettingsApiResponse;
}) {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const settings = appsettingsData?.data?.setting;

  const quickLinks = [
    { href: "/", label: t("Home") },
    { href: "/about", label: t("About") },
    { href: "/services", label: t("Services") },
    { href: "/products", label: t("Products") },
    { href: "/contact", label: t("Contact") },
  ];

  // Helper function to convert Google Maps embed URL to regular URL
  const getMapUrl = (mapUrl: string) => {
    // If it's an embed URL, extract the location and create a regular Google Maps URL
    if (mapUrl.includes("maps/embed")) {
      // Try to extract coordinates or place ID
      const pbMatch = mapUrl.match(/!1d([-\d.]+)!2d([-\d.]+)/);
      if (pbMatch) {
        const lng = pbMatch[1];
        const lat = pbMatch[2];
        return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      }
      // If we can't parse it, just return the embed URL (will open in new tab)
      return mapUrl;
    }
    return mapUrl;
  };

  // Dynamic contact info
  const contactInfo = [
    ...(settings?.whatsapp
      ? [
          {
            icon: Phone,
            label: settings.whatsapp,
            href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`,
          },
        ]
      : []),
    ...(settings?.email
      ? [
          {
            icon: Mail,
            label: settings.email,
            href: `mailto:${settings.email}`,
          },
        ]
      : []),
    ...(settings?.map
      ? [
          {
            icon: MapPin,
            label: t("Address"),
            href: getMapUrl(settings.map),
          },
        ]
      : []),
  ];

  // Dynamic social links with icons
  const socialLinks = [
    ...(settings?.facebook
      ? [{ icon: Facebook, href: settings.facebook, label: t("Facebook") }]
      : []),
    ...(settings?.twitter
      ? [{ icon: XLogo, href: settings.twitter, label: "X" }]
      : []),
    ...(settings?.linkedin
      ? [{ icon: Linkedin, href: settings.linkedin, label: t("LinkedIn") }]
      : []),
    ...(settings?.instagram
      ? [{ icon: Instagram, href: settings.instagram, label: t("Instagram") }]
      : []),
    ...(settings?.youtube
      ? [{ icon: Youtube, href: settings.youtube, label: "YouTube" }]
      : []),
    ...(settings?.telegram
      ? [{ icon: Send, href: settings.telegram, label: "Telegram" }]
      : []),
    ...(settings?.snapchat
      ? [{ icon: Camera, href: settings.snapchat, label: "Snapchat" }]
      : []),
    ...(settings?.tiktok
      ? [{ icon: Music, href: settings.tiktok, label: "TikTok" }]
      : []),
    ...(settings?.pinterest
      ? [{ icon: Pin, href: settings.pinterest, label: "Pinterest" }]
      : []),
  ];

  const brandDescription = settings?.description;
  const logoImage = settings?.logo || logo;

  return (
    <footer className="bg-gradient-to-br from-red-900 via-black to-red-800 text-brand-neutral-white">
      {/* Top Brand Block */}
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
                src={logoImage}
                alt={settings?.short_name || "Three Cuts Logo"}
                fill
                className="object-contain brightness-0 invert transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </Link>

          {/* <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-brand-neutral-white/80 text-sm leading-relaxed max-w-3xl"
          >
            {brandDescription}
          </motion.p> */}
        </div>
      </div>

      {/* Middle Content */}
      <div className="container mx-auto px-4 lg:px-6 pb-12 lg:pb-10 mt-10">
        <div className="flex flex-col items-center sm:flex-row sm:items-stretch justify-center gap-8 sm:gap-12">
          {/* Quick Links */}
          <div className="min-w-0 flex flex-col items-center">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-lg font-semibold font-display mb-6"
            >
              {t("Quick Links")}
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

            {/* Socials */}
            {socialLinks.length > 0 && (
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
                      target="_blank"
                      rel="noopener noreferrer"
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
            )}
          </div>

          {/* Divider */}
          {contactInfo.length > 0 && (
            <div className="hidden sm:block sm:w-[1px] bg-white/40"></div>
          )}

          {/* Contact Info */}
          {contactInfo.length > 0 && (
            <div className="min-w-0 flex flex-col items-center sm:items-start">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-lg font-semibold font-display mb-6"
              >
                {t("Get in touch")}
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
                      target={info.icon === MapPin ? "_blank" : undefined}
                      rel={
                        info.icon === MapPin ? "noopener noreferrer" : undefined
                      }
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
          )}
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
          <div className="flex flex-col items-center justify-center 2xl:flex-row gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true, margin: "-20px" }}
              className="text-brand-neutral-white/60 text-sm lg:text-base text-center"
            >
              {t("Created By")}{" "}
              <Link
                href={"https://www.be-group.com/en"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 font-semibold cursor-pointer"
              >
                Be Group
              </Link>{" "}
              © {currentYear} {t("All Rights Reserved")}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
