"use client";
import { useOutside } from "@/utils/useOutSide";
import { Form, Input } from "antd";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

interface ContactModalProps {
  onClose: () => void;
  title: string;
  ctaText: string;
}

const ContactModal = ({ onClose, title, ctaText }: ContactModalProps) => {
  const [form] = Form.useForm();
  const ref = useRef<HTMLDivElement>(null);
  const handleSendContact = () => {
    form.getFieldsValue();
    console.log("form.getFieldsValue();: ", form.getFieldsValue());
  };
  useOutside(ref, onClose);
  return (
    <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0 z-50">
      <div
        className="bg-white mx-auto mt-[10vh] w-[90%] max-w-sm shadow-md rounded-md overflow-hidden"
        ref={ref}
      >
        <div className="p-2 bg-black flex justify-between items-center">
          <div className="text-white">{title}</div>
          <button
            className="text-white cursor-pointer p-1 rounded-full hover:bg-white hover:text-red-700"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="p-3">
          <Form layout="vertical" form={form} onFinish={handleSendContact}>
            <Form.Item required label="Họ và tên" name="name">
              <Input placeholder="Nhập họ và tên ..." />
            </Form.Item>
            <Form.Item required label="Số điện thoại hoặc zalo" name="phone">
              <Input placeholder="Nhập số điện thoại hoặc zalo ..." />
            </Form.Item>
            <Form.Item
              required
              label="Sản phẩm bạn quan tâm"
              name="description"
            >
              <Input.TextArea
                placeholder="Nhập sản phẩm bạn quan tâm"
                autoSize={{ minRows: 5, maxRows: 7 }}
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="bg-red-700 p-2 w-full rounded-md text-white cursor-pointer transition-all hover:bg-red-600 hover:shadow"
              >
                {ctaText}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
