import { fetchAboutData } from "@/app/api/aboutService";
import { AboutPage } from "@/components/about-page";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoResponse = await fetchAboutData(locale);
  const seo = seoResponse?.seo?.[1];

  return {
    title: seo?.title,
    description: seo?.description,
    metadataBase: new URL(seo?.canonical),
    alternates: {
      canonical: seo?.canonical,
    },
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: seo?.og_url,
      type: seo?.og_type,
      siteName: seo?.og_site_name,
      images: [
        {
          url: seo?.og_image,
          width: 1200,
          height: 630,
          alt: seo?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitter_title,
      description: seo?.twitter_description,
      site: seo?.twitter_site,
      creator: seo?.twitter_creator,
      images: [seo?.twitter_image],
    },
    robots: seo?.robots,
  };
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const aboutData = await fetchAboutData(locale);
  {
    return <AboutPage aboutData={aboutData} />;
  }
}
