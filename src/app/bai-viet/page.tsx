import MyBreadcrumb from "@/components/MyBreadcrumb";
import PostItem from "@/components/PostItem";
import { Post } from "@/types";
import api from "@/utils/api";
import { Empty, Tooltip } from "antd";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Danh sách bài viết - Anki Decor",
  description: "Nội thất shop Anki Decor",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}
const page = async ({ searchParams }: PageProps) => {
  try {
    const { category } = await searchParams;
    const response = await api.get(
      `/blog/posts/?page_size=999&categories=${category || ""}`
    );
    const posts: Post[] = response.data.results || [];
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-5">
          <MyBreadcrumb />
          <div className="mb-3">
            <h1 className="text-3xl text-red-700 font-semibold">
              Bài viết gần đây
            </h1>
            {category && (
              <p className="mt-1 text-gray-500 italic">Danh mục: {category}</p>
            )}
          </div>
          {posts.length === 0 ? (
            <div className="flex justify-center items-center h-[calc(100vh - 631px)]">
              <Empty description="Không có bài viết nào" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              {posts.map((item) => (
                <PostItem
                  key={item?.id}
                  description={item?.description || item?.content}
                  image={item?.thumbnail}
                  title={
                    <Tooltip title={item?.title || ""}>
                      <Link href={`/bai-viet/${item?.slug}.html`}>
                        <h2 className="text-red-700 hover:text-red-500 text-lg line-clamp-2">
                          {item?.title || "--"}
                        </h2>
                      </Link>
                    </Tooltip>
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
};

export default page;
