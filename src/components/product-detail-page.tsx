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
import { Zap, Shield, Award, ChevronLeft, ChevronRight } from "lucide-react";
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

  // Clean HTML content and ensure proper table structure
  const cleanTableHTML = (html: string) => {
    if (!html) return html;

    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Remove wrapper divs
    const wrapperDivs = temp.querySelectorAll(
      "div._tableContainer_1rjym_1, div._tableWrapper_1rjym_13, div.group"
    );
    wrapperDivs.forEach((wrapper) => {
      const table = wrapper.querySelector("table");
      if (table && wrapper.parentNode) {
        wrapper.parentNode.replaceChild(table, wrapper);
      }
    });

    const tables = temp.querySelectorAll("table");

    tables.forEach((table) => {
      // Remove attributes
      table.removeAttribute("style");
      table.removeAttribute("class");
      table.removeAttribute("data-start");
      table.removeAttribute("data-end");
      table.removeAttribute("tabindex");

      // Get all rows
      const allRows = Array.from(table.querySelectorAll("tr"));

      // Clean all cells first
      const allCells = table.querySelectorAll("td, th");
      allCells.forEach((cell) => {
        cell.removeAttribute("data-start");
        cell.removeAttribute("data-end");
        cell.removeAttribute("data-col-size");
        cell.removeAttribute("tabindex");
        cell.removeAttribute("width");

        const el = cell as HTMLTableCellElement;
        const textAlign = el.style.textAlign;
        cell.removeAttribute("style");
        if (textAlign) {
          el.style.textAlign = textAlign;
        }

        const text = cell.textContent?.trim().replace(/\u00a0/g, "");
        if (!text || text === "") {
          cell.remove();
        }
      });

      // Remove empty rows
      allRows.forEach((row) => {
        row.removeAttribute("data-start");
        row.removeAttribute("data-end");
        const remainingCells = row.querySelectorAll("td, th");
        if (remainingCells.length === 0) {
          row.remove();
        }
      });

      // Restructure table with proper thead/tbody if needed
      const remainingRows = Array.from(table.querySelectorAll("tr"));
      if (remainingRows.length > 0) {
        let thead = table.querySelector("thead");
        let tbody = table.querySelector("tbody");

        // If no thead exists, create one from first row
        if (!thead && remainingRows.length > 0) {
          thead = document.createElement("thead");
          const firstRow = remainingRows[0];

          // Convert first row cells to th if they're td
          const firstRowCells = firstRow.querySelectorAll("td, th");
          firstRowCells.forEach((cell) => {
            if (cell.tagName.toLowerCase() === "td") {
              const th = document.createElement("th");
              th.innerHTML = cell.innerHTML;
              if (cell.hasAttribute("style")) {
                th.setAttribute("style", cell.getAttribute("style")!);
              }
              cell.parentNode?.replaceChild(th, cell);
            }
          });

          thead.appendChild(firstRow);
          table.insertBefore(thead, table.firstChild);
        }

        // If no tbody exists, create one with remaining rows
        if (!tbody) {
          tbody = document.createElement("tbody");
          remainingRows.slice(1).forEach((row) => {
            // Convert th to td in body rows
            const cells = row.querySelectorAll("th");
            cells.forEach((th) => {
              const td = document.createElement("td");
              td.innerHTML = th.innerHTML;
              if (th.hasAttribute("style")) {
                td.setAttribute("style", th.getAttribute("style")!);
              }
              th.parentNode?.replaceChild(td, th);
            });
            tbody!.appendChild(row);
          });
          table.appendChild(tbody);
        }

        // Clean thead and tbody attributes
        if (thead) {
          thead.removeAttribute("data-start");
          thead.removeAttribute("data-end");
        }
        if (tbody) {
          tbody.removeAttribute("data-start");
          tbody.removeAttribute("data-end");
        }
      }

      // Remove colgroup if exists
      const colgroup = table.querySelector("colgroup");
      if (colgroup) {
        colgroup.remove();
      }
    });

    return temp.innerHTML;
  };

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

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";

    // If already in embed format, return as is
    if (url.includes("youtube.com/embed")) return url;

    // Extract video ID from youtu.be or youtube.com/watch?v=...
    const match = url.match(/(?:youtu\.be\/|v=)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  // Create images array with title
  const productImagesWithTitles = [
    {
      url: productData.image,
      title: productData.name,
    },
    ...(productData.alt_image
      ? [{ url: productData.alt_image, title: productData.name }]
      : []),
    ...(productData.images?.map((img) => ({
      url: img.image,
      title: img.title || productData.name,
    })) || []),
  ].filter((img) => img.url && isValidImageUrl(img.url));

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
              <div className="relative h-52 lg:h-[400px] rounded-2xl overflow-hidden bg-secondary/5">
                <Image
                  src={
                    productImagesWithTitles[currentImageIndex].url ||
                    "/placeholder.svg"
                  }
                  alt={productImagesWithTitles[currentImageIndex].title}
                  fill
                  className="object-contain lg:object-cover"
                />

                {/* Image Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm sm:text-base lg:text-lg text-center py-2">
                  {productImagesWithTitles[currentImageIndex].title}
                </div>

                {/* Left Arrow */}
                {productImagesWithTitles.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? productImagesWithTitles.length - 1
                            : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === productImagesWithTitles.length - 1
                            ? 0
                            : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {productImagesWithTitles.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productImagesWithTitles.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-[3px] transition-all bg-secondary/5",
                        index === currentImageIndex
                          ? "border-[#d61414]"
                          : "border-transparent hover:border-brand-primary"
                      )}
                      suppressHydrationWarning
                    >
                      <Image
                        src={img.url || "/placeholder.svg"}
                        alt={img.title}
                        fill
                        className="object-cover lg:object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div>
                {productData.category_name && (
                  <Badge className="mb-6 p-2 text-sm">
                    {productData.category_name}
                  </Badge>
                )}
                <h1 className="text-3xl lg:text-4xl font-bold font-display bg-gradient-to-b from-brand-accent-light to-brand-quaternary bg-clip-text text-transparent !leading-[1.25]">
                  {productData.name}
                </h1>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-8">
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
              <div className="flex flex-wrap items-center justify-start border-b border-border/50 pb-4 ps-4 sm:gap-3">
                {tabs.map((tab, index) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === index ? "default" : "ghost"}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      "rounded-2xl whitespace-nowrap mb-2 sm:mb-0",
                      activeTab === index &&
                        "bg-gradient-to-r from-brand-secondary to-brand-accent-red text-brand-neutral-white text-xs sm:text-sm lg:text-base"
                    )}
                  >
                    {tab.title}
                  </Button>
                ))}

                {/* Video Tab */}
                {productData.youtube_link && (
                  <Button
                    variant={activeTab === tabs.length ? "default" : "ghost"}
                    onClick={() => setActiveTab(tabs.length)}
                    className={cn(
                      "rounded-2xl whitespace-nowrap mb-2 sm:mb-0",
                      activeTab === tabs.length &&
                        "bg-gradient-to-r from-brand-secondary to-brand-accent-red text-brand-neutral-white text-xs sm:text-sm lg:text-base"
                    )}
                  >
                    {t("Video")}
                  </Button>
                )}

                {/* Download PDF Button */}
                {productData.pdf && (
                  <a
                    href={productData.pdf}
                    download
                    target="_blank"
                    className="rounded-2xl mb-2 sm:mb-0 bg-gray-200 text-gray-800 hover:bg-gray-300 inline-block"
                  >
                    <Button className="w-full">{t("Download PDF")}</Button>
                  </a>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {activeTab < tabs.length && tabs[activeTab] && (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {/* Tab Image */}
                  {tabs[activeTab].image &&
                    isValidImageUrl(tabs[activeTab].image) && (
                      <div className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden mb-6">
                        <Image
                          src={tabs[activeTab].image}
                          alt={tabs[activeTab].title}
                          fill
                          className="object-contain lg:object-cover"
                        />
                      </div>
                    )}

                  {/* Long Description */}
                  {tabs[activeTab].long_description && (
                    <div
                      className={cn(
                        "text-muted-foreground leading-relaxed",
                        tabs[activeTab].long_description?.includes("<table") &&
                          "w-full overflow-x-auto " +
                            "[&_table]:w-full [&_table]:border-collapse [&_table]:mt-1 [&_table]:rounded-none [&_table]:overflow-hidden px-2 " +
                            "[&_table]:border [&_table]:border-white " +
                            "[&_td]:border [&_td]:border-white/15 [&_td]:p-4 [&_td]:text-sm [&_td]:align-middle [&_td]:text-white " +
                            "[&_th]:border [&_th]:border-white/15 [&_th]:p-4 [&_th]:text-sm [&_th]:font-bold [&_th]:align-middle [&_th]:text-white " +
                            "[&_thead]:bg-white/10 " +
                            "[&_tbody_tr]:bg-transparent [&_tbody_tr:hover]:bg-white/10 [&_tbody_tr]:transition-colors"
                      )}
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof window !== "undefined"
                            ? cleanTableHTML(tabs[activeTab].long_description!)
                            : tabs[activeTab].long_description!,
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
                                      className="object-contain lg:object-cover"
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
                </div>
              )}

              {/* Video Tab Content */}
              {activeTab === tabs.length && productData.youtube_link && (
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-md mt-6">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getYoutubeEmbedUrl(productData.youtube_link)}
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
