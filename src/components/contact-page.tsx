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
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building,
  Users,
  Headphones,
  ExternalLink,
} from "lucide-react";
import { useLocale } from "next-intl";

// ✅ Sonner (Toaster)
import { Toaster, toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // ✅ Sonner success toast
        toast.success("Successe Titele hcnage it later", {
          description:
            locale === "en"
              ? "We'll get back to you within 24 hours."
              : "سنعاود الاتصال بك خلال 24 ساعة.",
        });
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      // ✅ Sonner error toast
      toast.error("error title change it later", {
        description:
          locale === "en"
            ? "Please try again or contact us directly."
            : "يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dotPatternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  const contactInfo = [
    {
      icon: Phone,
      title: locale === "en" ? "Phone" : "الهاتف",
      details: ["+966 11 234 5678", "+966 11 234 5679"],
      action: "tel:+966112345678",
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
        locale === "en" ? "Industrial District" : "المنطقة الصناعية",
        locale === "en"
          ? "Riyadh 12345, Saudi Arabia"
          : "الرياض 12345، المملكة العربية السعودية",
      ],
      action: "https://maps.google.com/?q=Riyadh+Industrial+District",
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

  const departments = [
    {
      icon: Building,
      title: locale === "en" ? "Sales Department" : "قسم المبيعات",
      description:
        locale === "en"
          ? "Get quotes and product information"
          : "احصل على عروض الأسعار ومعلومات المنتجات",
      contact: "sales@threecuts.com",
    },
    {
      icon: Headphones,
      title: locale === "en" ? "Technical Support" : "الدعم الفني",
      description:
        locale === "en"
          ? "24/7 technical assistance and maintenance"
          : "المساعدة الفنية والصيانة على مدار الساعة",
      contact: "support@threecuts.com",
    },
    {
      icon: Users,
      title: locale === "en" ? "Customer Service" : "خدمة العملاء",
      description:
        locale === "en"
          ? "General inquiries and customer support"
          : "الاستفسارات العامة ودعم العملاء",
      contact: "service@threecuts.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* ✅ Sonner Toaster (kept non-invasive) */}
      <Toaster richColors position="top-right" />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-secondary via-brand-neutral-dark to-brand-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={dotPatternStyle}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold font-display mb-6">
              contact title
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {locale === "en"
                ? "Ready to enhance your industrial operations? Get in touch with our experts to discuss your cutting system requirements."
                : "مستعد لتحسين عملياتك الصناعية؟ تواصل مع خبرائنا لمناقشة متطلبات نظام القطع الخاص بك."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-display">
                    {locale === "en" ? "Send us a Message" : "أرسل لنا رسالة"}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {locale === "en"
                      ? "Fill out the form below and we'll get back to you within 24 hours."
                      : "املأ النموذج أدناه وسنعاود الاتصال بك خلال 24 ساعة."}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">conatct name *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className="rounded-2xl"
                          placeholder={
                            locale === "en" ? "Your full name" : "اسمك الكامل"
                          }
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">conatct email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="rounded-2xl"
                          placeholder={
                            locale === "en"
                              ? "your.email@company.com"
                              : "your.email@company.com"
                          }
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">conatct phone *</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          className="rounded-2xl"
                          placeholder={
                            locale === "en"
                              ? "+966 XX XXX XXXX"
                              : "+966 XX XXX XXXX"
                          }
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">
                          {locale === "en" ? "Company" : "الشركة"} (
                          {locale === "en" ? "Optional" : "اختياري"})
                        </Label>
                        <Input
                          id="company"
                          {...register("company")}
                          className="rounded-2xl"
                          placeholder={
                            locale === "en" ? "Your company name" : "اسم شركتك"
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {locale === "en" ? "Subject" : "الموضوع"} *
                      </Label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        className="rounded-2xl"
                        placeholder={
                          locale === "en"
                            ? "What can we help you with?"
                            : "كيف يمكننا مساعدتك؟"
                        }
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">contact message *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        rows={6}
                        className="rounded-2xl resize-none"
                        placeholder={
                          locale === "en"
                            ? "Please provide details about your requirements, including the type of cutting system you're interested in, materials you'll be working with, and any specific features you need."
                            : "يرجى تقديم تفاصيل حول متطلباتك، بما في ذلك نوع نظام القطع الذي تهتم به، والمواد التي ستعمل معها، وأي ميزات محددة تحتاجها."
                        }
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-brand-primary to-brand-accent-orange hover:from-brand-primary/90 hover:to-brand-accent-orange/90 text-white font-semibold rounded-2xl"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {locale === "en" ? "Sending..." : "جاري الإرسال..."}
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-display">
                    {locale === "en"
                      ? "Contact Information"
                      : "معلومات الاتصال"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent-orange rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-sm text-muted-foreground mb-1"
                          >
                            {info.action ? (
                              <a
                                href={info.action}
                                className="hover:text-brand-primary transition-colors"
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
                              </a>
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

              {/* Departments */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-display">
                    {locale === "en" ? "Departments" : "الأقسام"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <dept.icon className="h-5 w-5 text-brand-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{dept.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {dept.description}
                          </p>
                          <a
                            href={`mailto:${dept.contact}`}
                            className="text-sm text-brand-primary hover:underline"
                          >
                            {dept.contact}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-display text-center">
                  {locale === "en" ? "Visit Our Location" : "زر موقعنا"}
                </CardTitle>
                <p className="text-muted-foreground text-center">
                  {locale === "en"
                    ? "Find us in the heart of Riyadh's industrial district"
                    : "تجدنا في قلب المنطقة الصناعية بالرياض"}
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-96 bg-secondary/20">
                  {/* Static Map Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-brand-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold font-display mb-2">
                        {locale === "en"
                          ? "Three Cuts Location"
                          : "موقع ثري كتس"}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {locale === "en"
                          ? "Industrial District, Riyadh, Saudi Arabia"
                          : "المنطقة الصناعية، الرياض، المملكة العربية السعودية"}
                      </p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-brand-primary to-brand-accent-orange hover:from-brand-primary/90 hover:to-brand-accent-orange/90 text-white font-semibold rounded-2xl"
                      >
                        <a
                          href="https://maps.google.com/?q=Riyadh+Industrial+District"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {locale === "en"
                            ? "Open in Google Maps"
                            : "فتح في خرائط جوجل"}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
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
