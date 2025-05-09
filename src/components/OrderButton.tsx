"use client";

import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import ContactModal from "./ContactModal";

const OrderButton = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  return (
    <div>
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 cursor-pointer rounded-md flex items-center space-x-1"
        onClick={handleOpenModal}
      >
        <FaCartArrowDown className="text-lg" />{" "}
        <span className="block ml-1">Đặt hàng ngay</span>
      </button>
      {isOpenModal && (
        <ContactModal
          title="Thông tin đặt hàng"
          ctaText="Đặt hàng ngay"
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
};

export default OrderButton;
