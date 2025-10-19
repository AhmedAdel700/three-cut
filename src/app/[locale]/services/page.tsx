import { fetchServicesData } from "@/app/api/servicesService";
import { ServicesPage } from "@/components/services-page";

export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const servicesData = await fetchServicesData(locale);
  return <ServicesPage servicesData={servicesData} />;
}
