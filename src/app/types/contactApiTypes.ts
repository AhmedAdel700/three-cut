export interface ContactPageResponse {
  success: boolean;
  message: string;
  data: {
    contact: {
      title: string;
      short_desc: string;
      data: ContactData;
    };
  };
}

export interface ContactData {
  id: number;
  title: string;
  email: string;
  address: string;
  open: string;
  close: string;
  phone: string;
  map_embed: string;
  map_link: string;
  phone2: string;
}
