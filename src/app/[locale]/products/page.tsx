import { fetchProductsData } from "@/app/api/productService";
import { ProductsListPage } from "@/components/products-list-page";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const productsData = await fetchProductsData(locale);
  return <ProductsListPage productsData={productsData} />;
}
