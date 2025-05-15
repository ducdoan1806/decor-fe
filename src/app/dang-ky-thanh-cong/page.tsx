// app/dang-ky-thanh-cong/page.tsx
export const dynamic = "force-dynamic";
import { Result } from "antd";
import Link from "next/link";
import React, { ReactElement } from "react";

export default function RegistrationSuccessPage(): ReactElement {
  return (
    <div className="h-[calc(100vh-437px)] flex items-center justify-center">
      <Result
        status="success"
        title="Bạn đã gửi thông tin thành công"
        extra={[
          <Link
            key="home-link"
            href="/"
            passHref
            className="text-blue-600 hover:underline"
          >
            Về trang chủ
          </Link>,
        ]}
      />
    </div>
  );
}
