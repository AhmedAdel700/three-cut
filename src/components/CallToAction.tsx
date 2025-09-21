"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "@/navigations";
import { PhoneCall, MessageCircle, X } from "lucide-react";
import whatsAppIcon from "@/app/assets/whatsApp.png";
import Image from "next/image";

export default function CallToAction() {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed ${
        locale === "en" ? "left-5" : "right-5"
      } bottom-5 flex flex-col gap-3 z-[100]`}
    >
      {/* Contact buttons container */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            {/* WhatsApp Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: locale === "en" ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: locale === "en" ? -20 : 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <button className="ms-1 w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-tertiary hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-primary text-brand-neutral-white shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300 border-0 backdrop-blur-sm">
                <Link
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="flex items-center justify-center w-full h-full !p-0"
                >
                  <Image
                    src={whatsAppIcon}
                    alt="WhatsApp Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </Link>
              </button>
            </motion.div>

            {/* Phone Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: locale === "en" ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: locale === "en" ? -20 : 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <button className="ms-1 w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-tertiary hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-primary text-brand-neutral-white shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300 border-0 backdrop-blur-sm">
                <Link
                  href="tel:+201234567890"
                  aria-label="Call us"
                  className="flex items-center justify-center w-full h-full !p-0"
                >
                  <PhoneCall size={24} className="w-5 h-5" />
                </Link>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      >
        <Button
          onClick={toggleExpanded}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-tertiary hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-primary text-brand-neutral-white shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300 border-0 backdrop-blur-sm"
          aria-label={
            isExpanded ? "Close contact options" : "Open contact options"
          }
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <X size={36} className="w-7 h-7" />
            ) : (
              <MessageCircle size={36} className="w-7 h-7" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
}
