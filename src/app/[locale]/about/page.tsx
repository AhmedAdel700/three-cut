import { fetchAboutData } from "@/app/api/aboutService";
import { AboutPage } from "@/components/about-page";

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
