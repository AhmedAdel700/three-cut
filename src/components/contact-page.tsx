"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";
import { Toaster, toast } from "sonner";
import { Link } from "@/navigations";
import CallToAction from "./CallToAction";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactFormData = z.infer<typeof contactFormSchema>;

// --- Location (Cairo / Nasr City) ---
const THREE_CUTS_COORDS = { lat: 30.0510877, lng: 31.3494897 };
const THREE_CUTS_PLACE_URL =
  "https://www.google.com/maps/place/Three+cuts+For+CNC+Machines/@30.051088,31.34949,12z/data=!4m6!3m5!1s0x14583fc9ae990c0b:0xb62c714b690f3d78!8m2!3d30.0510877!4d31.3494897!16s%2Fg%2F11fsnwqss3?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D";

const buildMapsEmbed = (locale: string) =>
  `https://www.google.com/maps?q=${THREE_CUTS_COORDS.lat},${THREE_CUTS_COORDS.lng}&hl=${locale}&z=16&output=embed`;
const buildMapsDirections = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${THREE_CUTS_COORDS.lat},${THREE_CUTS_COORDS.lng}`;

// Reusable: remove focus outline/ring entirely
const noFocus =
  "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0";

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Success", {
        description:
          locale === "en"
            ? "We'll get back to you within 24 hours."
            : "سنعاود الاتصال بك خلال 24 ساعة.",
      });
      reset();
    } catch {
      toast.error("Error", {
        description:
          locale === "en"
            ? "Please try again or contact us directly."
            : "يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // subtle dotted texture for depth
  const dotPatternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  const contactInfo = [
    {
      icon: Phone,
      title: locale === "en" ? "Phone" : "الهاتف",
      details: ["+20 111 234 5678", "+20 112 345 6789"],
      action: "tel:+201112345678",
    },
    {
      icon: Mail,
      title: locale === "en" ? "Email" : "البريد الإلكتروني",
      details: ["info@threecuts.com", "sales@threecuts.com"],
      action: "mailto:info@threecuts.com",
    },
    {
      icon: MapPin,
      title: locale === "en" ? "Address" : "العنوان",
      details: [
        locale === "en"
          ? "Al Sarag Mall - Administrative Building 3 - Entrance 5, Nasr City, Cairo Governorate 11765, Egypt"
          : "السراج مول - المبنى الإدارى 3 - مدخل 5، مدينة نصر، محافظة القاهرة 11765، مصر",
      ],
      action: THREE_CUTS_PLACE_URL,
    },
    {
      icon: Clock,
      title: locale === "en" ? "Business Hours" : "ساعات العمل",
      details: [
        locale === "en"
          ? "Sunday - Thursday: 8:00 AM - 6:00 PM"
          : "الأحد - الخميس: 8:00 ص - 6:00 م",
        locale === "en" ? "Friday - Saturday: Closed" : "الجمعة - السبت: مغلق",
      ],
    },
  ];

  return (
    <div className="h-fit border-b">
      <Toaster richColors position="top-right" />

      {/* Hero Section (UNCHANGED) */}
      <section className="pt-16 lg:py-24 text-brand-neutral-white relative overflow-hidden border-y section-bg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={dotPatternStyle} />
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
              {locale === "en" ? "Contact Us" : "تواصل معنا"}
            </h1>
            <p className="text-lg lg:text-xl text-brand-neutral-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {locale === "en"
                ? "Ready to enhance your industrial operations? Get in touch with our experts."
                : "مستعد لتحسين عملياتك الصناعية؟ تواصل مع خبرائنا."}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4 lg:px-6 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
            {/* Form */}
            <div className="xl:col-span-2">
              <Card className="border border-brand-tertiary/40 bg-black/80 backdrop-blur-sm shadow-xl shadow-black/10 !p-0 !pb-6">
                <CardHeader className="border-b border-brand-neutral-white/5 bg-gradient-to-r from-brand-primary/50 to-brand-tertiary/30 rounded-t-2xl py-3">
                  <CardTitle className="text-2xl font-bold font-display text-brand-neutral-white">
                    {locale === "en" ? "Send us a Message" : "أرسل لنا رسالة"}
                  </CardTitle>
                  <p className="text-brand-neutral-light/80">
                    {locale === "en"
                      ? "Fill out the form below and we'll get back to you within 24 hours."
                      : "املأ النموذج أدناه وسنعاود الاتصال بك خلال 24 ساعة."}
                  </p>
                </CardHeader>

                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-brand-neutral-light"
                        >
                          {locale === "en" ? "Name" : "الاسم"} *
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder={
                            locale === "en" ? "Your full name" : "اسمك الكامل"
                          }
                          className={`rounded-2xl bg-gray-800/80 text-white placeholder:text-gray-400 border-brand-accent-light/40 ${noFocus}`}
                        />
                        {errors.name && (
                          <p className="text-sm text-brand-accent-light">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-brand-neutral-light"
                        >
                          {locale === "en" ? "Email" : "البريد الإلكتروني"} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="your.email@company.com"
                          className={`rounded-2xl bg-gray-800/80 text-white placeholder:text-gray-400 border-brand-accent-light/40 ${noFocus}`}
                        />
                        {errors.email && (
                          <p className="text-sm text-brand-accent-light">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-brand-neutral-light"
                      >
                        {locale === "en" ? "Phone" : "الهاتف"} *
                      </Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="+20 XXX XXX XXXX"
                        className={`rounded-2xl bg-gray-800/80 text-white placeholder:text-gray-400 border-brand-accent-light/40 ${noFocus}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-brand-accent-light">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-brand-neutral-light"
                      >
                        {locale === "en" ? "Message" : "الرسالة"} *
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        {...register("message")}
                        placeholder={
                          locale === "en"
                            ? "How can we help you?"
                            : "كيف يمكننا مساعدتك؟"
                        }
                        className={`rounded-2xl resize-none bg-gray-800/80 text-white placeholder:text-gray-400 border-brand-accent-light/40 ${noFocus}`}
                      />
                      {errors.message && (
                        <p className="text-sm text-brand-accent-light">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl font-semibold text-brand-neutral-white bg-gradient-to-r from-brand-tertiary to-brand-accent-red hover:from-brand-tertiary/90 hover:to-brand-accent-red/90"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-brand-neutral-white/30 border-t-brand-neutral-white rounded-full animate-spin" />
                          {locale === "en" ? "Sending..." : "جاري الإرسال..."}
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {locale === "en" ? "Submit" : "إرسال"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info */}
            <>
              <Card className="border border-brand-tertiary/40 bg-black/80 backdrop-blur-sm shadow-lg shadow-black/20 !p-0 !pb-4">
                <CardHeader className="border-b border-brand-neutral-white/5 pt-4 pb-3">
                  <CardTitle className="text-xl font-bold font-display text-brand-neutral-white">
                    {locale === "en"
                      ? "Contact Information"
                      : "معلومات الاتصال"}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-tertiary to-brand-accent-red flex items-center justify-center">
                        <info.icon className="h-6 w-6 text-brand-neutral-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-neutral-white mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, j) => (
                          <p
                            key={j}
                            className="text-sm text-brand-neutral-light/80 mb-1"
                          >
                            {info.action ? (
                              <Link
                                href={info.action}
                                className="hover:text-brand-accent-light transition-colors"
                                target={
                                  info.action.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  info.action.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {detail}
                                {info.action.startsWith("http") && (
                                  <ExternalLink className="h-3 w-3 ml-1 inline" />
                                )}
                              </Link>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          </div>

          {/* Map */}
          <div className="mt-8 xl:mt-12">
            <Card className="border border-brand-tertiary/40 bg-black/80 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/10 rounded-2xl !p-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-display text-brand-neutral-white text-center pt-5">
                  {locale === "en" ? "Visit Our Location" : "زر موقعنا"}
                </CardTitle>
                <p className="text-brand-neutral-light/80 text-center">
                  {locale === "en"
                    ? "Find us in Nasr City, Cairo Governorate, Egypt"
                    : "تجدنا في مدينة نصر، محافظة القاهرة، مصر"}
                </p>
              </CardHeader>

              <CardContent className="!p-0">
                <div className="relative h-[28rem]">
                  <iframe
                    title={
                      locale === "en" ? "Three Cuts Location" : "موقع ثري كتس"
                    }
                    src={buildMapsEmbed(locale)}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                {/* Footer with address + buttons (moved here per request) */}
                <div className="p-4 border-t border-brand-tertiary/40 bg-brand-primary/60">
                  <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                    <div className="flex-1 flex items-start gap-3">
                      <MapPin className="h-5 w-5 mt-1 text-brand-accent-light flex-shrink-0" />
                      <div className="text-brand-neutral-white">
                        <p className="font-semibold">
                          {locale === "en"
                            ? "Three cuts For CNC Machines"
                            : "ثري كتس لماكينات CNC"}
                        </p>
                        <p className="text-xs sm:text-sm opacity-90">
                          {locale === "en"
                            ? "Al Sarag Mall - Administrative Building 3 - Entrance 5, Nasr City, Cairo Governorate 11765, Egypt"
                            : "السراج مول - المبنى الإدارى 3 - مدخل 5، مدينة نصر، محافظة القاهرة 11765، مصر"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-col sm:flex-row w-full lg:w-fit justify-center">
                      <Button
                        asChild
                        variant="secondary"
                        className="rounded-xl bg-brand-tertiary text-brand-neutral-white hover:bg-brand-tertiary/90 border-0 w-full sm:w-1/2 lg:w-fit"
                      >
                        <Link
                          href={buildMapsDirections()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {locale === "en" ? "Directions" : "الاتجاهات"}
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        className="rounded-xl bg-brand-accent-red hover:bg-brand-accent-red/90 text-brand-neutral-white w-full sm:w-1/2 lg:w-fit"
                      >
                        <Link
                          href={THREE_CUTS_PLACE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {locale === "en"
                            ? "Open in Google Maps"
                            : "فتح في خرائط جوجل"}
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
