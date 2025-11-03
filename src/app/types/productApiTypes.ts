export interface SeoProduct {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string;
  url: string;
  brand: {
    "@type": string;
    name: string;
  };
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  aggregateRating: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
  };
}

export interface SeoMeta {
  charset: string;
  viewport: string;
  language: string;
  robots: string;
  title: string;
  description: string;
  keywords: string | null;
  author: string | null;
  canonical: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_image: string;
  og_type: string;
  og_site_name: string | null;
  og_locale: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  twitter_site: string;
  twitter_creator: string;
  article_published_time: string | null;
  article_modified_time: string | null;
  time: string | null;
}

export type SeoItem = SeoProduct | SeoMeta;

export interface ProductTab {
  id: number;
  title: string;
  short_description: string | null;
  long_description: string | null;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  benefits: any[];
}

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
  tabs: ProductTab[];
}

export interface ProductWrapper {
  data: ProductData;
}

export interface ProductDetailsApiResponse {
  seo: SeoItem[];
  success: boolean;
  message: string;
  data: {
    product: ProductWrapper;
  };
}
