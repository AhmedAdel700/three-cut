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
  image?: string;
  url?: string;
  brand?: {
    "@type"?: string;
    name?: string;
  };
  offers?: {
    "@type"?: string;
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
  aggregateRating?: {
    "@type"?: string;
    ratingValue?: string;
    reviewCount?: string;
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
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  category_id: number | null;
  category_name: string | null;
  slug: string;
  images: ProductImage[];
  tabs: ProductTab[];
}

export interface ProductImage {
  image: string;
}

export interface ProductTab {
  id: number;
  title: string;
  short_description: string | null;
  long_description: string | null;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  benefits: ProductBenefit[];
}

export interface ProductBenefit {
  id: number;
  title: string;
  short_description: string | null;
  long_description: string | null;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  benefits: ProductBenefit[]; // Recursive (nested)
}
