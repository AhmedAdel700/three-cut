/* -------------------- Main Response -------------------- */
export interface ProductDetailsApiResponse {
  seo: SeoItem[];
  success: boolean;
  message: string;
  data: {
    product: {
      data: ProductData;
    };
  };
}

/* -------------------- SEO Types -------------------- */
export interface SeoItem {
  "@context"?: string;
  "@type"?: string;
  name?: string;
  description?: string;
  url?: string;
  logo?: {
    "@type"?: string;
    url?: string;
  };
  image?: string;
  sameAs?: string[];
  contactPoint?: {
    "@type"?: string;
    telephone?: string;
    contactType?: string;
    availableLanguage?: string[];
  };

  // Meta tags
  charset?: string;
  viewport?: string;
  language?: string;
  robots?: string;
  title?: string;
  keywords?: string | null;
  author?: string | null;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_image?: string;
  og_type?: string;
  og_site_name?: string | null;
  og_locale?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  twitter_site?: string;
  twitter_creator?: string;
  article_published_time?: string | null;
  article_modified_time?: string | null;
  time?: string | null;
}

/* -------------------- Product Types -------------------- */
export interface ProductData {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string;
  image: string;
  pdf: string | null;
  youtube_link: string | null;
  video_desc: string | null;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  category_id: number | string | null;
  category_name: string | null;
  slug: string;
  images: ProductImage[];
  tabs: ProductTab[];
}

/* -------------------- Images -------------------- */
export interface ProductImage {
  image: string;
  title: string;
}

/* -------------------- Tabs -------------------- */
export interface ProductTab {
  id: number;
  title: string;
  short_description: string | null;
  long_description: string | null;
  image: string | null;
  alt_image: string | null;
  icon: string | null;
  alt_icon: string | null;
  benefits: ProductBenefit[];
}

/* -------------------- Benefits -------------------- */
export interface ProductBenefit {
  id: number;
  title: string;
  short_description: string | null;
  long_description: string | null;
  image: string | null;
  alt_image: string | null;
  icon: string | null;
  alt_icon: string | null;
  benefits: ProductBenefit[]; // Recursive nesting allowed
}
