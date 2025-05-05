"use client";

import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

const PostItem = () => {
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
        <Card.Meta
          title={
            <Link href="#">
              <h3 className="text-red-700 hover:text-red-500">
                Các phương pháp trồng răng cửa hiệu quả cho hàm dưới
              </h3>
            </Link>
          }
          description="This is the description"
        />
      </Card>
    </div>
  );
};

export default PostItem;
