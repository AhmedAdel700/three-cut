"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import logo from "@/app/assets/logo.png";
import { usePathname, useRouter } from "@/navigations";
import { motion } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const locale = useLocale();
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
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);

    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const navItems = [
    { href: "/", label: locale === "ar" ? "الرئيسية" : "Home" },
    { href: "/about", label: locale === "ar" ? "حولنا" : "About" },
    { href: "/services", label: locale === "ar" ? "الخدمات" : "Services" },
    { href: "/products", label: locale === "ar" ? "المنتجات" : "Products" },
    { href: "/contact", label: locale === "ar" ? "تواصل" : "Contact" },
  ];

  const otherLangLabel = locale === "en" ? "العربية" : "English";

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-[100vw]",
        isScrolled ? "backdrop-blur-md" : "bg-transparent"
      )}
      style={{
        backgroundColor: isScrolled ? "rgba(48, 53, 59, 0.65)" : "transparent",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="md:container mx-auto px-4 lg:px-6">
        {/* Give the row a fixed height; align everything to center */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* LOGO — make image block-level and set explicit height */}
          <Link prefetch href="/" className="flex items-center h-full">
            <Image
              src={logo}
              alt="Three Cuts Logo"
              priority
              className="block h-8 lg:h-10 w-auto object-contain drop-shadow-[0_0_0.9px_white]"
            />
          </Link>

          {/* DESKTOP NAV — same row height to align with logo */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            {navItems.map((item) => (
              <Link
                prefetch
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors relative group",
                  isActive(item.href)
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-accent-red to-brand-accent-light transition-all",
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}

            <button
              onClick={goOtherLocale}
              className="flex items-center gap-2 text-base font-semibold text-white/95 hover:text-white"
              aria-label="Switch language"
            >
              <span>{otherLangLabel}</span>
              <Globe className="h-5 w-5" />
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-brand-neutral-white hover:text-brand-accent-light hover:bg-white/10 bg-transparent"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Pop-up */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] min-h-screen flex items-start justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={cn(
              "mt-8 md:mt-12 w-[92vw] max-w-md",
              "rounded-2xl border border-white/25",
              "bg-black backdrop-saturate-150 backdrop-blur-xl",
              "shadow-[0_20px_50px_rgba(0,0,0,.45)]",
              "transition-all duration-200 ease-out animate-[menuIn_.2s_ease-out]"
            )}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 18px 55px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12)",
            }}
          >
            <div className="flex items-center justify-between h-14 px-5">
              <Link
                prefetch
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center"
              >
                <Image
                  src={logo}
                  alt="Three Cuts Logo"
                  className="block h-7 w-auto drop-shadow-[0_0_1px_white]"
                />
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:text-white hover:bg-white/10 rounded-full"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="h-px w-full bg-white/10" />

            <nav className="max-h-[70vh] overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 transition-colors",
                    "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20",
                    isActive(item.href)
                      ? "bg-white/15 text-white"
                      : "text-white/90"
                  )}
                >
                  <span className="text-lg font-semibold">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={() => {
                  goOtherLocale();
                  setIsMenuOpen(false);
                }}
                className="w-full rounded-xl px-4 py-3 text-left flex items-center justify-between text-white/95 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Switch language"
              >
                <span className="text-lg font-bold">{otherLangLabel}</span>
                <Globe className="h-6 w-6" />
              </button>
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes menuIn {
          from {
            transform: translateY(-8px) scale(0.98);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </motion.header>
  );
}
