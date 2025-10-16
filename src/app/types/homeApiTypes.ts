export interface HomeApiResponse {
  success: boolean;
  message: string;
  data: HomeData;
}

export interface HomeData {
  sliders: { data: Slider[] };
  about: { data: About };
  about_structs: { data: AboutStruct[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: { data: any[] };
  partners: Partners;
  services: Services;
  categories: Categories;
  contact: Contact;
  projects: Projects;
}

/* ---------- Slider Section ---------- */
export interface Slider {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  mobile_image: string;
  icon: string;
  alt_image: string;
  alt_mobile_image: string | null;
  alt_icon: string;
}

/* ---------- About Section ---------- */
export interface About {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  banner: string;
  alt_image: string;
  alt_banner: string;
  short_desc: string;
  long_desc: string; // JSON stringified text
}

/* ---------- About Structs ---------- */
export interface AboutStruct {
  id: number;
  name: string;
  icon: string;
  alt_icon: string;
  long_desc: string;
}

/* ---------- Partners Section ---------- */
export interface Partners {
  title: string | null;
  short_desc: string | null;
  data: Partner[];
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  alt_logo: string;
}

/* ---------- Services Section ---------- */
export interface Services {
  title: string;
  short_desc: string;
  data: Service[];
}

export interface Service {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  slug: string;
}

/* ---------- Categories & Products ---------- */
export interface Categories {
  title: string;
  short_desc: string;
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
  short_desc: string | null;
  long_desc: string;
  image: string | null;
  alt_image: string | null;
  icon: string | null;
  alt_icon: string | null;
  products: Product[];
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

/* ---------- Contact Section ---------- */
export interface Contact {
  title: string;
  short_desc: string;
}

/* ---------- Projects Section ---------- */
export interface Projects {
  title: string;
  short_desc: string;
  data: Project[];
}

export interface Project {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string;
  icon: string;
  alt_icon: string;
  slug: string;
}
