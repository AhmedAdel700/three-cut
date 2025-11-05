/* eslint-disable @typescript-eslint/no-unused-vars */
const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
import { z } from "zod";

export async function fetchContactData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/contact`, {
      headers: {
        Accept: "application/json",
        lang: lang,
      },
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch contact data:", data);
      return { success: false, message: "Failed To Fetch Contact Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendContactData(formData: ContactFormData, lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        lang: lang,
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to send contact data:", data);
      return {
        success: false,
        message: data.message || "Failed To Send Contact Data",
      };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contact data POST error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
