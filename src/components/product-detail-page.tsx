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
import { useTranslations } from "next-intl";
import { ProductDetailsApiResponse } from "@/app/types/productApiTypes";

export function ProductDetailPage({
  product,
}: {
  product: ProductDetailsApiResponse;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("products");
  const productData = product.data.product.data;

  console.log(`######################`, productData);

  // Validate image URL deterministically without relying on window (SSR-safe)
  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    return /^https?:\/\//.test(url) || url.startsWith("/");
  };

  // Create images array from product data with validation
  const productImages = [
    productData.image,
    ...(productData.alt_image ? [productData.alt_image] : []),
    ...(productData.images?.map((img) => img.image) || []),
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

  // Use dynamic tabs from API or fallback to default tabs
  const tabs =
    productData.tabs && productData.tabs.length > 0
      ? productData.tabs
      : [
          {
            id: -1,
            title: t("tabs.overview"),
            short_description: null,
            long_description: productData.long_desc,
            image: "",
            alt_image: null,
            icon: "",
            alt_icon: null,
            benefits: [],
          },
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
                  className="object-cover"
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
                      suppressHydrationWarning
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
                {productData.category_name && (
                  <Badge className="mb-4 p-2 text-sm">
                    {productData.category_name}
                  </Badge>
                )}
                <h1 className="text-3xl lg:text-4xl font-bold font-display mb-3 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.25]">
                  {productData.name}
                </h1>
                {productData.short_desc && (
                  <div
                    className="text-lg text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: productData.short_desc,
                    }}
                    suppressHydrationWarning
                  />
                )}
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
              <div className="flex items-center justify-center sm:justify-start border-b border-border/50 pb-4 sm:ps-4 sm:gap-3 overflow-x-auto">
                {tabs.map((tab, index) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === index ? "default" : "ghost"}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      "rounded-2xl whitespace-nowrap",
                      activeTab === index &&
                        "bg-gradient-to-r from-brand-secondary to-brand-accent-red text-brand-neutral-white text-xs sm:text-sm lg:text-base"
                    )}
                  >
                    {tab.title}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {tabs[activeTab] && (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {/* Tab Image */}
                  {tabs[activeTab].image &&
                    isValidImageUrl(tabs[activeTab].image) && (
                      <div className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden mb-6">
                        <Image
                          src={tabs[activeTab].image}
                          alt={tabs[activeTab].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                  {/* Long Description */}
                  {tabs[activeTab].long_description && (
                    <div
                      className="text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: tabs[activeTab].long_description!,
                      }}
                      suppressHydrationWarning
                    />
                  )}

                  {/* Benefits Section */}
                  {tabs[activeTab].benefits &&
                    tabs[activeTab].benefits.length > 0 && (
                      <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {tabs[activeTab].benefits.map((benefit) => (
                            <div
                              key={benefit.id}
                              className="p-6 rounded-xl bg-card border border-border/50"
                            >
                              {benefit.image &&
                                isValidImageUrl(benefit.image) && (
                                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                                    <Image
                                      src={benefit.image}
                                      alt={benefit.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                              <h4 className="text-xl font-semibold mb-2">
                                {benefit.title}
                              </h4>
                              {benefit.short_description && (
                                <div
                                  className="text-sm text-muted-foreground"
                                  dangerouslySetInnerHTML={{
                                    __html: benefit.short_description,
                                  }}
                                  suppressHydrationWarning
                                />
                              )}
                              {benefit.long_description && (
                                <div
                                  className="text-sm text-muted-foreground mt-2"
                                  dangerouslySetInnerHTML={{
                                    __html: benefit.long_description,
                                  }}
                                  suppressHydrationWarning
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Video Embed - Only show if no content in tab */}
                  {!tabs[activeTab].long_description &&
                    !tabs[activeTab].short_description &&
                    tabs[activeTab].id === -1 && (
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
                    )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
