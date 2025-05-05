"use client";
import { Form, Input } from "antd";
import React from "react";

const SidebarForm = () => {
  return (
    <div className="sticky top-23">
      <div className="border-l-6 border-red-700 px-2 py-2 text-white bg-black mb-2">
        Đăng ký tư vấn miễn phí
      </div>
      <Form>
        <Form.Item name="name">
          <Input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="* Nhập họ và tên ..."
          />
        </Form.Item>
        <Form.Item name="phone">
          <Input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="* Nhập số điện thoại ..."
          />
        </Form.Item>
        <Form.Item name="Nhu cầu tư vấn">
          <Input.TextArea
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Nhu cầu tư vấn ..."
            autoSize={{ maxRows: 7, minRows: 5 }}
          />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="cursor-pointer w-full bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
          >
            Đăng ký ngay
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SidebarForm;
