import { Tooltip } from "antd";
import PostItem from "./PostItem";
import Link from "next/link";
import { ProductType } from "@/types";

interface ProductProps {
  title: string;
  products: ProductType[];
}

const Product = ({ title, products }: ProductProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-4xl font-semibold text-red-700 mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {products.map((item) => (
          <PostItem
            key={item?.id}
            description={item?.description || item?.content}
            image={item?.thumbnail || item?.images[0]?.image}
            title={
              <Tooltip title={item?.title || ""}>
                <Link href={`/bai-viet/${item?.slug}.html`}>
                  <h2 className="text-red-700 hover:text-red-500 text-lg line-clamp-2">
                    {item?.title || item?.name || "--"}
                  </h2>
                </Link>
              </Tooltip>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
