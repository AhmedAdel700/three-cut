"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Grid, List, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { ProductsApiResponse } from "@/app/types/productsApiTypes";

export function ProductsListPage({
  productsData,
}: {
  productsData: ProductsApiResponse;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const t = useTranslations("products");
  const locale = useLocale();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData.data.products.data;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category_id === selectedCategory
      );
    }

    return filtered;
  }, [selectedCategory, productsData.data.products.data]);

  return (
    <div className="min-h-fit">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 text-brand-neutral-white relative overflow-hidden section-bg">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-4 bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent leading-tight">
              {productsData.data.products.title || t("title")}
            </h1>
            <div
              className="text-lg lg:text-xl text-brand-neutral-white/90 max-w-3xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  productsData.data.products.short_desc || t("description"),
              }}
              suppressHydrationWarning
            />
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12 section-bg border-y">
        <div className="container mx-auto px-4 lg:px-6 mb-5">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {t("showingResults", {
                count: filteredAndSortedProducts.length,
                total: productsData.data.products.data.length,
              })}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48 rounded-2xl">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t("allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allCategories")}</SelectItem>
                  {productsData.data.categories.data.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="hidden lg:flex items-center gap-1 bg-secondary rounded-2xl p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-xl"
                  suppressHydrationWarning
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-xl"
                  suppressHydrationWarning
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-6">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold font-display mb-4">
                {t("noProductsFound")}
              </h3>
              <p className="text-muted-foreground mb-8">
                {t("noProductsDescription")}
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("all");
                }}
                suppressHydrationWarning
              >
                {t("clearFilters")}
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                  : "flex flex-col gap-6"
              )}
            >
              {filteredAndSortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className={cn(
                    "!p-0 h-full min-h-[520px] flex flex-col group overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm",
                    viewMode === "list" && "flex-row min-h-[200px]"
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      viewMode === "grid" ? "h-64" : "w-64 h-64 flex-shrink-0"
                    )}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.alt_image || product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-dark/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="text-xs">{product.category_name}</Badge>
                    </div>
                  </div>
                  <CardContent
                    className={cn(
                      "p-6 flex flex-col justify-between flex-1",
                      viewMode === "list" &&
                        "flex-1 flex flex-col justify-between"
                    )}
                  >
                    <div>
                      <h3 className="text-xl font-bold font-display mb-3">
                        {product.name}
                      </h3>
                      <div
                        className={cn(
                          "text-muted-foreground leading-relaxed mb-4",
                          viewMode === "grid"
                            ? "text-sm line-clamp-3"
                            : "text-base line-clamp-2"
                        )}
                        dangerouslySetInnerHTML={{ __html: product.short_desc }}
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        href={"/contact"}
                        className="text-sm font-medium text-brand-accent-red"
                      >
                        {t("contactForPricing")}
                      </Link>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="transition-colors"
                      >
                        <Link href={`/products/${product.slug}`}>
                          {t("viewDetails")}
                          {locale === "en" ? (
                            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                          ) : (
                            <ArrowLeft className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                          )}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductsListPage;
