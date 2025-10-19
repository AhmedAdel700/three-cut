export interface ServicesApiResponse {
  success: boolean;
  message: string;
  data: {
    services: {
      title: string;
      short_desc: string;
      data: Service[];
    };
  };
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
