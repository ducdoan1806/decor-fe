import { Result } from "antd";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-[calc(100vh-437px)] flex items-center justify-center">
      <Result
        status="success"
        title="Bạn đã gửi thông tin thành công"
        extra={[
          <Link key={1} href="/">
            Về trang chủ
          </Link>,
        ]}
      />
    </div>
  );
};

export default page;
