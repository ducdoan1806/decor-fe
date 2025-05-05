"use client";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((seg) => seg);

  const items = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathSegments.map((seg, idx) => {
      const url = "/" + pathSegments.slice(0, idx + 1).join("/");
      // Capitalize segment
      const title = seg.charAt(0).toUpperCase() + seg.slice(1);
      return {
        title: <Link href={url}>{title.replace(/\.html$/, "")}</Link>,
      };
    }),
  ];

  return <Breadcrumb items={items} style={{ margin: "16px 0" }} />;
}
