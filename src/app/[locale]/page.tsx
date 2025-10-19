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
      <AboutSection
        aboutData={homeData.data.about.data}
        aboutStructsData={homeData.data.about_structs.data}
        partnersData={homeData.data.partners.data}
      />
      <ServicesSection servicesData={homeData.data.services} />
      <ProductsPreview categories={homeData.data.categories} />
      <SamplesGallery projects={homeData.data.projects} />
      <ContactTeaser contact={homeData.data.contact} />
      <FloatingActionButton />
    </>
  );
}
