import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ProductsPreview } from "@/components/products-preview";
import { SamplesGallery } from "@/components/samples-gallery";
import { ContactTeaser } from "@/components/contact-teaser";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
export default function Home() {
  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <ServicesSection />
      <ProductsPreview />
      <SamplesGallery />
      <ContactTeaser />
      <FloatingActionButton />
    </>
  );
}
