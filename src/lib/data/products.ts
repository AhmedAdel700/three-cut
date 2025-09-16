import image from "@/app/assets/1.jpg";
import { StaticImageData } from "next/image";
import productImage1 from "@/app/assets/img2.png";
import productImage2 from "@/app/assets/img3.png";
import productImage3 from "@/app/assets/img4.png";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  images: string[] | StaticImageData[];
  specifications: Record<string, string>;
  applications: string[];
  applicationsAr: string[];
  featured: boolean;
  price?: string;
}

export const productCategories = [
  { id: "laser-cutting", name: "Laser Cutting", nameAr: "القطع بالليزر" },
  { id: "plasma-cutting", name: "Plasma Cutting", nameAr: "القطع بالبلازما" },
  { id: "waterjet-cutting", name: "Waterjet Cutting", nameAr: "القطع بالماء" },
  { id: "cnc-machines", name: "CNC Machines", nameAr: "آلات CNC" },
  { id: "accessories", name: "Accessories", nameAr: "الملحقات" },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "industrial-laser-cutter-pro",
    name: "Industrial Laser Cutter Pro",
    nameAr: "قاطع الليزر الصناعي المحترف",
    description:
      "High-precision laser cutting machine for industrial applications with advanced automation features.",
    descriptionAr:
      "آلة قطع بالليزر عالية الدقة للتطبيقات الصناعية مع ميزات الأتمتة المتقدمة.",
    category: "laser-cutting",
    categoryAr: "القطع بالليزر",
    images: [productImage1, productImage1, productImage1],
    specifications: {
      "Cutting Area": "1500mm x 3000mm",
      "Laser Power": "6kW Fiber Laser",
      "Max Thickness": "25mm Steel",
      "Positioning Accuracy": "±0.03mm",
      "Power Consumption": "15kW",
    },
    applications: [
      "Metal fabrication",
      "Automotive parts",
      "Aerospace components",
      "Industrial machinery",
      "Architectural elements",
    ],
    applicationsAr: [
      "تصنيع المعادن",
      "قطع غيار السيارات",
      "مكونات الطيران",
      "الآلات الصناعية",
      "العناصر المعمارية",
    ],
    featured: true,
    price: "Contact for pricing",
  },
  {
    id: "2",
    slug: "plasma-cutting-system-hd",
    name: "Plasma Cutting System HD",
    nameAr: "نظام القطع بالبلازما عالي الدقة",
    description:
      "Heavy-duty plasma cutting system for thick materials with exceptional cut quality.",
    descriptionAr:
      "نظام قطع بالبلازما للخدمة الشاقة للمواد السميكة مع جودة قطع استثنائية.",
    category: "plasma-cutting",
    categoryAr: "القطع بالبلازما",
    images: [productImage2, productImage2, productImage2],
    specifications: {
      "Cutting Area": "2000mm x 4000mm",
      "Plasma Power": "200A",
      "Max Thickness": "50mm Steel",
      "Cutting Speed": "8000mm/min",
      "Power Supply": "380V 3-Phase",
    },
    applications: [
      "Heavy fabrication",
      "Shipbuilding",
      "Construction",
      "Mining equipment",
      "Industrial repair",
    ],
    applicationsAr: [
      "التصنيع الثقيل",
      "بناء السفن",
      "البناء",
      "معدات التعدين",
      "الإصلاح الصناعي",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "waterjet-precision-cutter",
    name: "Waterjet Precision Cutter",
    nameAr: "قاطع الماء عالي الدقة",
    description:
      "Ultra-precise waterjet cutting system for complex shapes and exotic materials.",
    descriptionAr:
      "نظام قطع بالماء فائق الدقة للأشكال المعقدة والمواد الغريبة.",
    category: "waterjet-cutting",
    categoryAr: "القطع بالماء",
    images: [productImage3, productImage3, productImage3],
    specifications: {
      "Cutting Area": "1200mm x 2400mm",
      Pressure: "4150 bar",
      "Max Thickness": "200mm",
      "Positioning Accuracy": "±0.025mm",
      "Abrasive Flow": "0.3-0.5 kg/min",
    },
    applications: [
      "Precision parts",
      "Titanium cutting",
      "Glass processing",
      "Stone cutting",
      "Composite materials",
    ],
    applicationsAr: [
      "القطع الدقيقة",
      "قطع التيتانيوم",
      "معالجة الزجاج",
      "قطع الحجر",
      "المواد المركبة",
    ],
    featured: false,
  },
];
