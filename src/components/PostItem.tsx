"use client";

import { Card } from "antd";
import Image from "next/image";
import React from "react";

interface PostItemProps {
  title?: React.ReactNode;
  description?: string;
  image?: string;
}
function stripHtmlTags(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
const PostItem = ({ title, description, image }: PostItemProps) => {
  return (
    <div className="postItem">
      <Card
        size="small"
        cover={
          <Image
            width={350}
            height={350}
            src={image || "https://placehold.co/400x300"}
            unoptimized
            alt=""
          />
        }
      >
        <Card.Meta
          title={title}
          description={
            <p className="line-clamp-3">
              {description ? stripHtmlTags(description) : ""}
            </p>
          }
        />
      </Card>
    </div>
  );
};

export default PostItem;
