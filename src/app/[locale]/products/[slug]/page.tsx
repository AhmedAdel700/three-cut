import { ProductDetailPage } from "@/components/product-detail-page";
import { fetchProductDetailsData } from "@/app/api/productService";
import { Metadata } from "next";
import { SeoItem } from "@/app/types/productApiTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const seoResponse = await fetchProductDetailsData(locale, slug);

  const seo: SeoItem | undefined = seoResponse?.seo?.[1];
  if (!seo) return {};

  // Define allowed OG types for strict typing
  const allowedOgTypes = [
    "article",
    "website",
    "book",
    "profile",
    "music.song",
    "music.album",
    "music.playlist",
    "music.radio_station",
    "video.movie",
    "video.episode",
    "video.tv_show",
    "video.other",
  ] as const;

  type OgType = (typeof allowedOgTypes)[number];

  const ogType: OgType = allowedOgTypes.includes(seo.og_type as OgType)
    ? (seo.og_type as OgType)
    : "website";

  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    metadataBase: seo.canonical ? new URL(seo.canonical) : undefined,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.og_title ?? seo.title ?? undefined,
      description: seo.og_description ?? seo.description ?? undefined,
      url: seo.og_url ?? seo.canonical ?? undefined,
      type: ogType,
      siteName: seo.og_site_name ?? undefined,
      images: seo.og_image
        ? [
            {
              url: seo.og_image,
              width: 1200,
              height: 630,
              alt: seo.title ?? "",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitter_title ?? seo.title ?? undefined,
      description: seo.twitter_description ?? seo.description ?? undefined,
      site: seo.twitter_site ?? undefined,
      creator: seo.twitter_creator ?? undefined,
      images: seo.twitter_image ? [seo.twitter_image] : [],
    },
    robots: seo.robots ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const productDetailsData = await fetchProductDetailsData(locale, slug);

  return <ProductDetailPage product={productDetailsData} />;
}
