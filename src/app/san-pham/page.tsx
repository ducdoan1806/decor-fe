import MyBreadcrumb from "@/components/MyBreadcrumb";
import PostItem from "@/components/PostItem";
import { ProductType } from "@/types";
import api from "@/utils/api";
import { Empty } from "antd";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Danh sách sản phẩm - Anki Decor",
  description: "Nội thất shop Anki Decor",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

const page = async ({ searchParams }: PageProps) => {
  try {
    const { category } = await searchParams;
    const res = await api.get(
      `/products/?pageSize=999&search=${category || ""}`
    );
    const products = res?.data?.results || [];
    const checkProduct: ProductType = products.find(
      (item: ProductType) => item?.category.slug === category
    );

    return (
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-5">
            <MyBreadcrumb />
            <div className="mb-3">
              <h1 className="text-3xl text-red-700 font-semibold">
                Danh sách sản phẩm
              </h1>
              {checkProduct && (
                <p className="mt-1 text-gray-500 italic">
                  Danh mục: {checkProduct?.category?.name}
                </p>
              )}
            </div>
            {products.length === 0 ? (
              <div>
                <Empty description="Không có sản phẩm nào" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {products.map((item: ProductType) => (
                  <PostItem
                    key={item?.id}
                    description={item?.description}
                    image={item?.images[0]?.image}
                    title={
                      <Link href={`/san-pham/${item?.slug}.html`}>
                        <h2 className="text-red-700 hover:text-red-500 text-lg">
                          {item?.name || "--"}
                        </h2>
                      </Link>
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
};

export default page;
