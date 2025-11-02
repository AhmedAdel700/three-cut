import { fetchProductsData } from "@/app/api/productsService";
import { ProductDetailPage } from "@/components/product-detail-page";

export default async function ProductPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const product = await fetchProductsData(params.locale, params.id);
  return <ProductDetailPage product={product} />;
}
