import { fetchContactData } from "@/app/api/contactService";
import ContactPage from "@/components/contact-page";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const contactData = await fetchContactData(locale);
  return <ContactPage contactData={contactData} />;
}
