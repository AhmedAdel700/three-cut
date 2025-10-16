import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ProductsPreview } from "@/components/products-preview";
import { SamplesGallery } from "@/components/samples-gallery";
import { ContactTeaser } from "@/components/contact-teaser";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { fetchHomeData } from "../api/homeService";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeData = await fetchHomeData(locale);

  return (
    <>
      <HeroCarousel heroData={homeData.data.sliders.data} />
      <AboutSection />
      <ServicesSection />
      <ProductsPreview />
      <SamplesGallery />
      <ContactTeaser />
      <FloatingActionButton />
    </>
  );
}
