import MyBreadcrumb from "@/components/MyBreadcrumb";
import PostItem from "@/components/PostItem";
import { Post } from "@/types";
import api from "@/utils/api";
import { Tooltip } from "antd";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Danh sách bài viết - Anki Decor",
  description: "Nội thất shop Anki Decor",
};
const page = async () => {
  try {
    const response = await api.get("/blog/posts/?page_size=999");
    const posts: Post[] = response.data.results;
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-5">
          <MyBreadcrumb />
          <h1 className="mb-3 text-3xl text-red-700 font-semibold">
            Bài viết gần đây
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
            {posts.map((item) => (
              <PostItem
                key={item?.id}
                description={item?.description}
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
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
};

export default page;
