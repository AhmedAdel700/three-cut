const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchServicesData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/services`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch services data:", data);
      return { success: false, message: "Failed To Services Home Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
