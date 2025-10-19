export interface SettingsApiResponse {
  success: boolean;
  message: string;
  data: {
    setting: Setting;
  };
}

export interface Setting {
  short_name?: string;
  description?: string;
  theme_color?: string;
  background_color?: string;
  logo?: string;
  email?: string;
  whatsapp?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  snapchat?: string;
  tiktok?: string;
  pinterest?: string;
  telegram?: string;
  map?: string;
  google_analytics_id?: string;
  google_tag_manager_id?: string;
}
