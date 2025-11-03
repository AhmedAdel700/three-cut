import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";
// import { ServicesSection } from "@/components/services-section";
import { ProductsPreview } from "@/components/products-preview";
// import { SamplesGallery } from "@/components/samples-gallery";
import { ContactTeaser } from "@/components/contact-teaser";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { fetchHomeData } from "../api/homeService";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoResponse = await fetchHomeData(locale);
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeData = await fetchHomeData(locale);
  console.log(homeData);
  return (
    <>
      <HeroCarousel heroData={homeData.data.sliders.data} />
      <AboutSection
        aboutData={homeData.data.about.data}
        aboutStructsData={homeData.data.about_structs.data}
        partnersData={homeData.data.partners.data}
      />
      {/* <ServicesSection servicesData={homeData.data.services} /> */}
      <ProductsPreview categories={homeData.data.categories} />
      {/* <SamplesGallery projects={homeData.data.projects} /> */}
      <ContactTeaser contact={homeData.data.contact} />
      <FloatingActionButton />
    </>
  );
}
