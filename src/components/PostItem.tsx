"use client";

import { Card } from "antd";
import Image from "next/image";
import React from "react";

interface PostItemProps {
  title?: React.ReactNode;
  description?: string;
}

const PostItem = ({ title, description }: PostItemProps) => {
  return (
    <div className="postItem">
      <Card
        size="small"
        cover={
          <Image
            width={400}
            height={300}
            src="https://placehold.co/400x300"
            unoptimized
            alt=""
          />
        }
      >
        <Card.Meta title={title} description={description} />
      </Card>
    </div>
  );
};

export default PostItem;
