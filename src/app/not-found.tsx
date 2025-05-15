import { Result } from "antd";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-437px)] flex items-center justify-center">
      <Result
        status="404"
        title="Không tìm thấy trang"
        extra={[
          <Link
            className="text-blue-600 hover:underline"
            key="home-link"
            href="/"
            passHref
          >
            Về trang chủ
          </Link>,
        ]}
      />
    </div>
  );
}
