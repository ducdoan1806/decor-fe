import MyBreadcrumb from "@/components/MyBreadcrumb";
import OrderButton from "@/components/OrderButton";
import PostItem from "@/components/PostItem";
import { ProductType } from "@/types";
import api from "@/utils/api";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/\.html$/, "");
  const response = await api.get(`/products/${slug}/`);
  const post: ProductType = response.data;

  return {
    title: post?.name + " - Anki Decor",
    description: post?.description,
    openGraph: {
      title: post?.name + " - Anki Decor",
      description: post?.description,
      url: "ankidecor.com.vn",
      siteName: "Anki Decor",
      images: post?.images.map((item) => ({
        url: item?.image,
        width: 1200,
        height: 630,
        alt: post?.title,
      })),
      type: "website",
    },
  };
}
const page = async ({ params }: PageProps) => {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/\.html$/, "");
  const response = await api.get(`/products/${slug}/`);
  const post: ProductType = response.data;
  const responseProduct = await api.get(
    `/products/?search=${post?.category?.slug}&page_size=5`
  );
  const sameProduct: ProductType[] = responseProduct.data.results.filter(
    (item: ProductType) => item?.id !== post?.id
  );
  return (
    <div className="container mx-auto px-4 py-5">
      <MyBreadcrumb />
      <div className="flex flex-col-reverse lg:flex-row items-start">
        <div className="mx-auto lg:mr-6 max-w-[600px] w-full border border-gray-400 rounded-md overflow-hidden">
          <Carousel draggable arrows infinite={true}>
            {post?.images.map((image) => (
              <div key={image?.id}>
                <Image
                  className="w-full h-auto"
                  width={600}
                  height={600}
                  src={image?.image}
                  alt={image?.alt_text}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="space-y-3 mb-3 flex-1">
          <h1 className="uppercase text-xl font-semibold">
            {post?.name || "--"}
          </h1>
          <p className="text-red-600 bg-red-50 py-2 px-3 text-3xl rounded-md">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(Number(post?.price) || 0)}
          </p>
          <div className="flex space-x-2">
            <OrderButton />
          </div>
          <p className="text-gray-700">{post?.description}</p>
        </div>
      </div>
      {sameProduct.length ? (
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-red-700 font-semibold text-xl">
              Sản phẩm liên quan
            </div>
            <Link
              href="/san-pham"
              className="text-red-500 hover:text-red-600 hover:underline"
            >
              Xem thêm {">>"}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
            {sameProduct.map((item) => (
              <PostItem
                key={item?.id}
                title={
                  <Link href={`/san-pham/${item?.slug}.html`}>
                    <h3 className="text-red-700 hover:text-red-500 text-lg">
                      {item?.name || "--"}
                    </h3>
                  </Link>
                }
                image={item?.images[0]?.image}
                description={item?.description}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default page;
