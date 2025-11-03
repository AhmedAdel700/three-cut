"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Zap, Shield, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { ProductDetailsResponse } from "@/app/types/productsApiTypes";

export function ProductDetailPage({
  product,
}: {
  product: ProductDetailsResponse;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const locale = useLocale();
  const t = useTranslations("products");

  const productData = product.data.product.data;

  // Validate if a string is a valid image URL
  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    try {
      const parsed = new URL(url, window.location.origin);
      return (
        parsed.pathname.startsWith("/") || parsed.protocol.startsWith("http")
      );
    } catch {
      return false;
    }
  };

  // Create images array from product data with validation
  const productImages = [
    productData.image,
    ...(productData.alt_image ? [productData.alt_image] : []),
  ].filter((img) => img && isValidImageUrl(img));

  const features = [
    {
      icon: Zap,
      title: t("features.highPerformance.title"),
      description: t("features.highPerformance.description"),
    },
    {
      icon: Shield,
      title: t("features.safetyFirst.title"),
      description: t("features.safetyFirst.description"),
    },
    {
      icon: Award,
      title: t("features.qualityAssured.title"),
      description: t("features.qualityAssured.description"),
    },
  ];

  const tabs = [
    { id: "overview", label: t("tabs.overview") },
    { id: "specifications", label: t("tabs.specifications") },
    { id: "applications", label: t("tabs.applications") },
  ];

  return (
    <div className="min-h-fit section-bg">
      <section className="pt-32">
        <div className="container mx-auto px-4 lg:px-6 flex justify-center sm:justify-start">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{t("breadcrumb.home")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">
                  {t("breadcrumb.products")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{productData.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-secondary/50">
                <Image
                  src={productImages[currentImageIndex] || "/placeholder.svg"}
                  alt={productData.name}
                  fill
                  className="object-contain"
                />
              </div>
              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-[3px] transition-all bg-secondary/50",
                        index === currentImageIndex
                          ? "border-brand-primary"
                          : "border-transparent hover:border-brand-primary"
                      )}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${productData.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 p-2 text-sm">
                  {productData.category_name}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold font-display mb-3 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.25]">
                  {productData.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {productData.short_desc}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/50"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-brand-neutral-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link href={"/contact"} prefetch>
                  <Button
                    size="lg"
                    className="w-full flex-1 bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-tertiary hover:to-brand-accent-red text-brand-neutral-white font-semibold rounded-2xl transition duration-300"
                  >
                    {t("contactSales")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Card className="pb-10">
            <CardHeader className="!px-0">
              <div className="flex items-center justify-center sm:justify-start border-b border-border/50 pb-4 sm:ps-4 sm:gap-3">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "rounded-2xl",
                      activeTab === tab.id &&
                        "bg-gradient-to-r from-brand-secondary to-brand-accent-red text-brand-neutral-white text-xs sm:text-sm lg:text-base"
                    )}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "overview" && (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">
                    {productData.short_desc}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {productData.long_desc}
                  </p>
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-md mt-6">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/R29G3hUiZnU?autoplay=0&rel=0"
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {t("noSpecifications")}
                  </p>
                </div>
              )}

              {activeTab === "applications" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t("noApplications")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
