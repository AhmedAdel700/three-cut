"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Menu,
  X,
  Globe,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import logo from "@/app/assets/logo.png";
import { usePathname, useRouter } from "@/navigations";
import { motion } from "framer-motion";
import XLogo from "@/app/assets/x-logo.svg";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const locale = useLocale();
  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();

  const stripLocale = (p: string) => p.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const currentPath = stripLocale(pathname);

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  const goOtherLocale = () => {
    const target = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: target });
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/", label: t("Home") },
    { href: "/about", label: t("About") },
    { href: "/services", label: t("Services") },
    { href: "/products", label: t("Products") },
    { href: "/contact", label: t("Contact") },
  ];

  const otherLangLabel = locale === "en" ? t("Arabic") : t("English");
  const drawerSide = locale === "ar" ? "left" : "right";

  const DrawerMenu = () => (
    <Drawer
      direction={drawerSide}
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerTrigger asChild>
        <button
          className="flex gap-1 text-white hover:text-white/90 px-3 py-2"
          suppressHydrationWarning
        >
          <Menu className="w-6 h-6" />
          {t("Menu")}
        </button>
      </DrawerTrigger>

      <DrawerContent
        className={cn(
          "fixed top-0 h-full z-50 w-[300px] p-6 bg-black/90 backdrop-blur-lg text-white flex flex-col justify-start overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out",
          drawerSide === "left" ? "left-0" : "right-0"
        )}
      >
        <DrawerTitle className="sr-only">{t("Navigation Menu")}</DrawerTitle>

        {/* Top Section */}
        <div>
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <Image
                src={logo}
                alt="Logo"
                className="h-10 w-auto brightness-0 invert mb-6"
              />
            </Link>
            <X
              className="h-6 w-6 text-white cursor-pointer -mt-6"
              onClick={() => setIsDrawerOpen(false)}
            />
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
                className={cn(
                  "text-lg font-semibold transition-colors p-3 rounded-lg",
                  isActive(item.href)
                    ? "text-white bg-red-500/15"
                    : "text-white/80 hover:text-white hover:bg-red-500/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher - Mobile */}
          <button
            onClick={() => {
              goOtherLocale();
              setIsDrawerOpen(false);
            }}
            className="flex lg:hidden items-center gap-2 text-white font-semibold hover:text-white/90 mt-6"
            aria-label={t("Switch language")}
            suppressHydrationWarning
          >
            <span>{otherLangLabel}</span>
            <Globe className="w-5 h-5" />
          </button>
        </div>

        <div className="border-t border-white/20 w-full mt-2 mb-6"></div>

        {/* Footer Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-white/90">
            <Phone className="w-5 h-5" />
            <span dir="ltr">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <Mail className="w-5 h-5" />
            <span>info@example.com</span>
          </div>

          <div className="border-t border-white/20 w-full mt-2 mb-4"></div>

          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("Facebook")}
            >
              <Facebook className="w-5 h-5 hover:text-white/80" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("Instagram")}
            >
              <Instagram className="w-5 h-5 hover:text-white/80" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("LinkedIn")}
            >
              <Linkedin className="w-5 h-5 hover:text-white/80" />
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <Image
                src={XLogo}
                alt="X Logo"
                width={23}
                height={23}
                className="w-4 h-4 hover:text-white/80 mt-[1px]"
              />
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-[100vw]",
        isScrolled ? "backdrop-blur-md" : "bg-transparent"
      )}
      style={{
        backgroundColor: isScrolled
          ? "rgba(252, 252, 252, 0.26)"
          : "transparent",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="md:container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* LOGO */}
          <Link prefetch href="/" className="flex items-center h-full">
            <Image
              src={logo}
              alt="Three Cuts Logo"
              priority
              className={`block h-8 lg:h-10 w-auto object-contain ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* DESKTOP LANG + DRAWER */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Button */}
            <button
              onClick={goOtherLocale}
              className="flex items-center gap-2 text-white font-semibold hover:text-white/90"
              aria-label={t("Switch language")}
              suppressHydrationWarning
            >
              <span>{otherLangLabel}</span>
              <Globe className="w-5 h-5" />
            </button>

            {/* Drawer */}
            <DrawerMenu />
          </div>

          {/* MOBILE MENU */}
          <div className="flex items-center gap-2 lg:hidden">
            <DrawerMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
