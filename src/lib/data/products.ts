import { StaticImageData } from "next/image";
import productImage1 from "@/app/assets/pc-1.png";
import productImage2 from "@/app/assets/pc-2.png";
import productImage3 from "@/app/assets/pc-3.png";

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
  { id: "metal", name: "Metal", nameAr: "المعادن" },
  { id: "non-metal", name: "Non-Metal", nameAr: "غير المعدنية" },
];

export const mockProducts: Product[] = [
  // Metal Category Products
  {
    id: "1",
    slug: "industrial-laser-cutter-pro",
    name: "Industrial Laser Cutter Pro",
    nameAr: "قاطع الليزر الصناعي المحترف",
    description:
      "High-precision laser cutting machine for industrial applications with advanced automation features.",
    descriptionAr:
      "آلة قطع بالليزر عالية الدقة للتطبيقات الصناعية مع ميزات الأتمتة المتقدمة.",
    category: "metal",
    categoryAr: "المعادن",
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
    category: "metal",
    categoryAr: "المعادن",
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
    slug: "cnc-metal-router",
    name: "CNC Metal Router Pro",
    nameAr: "جهاز التوجيه CNC للمعادن",
    description:
      "Advanced CNC routing system for precise metal cutting and engraving operations.",
    descriptionAr:
      "نظام توجيه CNC متقدم لعمليات قطع ونقش المعادن الدقيقة.",
    category: "metal",
    categoryAr: "المعادن",
    images: [productImage3, productImage3, productImage3],
    specifications: {
      "Working Area": "1300mm x 2500mm",
      "Spindle Power": "7.5kW",
      "Max Material Thickness": "100mm",
      "Positioning Accuracy": "±0.02mm",
      "Spindle Speed": "24000 RPM",
    },
    applications: [
      "Metal engraving",
      "Sign making",
      "Aerospace parts",
      "Mold making",
      "Prototype development",
    ],
    applicationsAr: [
      "النقش على المعادن",
      "صناعة اللافتات",
      "قطع غيار الطيران",
      "صناعة القوالب",
      "تطوير النماذج",
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "precision-sheet-cutter",
    name: "Precision Sheet Cutter",
    nameAr: "قاطع الألواح الدقيق",
    description:
      "High-speed precision cutting system for thin metal sheets with minimal waste.",
    descriptionAr:
      "نظام قطع دقيق عالي السرعة للألواح المعدنية الرقيقة مع الحد الأدنى من الهدر.",
    category: "metal",
    categoryAr: "المعادن",
    images: [productImage1, productImage2, productImage3],
    specifications: {
      "Cutting Area": "1500mm x 3000mm",
      "Max Thickness": "6mm Steel",
      "Cutting Speed": "12000mm/min",
      "Positioning Accuracy": "±0.01mm",
      "Material Waste": "< 2%",
    },
    applications: [
      "Thin sheet cutting",
      "Automotive panels",
      "Electronics housing",
      "Kitchen appliances",
      "Light fixtures",
    ],
    applicationsAr: [
      "قطع الألواح الرقيقة",
      "ألواح السيارات",
      "هياكل الإلكترونيات",
      "الأجهزة المنزلية",
      "مصابيح الإضاءة",
    ],
    featured: false,
  },
  
  // Non-Metal Category Products
  {
    id: "5",
    slug: "waterjet-precision-cutter",
    name: "Waterjet Precision Cutter",
    nameAr: "قاطع الماء عالي الدقة",
    description:
      "Ultra-precise waterjet cutting system for complex shapes and exotic materials.",
    descriptionAr:
      "نظام قطع بالماء فائق الدقة للأشكال المعقدة والمواد الغريبة.",
    category: "non-metal",
    categoryAr: "غير المعدنية",
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
    featured: true,
  },
  {
    id: "6",
    slug: "cnc-wood-router",
    name: "CNC Wood Router Master",
    nameAr: "جهاز توجيه الخشب CNC الرئيسي",
    description:
      "Professional CNC router for woodworking, furniture making, and artistic carving.",
    descriptionAr:
      "جهاز توجيه CNC احترافي للأعمال الخشبية وصناعة الأثاث والنحت الفني.",
    category: "non-metal",
    categoryAr: "غير المعدنية",
    images: [productImage1, productImage1, productImage1],
    specifications: {
      "Working Area": "2000mm x 3000mm",
      "Spindle Power": "5.5kW",
      "Max Material Thickness": "150mm",
      "Positioning Accuracy": "±0.05mm",
      "Spindle Speed": "18000 RPM",
    },
    applications: [
      "Furniture making",
      "Wood carving",
      "Sign production",
      "Architectural millwork",
      "Artistic projects",
    ],
    applicationsAr: [
      "صناعة الأثاث",
      "النحت على الخشب",
      "إنتاج اللافتات",
      "الأعمال المعمارية",
      "المشاريع الفنية",
    ],
    featured: true,
  },
  {
    id: "7",
    slug: "acrylic-laser-cutter",
    name: "Acrylic Laser Cutter",
    nameAr: "قاطع الليزر للأكريليك",
    description:
      "Specialized laser cutting system for acrylic, plastic, and other non-metallic materials.",
    descriptionAr:
      "نظام قطع بالليزر متخصص للأكريليك والبلاستيك والمواد غير المعدنية الأخرى.",
    category: "non-metal",
    categoryAr: "غير المعدنية",
    images: [productImage2, productImage2, productImage2],
    specifications: {
      "Cutting Area": "1000mm x 1500mm",
      "Laser Power": "100W CO2",
      "Max Thickness": "25mm Acrylic",
      "Positioning Accuracy": "±0.1mm",
      "Cutting Speed": "5000mm/min",
    },
    applications: [
      "Acrylic signage",
      "Plastic parts",
      "Model making",
      "Display fabrication",
      "Prototyping",
    ],
    applicationsAr: [
      "لافتات الأكريليك",
      "قطع البلاستيك",
      "صناعة النماذج",
      "تصنيع العروض",
      "النماذج الأولية",
    ],
    featured: true,
  },
  {
    id: "8",
    slug: "foam-cutting-system",
    name: "Foam Cutting System",
    nameAr: "نظام قطع الرغوة",
    description:
      "Hot wire cutting system for foam, insulation materials, and soft composites.",
    descriptionAr:
      "نظام قطع بالأسلاك الساخنة للرغوة ومواد العزل والمركبات الناعمة.",
    category: "non-metal",
    categoryAr: "غير المعدنية",
    images: [productImage3, productImage1, productImage2],
    specifications: {
      "Cutting Area": "1200mm x 2400mm",
      "Max Thickness": "500mm Foam",
      "Cutting Speed": "2000mm/min",
      "Wire Temperature": "200-400°C",
      "Positioning Accuracy": "±0.5mm",
    },
    applications: [
      "Packaging foam",
      "Insulation cutting",
      "Prototype models",
      "Artistic sculptures",
      "Cushion fabrication",
    ],
    applicationsAr: [
      "رغوة التعبئة",
      "قطع العزل",
      "نماذج أولية",
      "منحوتات فنية",
      "تصنيع الوسائد",
    ],
    featured: false,
  },
];
