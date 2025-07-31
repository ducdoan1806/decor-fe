// app/sitemap.xml/route.ts
import { ProductType } from "@/types";
import api from "@/utils/api";
import { NextResponse } from "next/server";

// Kiểu dữ liệu định nghĩa 1 URL entry
interface PageEntry {
  loc: string; // URL path, ví dụ '/san-pham/123'
  lastmod: string; // YYYY-MM-DD
  priority: number; // 0.0 - 1.0
}
export const revalidate = 86400 
// 1. Hàm lấy danh sách URL từ API của bạn
async function fetchPageEntries(): Promise<PageEntry[]> {
  try {
    // Thay 'https://api.ankidecor.com.vn/products' bằng endpoint thực tế
    const res = await Promise.all([
      api.get("/products/?page_size=999&page=1"),
      api.get("/blog/posts/?page_size=999&page=1"),
    ]);
    const products = res?.[0]?.data?.results || [];
    const posts = res?.[1]?.data?.results || [];
    const allData = [
      ...products.map((item: ProductType) => ({
        loc: `/san-pham/${item.slug}.html`,
        lastmod: item.updated_at.split("T")[0], // ISO date -> YYYY-MM-DD
        priority: 0.7,
      })),
      ...posts.map((item: ProductType) => ({
        loc: `/san-pham/${item.slug}.html`,
        lastmod: item.updated_at.split("T")[0], // ISO date -> YYYY-MM-DD
        priority: 0.7,
      })),
    ];
    // Map response thành PageEntry
    return allData;
  } catch (err) {
    console.error("fetchPageEntries error:", err);
    return [
      {
        loc: "/",
        lastmod: new Date().toISOString().split("T")[0],
        priority: 1.0,
      },
    ];
  }
}

// 2. Sinh sitemap XML từ dữ liệu
function generateSiteMapXml(entries: PageEntry[]): string {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://ankidecor.com.vn";
  const urlEntries = entries
    .map(
      ({ loc, lastmod, priority }) => `
  <url>
    <loc>${host}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority.toFixed(2)}</priority>
  </url>
  `
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// 3. Export GET handler
export async function GET() {
  try {
    // Lấy dynamic entries từ API và merge thêm các trang tĩnh nếu cần
    const productEntries = await fetchPageEntries();
    const staticEntries: PageEntry[] = [
      {
        loc: "/",
        lastmod: new Date().toISOString().split("T")[0],
        priority: 1.0,
      },
      { loc: "/bai-viet", lastmod: "2025-07-20", priority: 0.8 },
      { loc: "/san-pham", lastmod: "2025-07-28", priority: 0.7 },
      { loc: "/lien-he", lastmod: "2025-07-15", priority: 0.6 },
    ];
    const entries = [...staticEntries, ...productEntries];

    const xml = generateSiteMapXml(entries);
    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        // Cache 24 giờ
        "Cache-Control": "public, max-age=0, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}

/*
Hướng dẫn:
- Đảm bảo endpoint API (`/products`) trả về danh sách sản phẩm với trường `slug` và `updatedAt`.
- Tuỳ chỉnh `priority` hoặc thêm các đường dẫn khác theo nhu cầu.
- Thử nghiệm: http://localhost:3000/sitemap.xml
*/
