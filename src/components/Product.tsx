import { Tooltip } from "antd";
import PostItem from "./PostItem";
import Link from "next/link";
import { ProductType } from "@/types";

interface ProductProps {
  title: string;
  viewMore: string;
  products: ProductType[];
}

const Product = ({ title, products, viewMore }: ProductProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-4xl font-semibold text-red-700 mb-6 pb-5 border-b-4 border-red-700 w-fit mx-auto">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 mb-6">
        {products.map((item) => (
          <PostItem
            key={item?.id}
            description={item?.description || item?.content}
            image={item?.thumbnail || item?.images[0]?.image}
            title={
              <Tooltip title={item?.title || ""}>
                <Link
                  href={`/${
                    item?.thumbnail !== undefined ? "bai-viet" : "san-pham"
                  }/${item?.slug}.html`}
                >
                  <h3 className="text-red-700 hover:text-red-500 text-lg line-clamp-2">
                    {item?.title || item?.name || "--"}
                  </h3>
                </Link>
              </Tooltip>
            }
          />
        ))}
      </div>
      <div className="text-center">
        <Link
          href={viewMore || "#"}
          className="text-white hover:600 p-2 bg-red-700 rounded-md shadow hover:bg-red-600"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
};

export default Product;
