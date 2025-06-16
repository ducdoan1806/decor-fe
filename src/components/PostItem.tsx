"use client";

import { Card } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PostItemProps {
  title?: React.ReactNode;
  description?: string;
  image?: string;
}

const PostItem = ({ title, description, image }: PostItemProps) => {
  const [cleanDescription, setCleanDescription] = useState("");

  useEffect(() => {
    if (description) {
      const div = document.createElement("div");
      div.innerHTML = description;
      setCleanDescription(div.textContent || div.innerText || "");
    }
  }, [description]);
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
          description={<p className="line-clamp-3">{cleanDescription}</p>}
        />
      </Card>
    </div>
  );
};

export default PostItem;
