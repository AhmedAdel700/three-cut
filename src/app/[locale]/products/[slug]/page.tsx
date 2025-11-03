import { ProductDetailPage } from "@/components/product-detail-page";
import { fetchProductDetailsData } from "@/app/api/productService";
import { mockProducts } from "@/lib/data/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const productDetailsData = await fetchProductDetailsData(locale, slug);

  return <ProductDetailPage product={productDetailsData} />;
}