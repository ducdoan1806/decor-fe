import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import api from "@/utils/api";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import SidebarForm from "@/components/SidebarForm";
import { Tag, Tooltip } from "antd";
import { TagFilled } from "@ant-design/icons";
import PostItem from "@/components/PostItem";
import { Post } from "@/types";
interface PageProps {
  params: Promise<{ slug: string; category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/\.html$/, "");
  const response = await api.get(`/blog/posts/${slug}/`);
  const post: Post = response?.data;

  return {
    title: post?.title + " - Anki Decor",
    description: post?.description,
  };
}
const page = async ({ params }: PageProps) => {
  try {
    const { slug: rawSlug } = await params;
    const slug = rawSlug.replace(/\.html$/, "");
    const response = await api.get(`/blog/posts/${slug}/`);
    const post: Post = response?.data;
    const data = await Promise.all([
      api.get(
        `/blog/posts/?categories=${post?.categories
          .map((item) => item?.slug)
          .join(",")}&page_size=5`
      ),
      api.get(`/blog/posts/?page_size=5`),
    ]);
    const samePost: Post[] = data[0].data.results.filter(
      (item: Post) => item?.id !== post?.id
    );
    const newestPost: Post[] = data[1].data.results.filter(
      (item: Post) => item?.id !== post?.id
    );
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <MyBreadcrumb />
          <div className="flex flex-col lg:flex-row lg:space-x-3 space-y-2 lg:space-y-0">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-red-700 mb-2">
                {post?.title}
              </h1>
              <div className="text-gray-600 flex space-x-3 mb-3">
                <div className="flex items-center space-x-1 text-sm">
                  <FaUser /> <p>{post?.author_name}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FaCalendarAlt />{" "}
                  <p>{dayjs(post?.published_at).format("DD-MM-YYYY")}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <FaClock /> <p>{dayjs(post?.published_at).format("HH:MM")}</p>
                </div>
              </div>
              <p className="mb-2">{post?.description}</p>
              <div
                className="postContent"
                dangerouslySetInnerHTML={{ __html: post?.content }}
              />
              <div className="py-2 px-1 border-t border-b border-gray-200">
                <div className="font-semibold flex">
                  <p className="mr-2">Chuyên mục:</p>
                  {post.categories.map((item) => (
                    <Link key={item?.id} href={`/bai-viet?category=${item?.slug}`}>
                      <Tag color="#3b5999" icon={<TagFilled />}>
                        {item?.name}
                      </Tag>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:min-w-xs lg:max-w-xs space-y-3">
              <div>
                <div className="border-l-6 border-red-700 px-2 py-2 text-white bg-black mb-2">
                  Bài viết mới nhất
                </div>
                <div className="space-y-2">
                  {newestPost.map((item) => (
                    <div className="flex space-x-2" key={item?.id}>
                      <div className="max-w-[130px] min-w-[130px]">
                        <Image
                          width={400}
                          height={400}
                          src={
                            item?.thumbnail || "https://placehold.co/400x400"
                          }
                          unoptimized
                          alt=""
                        />
                      </div>

                      <Link
                        href={`/bai-viet/${item?.slug}.html`}
                        className="text-red-700 font-semibold hover:text-red-500 text-sm"
                      >
                        <Tooltip title={item?.title}>
                          <h3 className="line-clamp-2">{item?.title}</h3>
                        </Tooltip>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <SidebarForm />
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <div className="text-red-700 font-semibold text-xl mb-2">
              Bài viết liên quan
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              {samePost.map((item) => (
                <PostItem
                  key={item?.id}
                  description={
                    item?.description || (
                      <span
                        dangerouslySetInnerHTML={{ __html: item?.content }}
                      />
                    )
                  }
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
      </div>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
};

export default page;
