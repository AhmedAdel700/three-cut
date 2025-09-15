"use client";

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useState } from "react";

interface LanguageSwitcherProps {
  currentLocale: "en" | "ar";
  onLocaleChange: (locale: "en" | "ar") => void;
}

export function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    onLocaleChange(newLocale);

    // Update document direction
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:bg-secondary/80"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {currentLocale === "en" ? "العربية" : "English"}
      </span>
    </Button>
  );
}
