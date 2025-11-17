export interface PhonesResponse {
  success: boolean;
  message: string;
  data: {
    phones: PhoneItem[];
  };
}

export interface PhoneItem {
  id: number;
  phone: string;
  type: string;
}
