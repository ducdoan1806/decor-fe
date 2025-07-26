import Hero from "@/components/Hero";
import Product from "@/components/Product";
import api from "@/utils/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function Home() {
  try {
    const res = await Promise.all([
      api.get("/slide/"),
      api.get("/products/?category=moc-treo&page_size=5"),
      api.get("/products/?category=ma-no-canh&page_size=5"),
      api.get("/blog/posts/?categories=thiet-ke-noi-that&page_size=5"),
      api.get("/blog/posts/?&page_size=5"),
    ]);
    return (
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Hero slides={res[0].data.results} />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-center text-4xl font-semibold text-red-700 mb-6 pb-5 border-b-4 border-red-700 w-fit mx-auto">
            Danh mục
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 mb-6"></div>
        </div>
        <Product
          viewMore="/bai-viet?category=thiet-ke-noi-that"
          title="Thiết kế nội thất"
          products={res[3].data.results}
        />
        <Product
          viewMore="/san-pham?category=ma-no-canh"
          title="Ma nơ canh"
          products={res[2].data.results}
        />
        <Product
          viewMore="/san-pham?category=moc-treo"
          title="Móc treo"
          products={res[1].data.results}
        />
        <Product
          viewMore="/bai-viet"
          title="Bài viết mới nhất"
          products={res[4].data.results}
        />
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
}
