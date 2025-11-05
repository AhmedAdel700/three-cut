export interface AboutPageResponse {
  success: boolean;
  message: string;
  data: {
    about: {
      data: {
        id: number;
        title: string;
        subtitle: string;
        text: string;
        image: string;
        banner: string;
        alt_image: string;
        alt_banner: string;
        short_desc: string;
        long_desc: string;
      };
    };
    about_structs: {
      data: AboutStruct[];
    };
    partners: {
      title: string | null;
      short_desc: string | null;
      data: Partner[];
    };
  };
}

export interface AboutStruct {
  alt_image: string;
  image: string;
  id: number;
  name: string;
  icon: string;
  alt_icon: string;
  long_desc: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  alt_logo: string;
}
