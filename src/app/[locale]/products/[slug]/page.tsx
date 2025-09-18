import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product-detail-page";
import { mockProducts } from "@/lib/data/products";

// interface ProductPageProps {
//   params: {
//     slug: string;
//     locale: string;
//   };
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductPage({ params }: any) {
  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}
