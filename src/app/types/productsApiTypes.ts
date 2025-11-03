export interface ProductsApiResponse {
  success: boolean;
  message: string;
  data: {
    categories: {
      data: Category[];
    };
    products: {
      title: string;
      short_desc: string;
      data: Product[];
    };
  };
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string;
  icon: string;
  alt_icon: string;
  category_id: string;
  category_name: string;
  slug: string;
}

export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  data: {
    product: {
      data: {
        id: number;
        name: string;
        short_desc: string;
        long_desc: string;
        image: string;
        alt_image: string;
        icon: string;
        alt_icon: string;
        category_id: string;
        category_name: string;
        slug: string;
      };
    };
    seo: {
      metatags: string | null;
      schema: string | null;
    };
  };
}
