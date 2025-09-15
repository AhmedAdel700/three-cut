"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Grid, List, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProducts, productCategories } from "@/lib/data/products";
import { useLocale } from "next-intl";

export function ProductsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const locale = useLocale();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          (locale === "en" ? product.name : product.nameAr)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (locale === "en" ? product.description : product.descriptionAr)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (locale === "en" ? a.name : a.nameAr).localeCompare(
            locale === "en" ? b.name : b.nameAr
          );
        case "category":
          return a.category.localeCompare(b.category);
        case "featured":
          return b.featured ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, locale]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-secondary via-brand-neutral-dark to-brand-secondary text-white relative overflow-hidden">
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
            <h1 className="text-4xl lg:text-6xl font-bold font-display mb-6">
              Product Title
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {locale === "en"
                ? "Discover our comprehensive range of cutting-edge industrial cutting systems designed for precision, efficiency, and reliability."
                : "اكتشف مجموعتنا الشاملة من أنظمة القطع الصناعية المتطورة المصممة للدقة والكفاءة والموثوقية."}
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  locale === "en"
                    ? "Search products..."
                    : "البحث في المنتجات..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-2xl"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48 rounded-2xl">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue
                    placeholder={
                      locale === "en" ? "All Categories" : "جميع الفئات"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {locale === "en" ? "All Categories" : "جميع الفئات"}
                  </SelectItem>
                  {productCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {locale === "en" ? category.name : category.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">
                    {locale === "en" ? "Name" : "الاسم"}
                  </SelectItem>
                  <SelectItem value="category">
                    {locale === "en" ? "Category" : "الفئة"}
                  </SelectItem>
                  <SelectItem value="featured">
                    {locale === "en" ? "Featured" : "مميز"}
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-secondary rounded-2xl p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-xl"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-xl"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            {locale === "en"
              ? `Showing ${filteredAndSortedProducts.length} of ${mockProducts.length} products`
              : `عرض ${filteredAndSortedProducts.length} من ${mockProducts.length} منتج`}
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold font-display mb-4">
                {locale === "en"
                  ? "No products found"
                  : "لم يتم العثور على منتجات"}
              </h3>
              <p className="text-muted-foreground mb-8">
                {locale === "en"
                  ? "Try adjusting your search criteria or browse all categories."
                  : "حاول تعديل معايير البحث أو تصفح جميع الفئات."}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                {locale === "en" ? "Clear Filters" : "مسح المرشحات"}
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-6"
              )}
            >
              {filteredAndSortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className={cn(
                    "group hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden",
                    viewMode === "list" && "flex flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      viewMode === "grid" ? "h-64" : "w-64 h-48 flex-shrink-0"
                    )}
                  >
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={locale === "en" ? product.name : product.nameAr}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-dark/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge
                        className={cn(
                          "text-xs",
                          locale === "en"
                            ? productCategories.find(
                                (cat) => cat.id === product.category
                              )?.name === product.category
                            : productCategories.find(
                                (cat) => cat.id === product.category
                              )?.nameAr === product.categoryAr
                        )}
                      >
                        {locale === "en"
                          ? product.category
                              .replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())
                          : product.categoryAr}
                      </Badge>
                      {product.featured && (
                        <Badge className="bg-brand-primary text-white">
                          <Star className="h-3 w-3 mr-1" />
                          {locale === "en" ? "Featured" : "مميز"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent
                    className={cn(
                      "p-6",
                      viewMode === "list" &&
                        "flex-1 flex flex-col justify-between"
                    )}
                  >
                    <div>
                      <h3 className="text-xl font-bold font-display mb-3 group-hover:text-brand-primary transition-colors">
                        {locale === "en" ? product.name : product.nameAr}
                      </h3>

                      <p
                        className={cn(
                          "text-muted-foreground leading-relaxed mb-4",
                          viewMode === "grid"
                            ? "text-sm line-clamp-3"
                            : "text-base line-clamp-2"
                        )}
                      >
                        {locale === "en"
                          ? product.description
                          : product.descriptionAr}
                      </p>

                      {viewMode === "list" && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">
                            {locale === "en"
                              ? "Key Applications:"
                              : "التطبيقات الرئيسية:"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(locale === "en"
                              ? product.applications
                              : product.applicationsAr
                            )
                              .slice(0, 3)
                              .map((app, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {app}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-brand-primary">
                        {product.price ||
                          (locale === "en"
                            ? "Contact for pricing"
                            : "اتصل للسعر")}
                      </span>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors"
                      >
                        <Link href={`/products/${product.slug}`}>
                          {locale === "en" ? "View Details" : "عرض التفاصيل"}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
