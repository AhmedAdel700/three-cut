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
import { Phone, Mail, MapPin, Send, ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/navigations";
import { ContactPageResponse } from "@/app/types/contactApiTypes";
import { sendContactData } from "@/app/api/contactService";

const noFocus =
  "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0";

export function ContactPage({
  contactData,
}: {
  contactData: ContactPageResponse;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("contact");
  const locale = useLocale();
  const contactFormSchema = z.object({
    name: z.string().min(2, t("Name must be at least 2 characters")),
    email: z.string().email(t("Please enter a valid email address")),
    phone: z.string().min(10, t("Please enter a valid phone number")),
    message: z.string().min(10, t("Message must be at least 10 characters")),
  });
  type ContactFormData = z.infer<typeof contactFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await sendContactData(data, locale);

      if (!res.success) throw new Error(res.message);

      toast.success(t("toast.successTitle"), {
        description: t("toast.successDesc"),
      });
      reset();
    } catch {
      toast.error(t("toast.errorTitle"), {
        description: t("toast.errorDesc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { data } = contactData;
  const contact = data.contact;
  const info = contact.data;

  const dotPatternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t("phone"),
      details: [info.phone].filter(Boolean),
      action: `tel:${info.phone}`,
    },
    {
      icon: Mail,
      title: t("email"),
      details: [info.email],
      action: `mailto:${info.email}`,
    },
    {
      icon: MapPin,
      title: t("address"),
      details: [info.address],
      action: info.map_link,
    },
  ];

  return (
    <div className="h-fit border-b">
      {/* --- Hero Section --- */}
      <section className="pt-16 lg:py-24 text-brand-neutral-white relative overflow-hidden border-y section-bg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={dotPatternStyle} />
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
            {contact.title}
          </h1>
          <p className="text-lg lg:text-xl text-brand-neutral-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {contact.short_desc}
          </p>
        </div>
      </section>

      {/* --- Contact Form + Info --- */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4 lg:px-6 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
            {/* --- Contact Form --- */}
            <div className="xl:col-span-2">
              <Card className="border border-brand-tertiary/40 bg-black/80 backdrop-blur-sm shadow-xl shadow-black/10 !p-0 !pb-6">
                <CardHeader className="border-b border-brand-neutral-white/5 bg-gradient-to-r from-brand-primary/50 to-brand-tertiary/30 rounded-t-2xl py-3">
                  <CardTitle className="text-2xl font-bold font-display text-brand-neutral-white">
                    {t("sendMessage")}
                  </CardTitle>
                  <p className="text-brand-neutral-light/80">{t("formDesc")}</p>
                </CardHeader>

                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-brand-neutral-light"
                        >
                          {t("name")} *
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder={t("namePlaceholder")}
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
                          {t("email")} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder={t("emailPlaceholder")}
                          className={`rounded-2xl bg-gray-800/80 text-white placeholder:text-gray-400 border-brand-accent-light/40 ${noFocus}`}
                        />
                        {errors.email && (
                          <p className="text-sm text-brand-accent-light">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-brand-neutral-light"
                      >
                        {t("phone")} *
                      </Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder={t("phonePlaceholder")}
                        className={`rounded-2xl bg-gray-800/80 text-white placeholder:text-gray-400 border-brand-accent-light/40 ${noFocus}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-brand-accent-light">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-brand-neutral-light"
                      >
                        {t("message")} *
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        {...register("message")}
                        placeholder={t("messagePlaceholder")}
                        className={`rounded-2xl resize-none bg-gray-800/80 text-white placeholder:text-gray-400 border-brand-accent-light/40 ${noFocus}`}
                      />
                      {errors.message && (
                        <p className="text-sm text-brand-accent-light">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl font-semibold text-brand-neutral-white bg-gradient-to-r from-brand-tertiary to-brand-accent-red hover:from-brand-tertiary/90 hover:to-brand-accent-red/90"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-brand-neutral-white/30 border-t-brand-neutral-white rounded-full animate-spin" />
                          {t("sending")}
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t("submit")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* --- Info Card --- */}
            <Card className="border border-brand-tertiary/40 bg-black/80 backdrop-blur-sm shadow-lg shadow-black/20 !p-0 !pb-4">
              <CardHeader className="border-b border-brand-neutral-white/5 pt-4 pb-3">
                <CardTitle className="text-xl font-bold font-display text-brand-neutral-white">
                  {t("contactInformation")}
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
          </div>

          {/* --- Map --- */}
          <div className="mt-8 xl:mt-12">
            <Card className="border border-brand-tertiary/40 bg-black/80 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/10 rounded-2xl !p-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-display text-brand-neutral-white text-center pt-5">
                  {t("visitLocation")}
                </CardTitle>
                <p className="text-brand-neutral-light/80 text-center">
                  {info.address}
                </p>
              </CardHeader>

              <CardContent className="!p-0">
                <div className="relative h-[28rem]">
                  <iframe
                    title={t("mapTitle")}
                    src={info.map_embed}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="p-4 border-t border-brand-tertiary/40 bg-brand-primary/60">
                  <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                    <div className="flex-1 flex items-start gap-3">
                      <MapPin className="h-5 w-5 mt-1 text-brand-accent-light flex-shrink-0" />
                      <div className="text-brand-neutral-white">
                        <p className="font-semibold">{info.title}</p>
                        <p className="text-xs sm:text-sm opacity-90">
                          {info.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-col sm:flex-row w-full lg:w-fit justify-center">
                      <Button
                        asChild
                        className="rounded-xl bg-brand-accent-red hover:bg-brand-accent-red/90 text-brand-neutral-white w-full sm:w-1/2 lg:w-fit"
                      >
                        <Link
                          href={info.map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("openGoogleMaps")}
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
