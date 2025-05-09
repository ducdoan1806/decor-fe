"use client";
import api from "@/utils/api";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";

const SidebarForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const handleSendContact = async () => {
    setLoading(true);
    setError("");
    try {
      const data = form.getFieldsValue();
      await api.post(`/contacts/`, {
        name: data.name ? data.name.trim() : "",
        phone_number: data.phone ? data.phone.trim() : "",
        message: data.description ? data.description.trim() : "",
      });
    } catch (error) {
      console.error(error);
      if (
        error instanceof Error &&
        (error as { response?: { data?: unknown } }).response?.data
      ) {
        setError(
          JSON.stringify(
            (error as { response?: { data?: unknown } })?.response?.data
          )
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sticky top-23">
      <div className="border-l-6 border-red-700 px-2 py-2 text-white bg-black mb-2">
        Đăng ký tư vấn miễn phí
      </div>
      <Form form={form} onFinish={handleSendContact} autoComplete="off">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên !" }]}
        >
          <Input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="* Nhập họ và tên ..."
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại !" }]}
        >
          <Input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="* Nhập số điện thoại ..."
          />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Nhu cầu tư vấn ..."
            autoSize={{ maxRows: 7, minRows: 5 }}
          />
        </Form.Item>
        {error && (
          <Form.Item>
            <p className="text-center text-red-600">{error}</p>
          </Form.Item>
        )}
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            className="w-full !bg-red-700 hover:!bg-red-600"
          >
            Đăng ký ngay
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SidebarForm;
