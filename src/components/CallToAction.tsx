"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Link } from "@/navigations";
import { PhoneCall, MessageCircle, X } from "lucide-react";
import whatsAppIcon from "@/app/assets/whatsApp.png";
import Image from "next/image";
import { PhonesResponse, PhoneItem } from "@/app/types/phoneApiTypes";

export default function CallToAction({
  phonesData,
}: {
  phonesData: PhonesResponse;
}) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // extract phones safely
  const phones = phonesData?.data?.phones || [];

  // helper cleaners
  const cleanNumber = (num: string) => num.replace(/[^0-9]/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed ${
        locale === "en" ? "left-5" : "right-5"
      } bottom-5 flex flex-col gap-3 z-[100]`}
    >
      {/* Expanded contact buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            {/* Loop all phones from API */}
            {phones.map((item: PhoneItem, idx: number) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: locale === "en" ? -20 : 20,
                }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  x: locale === "en" ? -20 : 20,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                  delay: idx * 0.05,
                }}
              >
                <button className="ms-1 w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-tertiary hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-primary text-brand-neutral-white shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300 border-0 backdrop-blur-sm">
                  <Link
                    href={
                      item.type === "whatsapp"
                        ? `https://wa.me/${cleanNumber(item.phone)}`
                        : `tel:${cleanNumber(item.phone)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full !p-0"
                  >
                    {item.type === "whatsapp" ? (
                      <Image
                        src={whatsAppIcon}
                        alt="WhatsApp Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <PhoneCall size={24} className="w-5 h-5" />
                    )}
                  </Link>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      >
        <button
          onClick={toggleExpanded}
          className="w-14 h-14 flex justify-center items-center rounded-full bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-tertiary hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-primary text-brand-neutral-white shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300 border-0 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <X size={36} className="w-7 h-7" />
            ) : (
              <MessageCircle size={32} className="w-6 h-6" />
            )}
          </motion.div>
        </button>
      </motion.div>
    </motion.div>
  );
}
