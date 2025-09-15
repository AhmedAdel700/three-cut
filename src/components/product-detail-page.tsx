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
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Download,
  Phone,
  Mail,
  Star,
  Zap,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockProducts,
  productCategories,
  type Product,
} from "@/lib/data/products";
import { useLocale } from "next-intl";

interface ProductDetailPageProps {
  product: Product;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const locale = useLocale();

  const categoryName = productCategories.find(
    (cat) => cat.id === product.category
  );
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const features = [
    {
      icon: Zap,
      title: locale === "en" ? "High Performance" : "أداء عالي",
      description:
        locale === "en"
          ? "Industry-leading cutting speeds and precision"
          : "سرعات قطع ودقة رائدة في الصناعة",
    },
    {
      icon: Shield,
      title: locale === "en" ? "Safety First" : "السلامة أولاً",
      description:
        locale === "en"
          ? "Advanced safety systems and protocols"
          : "أنظمة وبروتوكولات السلامة المتقدمة",
    },
    {
      icon: Award,
      title: locale === "en" ? "Quality Assured" : "جودة مضمونة",
      description:
        locale === "en"
          ? "ISO certified manufacturing and testing"
          : "تصنيع واختبار معتمد من ISO",
    },
  ];

  const tabs = [
    { id: "overview", label: locale === "en" ? "Overview" : "نظرة عامة" },
    {
      id: "specifications",
      label: locale === "en" ? "Specifications" : "المواصفات",
    },
    {
      id: "applications",
      label: locale === "en" ? "Applications" : "التطبيقات",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <section className="py-6">
        <div className="container mx-auto px-4 lg:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Our Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {locale === "en" ? product.name : product.nameAr}
                </BreadcrumbPage>
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
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={locale === "en" ? product.name : product.nameAr}
                  fill
                  className="object-cover"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {product.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-primary text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {locale === "en" ? "Featured" : "مميز"}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                        index === currentImageIndex
                          ? "border-brand-primary"
                          : "border-transparent hover:border-border"
                      )}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${
                          locale === "en" ? product.name : product.nameAr
                        } ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4">
                  {locale === "en" ? categoryName?.name : categoryName?.nameAr}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold font-display mb-4 bg-gradient-to-r from-brand-primary to-brand-accent-red bg-clip-text text-transparent">
                  {locale === "en" ? product.name : product.nameAr}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {locale === "en"
                    ? product.description
                    : product.descriptionAr}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/50"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-secondary to-brand-accent-red rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-white" />
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

              {/* Price and Actions */}
              <div className="space-y-4">
                <div className="text-2xl font-bold text-brand-accent-red">
                  {product.price ||
                    (locale === "en" ? "Contact for pricing" : "اتصل للسعر")}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-brand-secondary to-brand-accent-red hover:from-brand-tertiary hover:to-brand-accent-red text-white font-semibold rounded-2xl"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {locale === "en" ? "Request Quote" : "طلب عرض سعر"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {locale === "en" ? "Contact Sales" : "اتصل بالمبيعات"}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    {locale === "en" ? "Share" : "مشاركة"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {locale === "en" ? "Download Brochure" : "تحميل الكتيب"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <Card className="mb-16">
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "rounded-2xl",
                      activeTab === tab.id &&
                        "bg-gradient-to-r from-brand-secondary to-brand-accent-red text-white"
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
                    {locale === "en"
                      ? product.description
                      : product.descriptionAr}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "en"
                      ? "This cutting system represents the pinnacle of industrial cutting technology, combining precision engineering with advanced automation to deliver exceptional results in demanding manufacturing environments."
                      : "يمثل نظام القطع هذا قمة تقنية القطع الصناعية، حيث يجمع بين الهندسة الدقيقة والأتمتة المتقدمة لتقديم نتائج استثنائية في بيئات التصنيع الصعبة."}
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-border/50"
                      >
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              )}

              {activeTab === "applications" && (
                <div>
                  <h3 className="text-xl font-bold font-display mb-6">
                    {locale === "en"
                      ? "Key Applications"
                      : "التطبيقات الرئيسية"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(locale === "en"
                      ? product.applications
                      : product.applicationsAr
                    ).map((application, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="w-2 h-2 bg-brand-accent-red rounded-full flex-shrink-0" />
                        <span>{application}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold font-display mb-8 text-center">
                {locale === "en" ? "Related Products" : "منتجات ذات صلة"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Card
                    key={relatedProduct.id}
                    className="group hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        alt={
                          locale === "en"
                            ? relatedProduct.name
                            : relatedProduct.nameAr
                        }
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold font-display mb-2 group-hover:text-brand-accent-red transition-colors">
                        {locale === "en"
                          ? relatedProduct.name
                          : relatedProduct.nameAr}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {locale === "en"
                          ? relatedProduct.description
                          : relatedProduct.descriptionAr}
                      </p>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="w-full group-hover:bg-brand-accent-red/10 group-hover:text-brand-accent-red transition-colors"
                      >
                        <Link href={`/products/${relatedProduct.slug}`}>
                          {locale === "en" ? "View Details" : "عرض التفاصيل"}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
