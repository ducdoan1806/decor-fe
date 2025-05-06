import PostItem from "@/components/PostItem";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Danh sách blog - Anki Decor",
  description: "Nội thất shop Anki Decor",
};
const page = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-5">
        <h1 className="mb-3 text-3xl text-red-700 font-semibold">
          Bài viết gần đây
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
    </div>
  );
};

export default page;
