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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Header blur on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC to close + lock body scroll when open
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
    { href: "/products", label: locale === "ar" ? "المنتجات" : "Products" },
    { href: "/contact", label: locale === "ar" ? "تواصل" : "Contact" },
  ];

  const otherLangLabel = locale === "en" ? "العربية" : "English";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-[100vw]",
        isScrolled ? "backdrop-blur-md" : "bg-transparent"
      )}
      style={{
        backgroundColor: isScrolled ? "rgba(87, 34, 34, 0.65)" : "transparent",
      }}
    >
      <div className="md:container mx-auto pt-3 md:pt-0 px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link prefetch href="/" className="flex items-center group">
            <div className="relative w-28 h-10 lg:w-48 transition-transform group-hover:scale-105">
              <Image
                src={logo}
                alt="Three Cuts Logo"
                className="w-full h-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-brand-primary hover:text-brand-secondary hover:bg-white/10 bg-transparent -mt-3"
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
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/55 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Glass sheet */}
          <div
            className={cn(
              // Top margin (a bit more) + safe-area breathing room
              "mt-8 md:mt-12 w-[92vw] max-w-md",
              // Neat rounded card with subtle border
              "rounded-2xl border border-white/15",
              // Glass look: more saturation for clarity + strong blur
              "bg-white/10 backdrop-saturate-150 backdrop-blur-xl",
              // Shadow & soft inner highlight
              "shadow-[0_20px_50px_rgba(0,0,0,.45)]",
              // Smooth entry
              "transition-all duration-200 ease-out animate-[menuIn_.2s_ease-out]"
            )}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 18px 55px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12)",
            }}
          >
            {/* Top bar */}
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
                  className="h-7 w-auto"
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

            {/* Hairline divider */}
            <div className="h-px w-full bg-white/10" />

            {/* Links (scrollable if long) */}
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

              {/* Language switcher */}
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

      {/* tiny keyframes for pop effect */}
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
    </header>
  );
}
