export type RawContact = {
  id: number;
  type: "email" | "facebook" | "phone" | "location";
  name: string;
  value: string;
  image: string | null;
};
export interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  author_name: string;
  published_at: string;
  content: string;
  description: string;
  categories: Category[];
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string; // dùng string nếu giữ nguyên kiểu dữ liệu như trong JSON
  category: {
    id: number;
    name: string;
    slug: string;
  };
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  images: {
    id: number;
    image: string;
    alt_text: string;
    sort_order: number;
  }[];
  variants: {
    id: number;
    variant_name: string;
    extra_price: string; // cũng có thể đổi sang number nếu bạn parse dữ liệu
    stock: number;
  }[];
}
