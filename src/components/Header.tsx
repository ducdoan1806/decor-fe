"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import ContactModal from "./ContactModal";

const menu = [
  { name: "Thiết kế nội thất", href: "/bai-viet" },
  { name: "Ma nơ canh", href: "/san-pham", category: "ma-no-canh" },
  { name: "Móc treo", href: "/san-pham", category: "moc-treo" },
  { name: "Liên hệ", href: "/lien-he" },
];

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
    toggleMobileMenu();
  };
  return (
    <header className="bg-white py-2 sticky top-0 z-1 shadow">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="block w-20">
          <Image
            priority
            width={500}
            height={500}
            src="/ankiLogo.png"
            alt="Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2">
          {menu.map((item) => {
            // Determine active state
            let isActive = false;
            if (item.category) {
              isActive =
                pathname === item.href &&
                searchParams.get("category") === item.category;
            } else {
              isActive = pathname.startsWith(item.href);
            }

            return (
              <Link
                key={item.name}
                href={
                  item.category
                    ? `${item.href}?category=${item.category}`
                    : item.href
                }
                className={
                  `p-2 text-black border-b-2 transition-all duration-200 hover:border-black ` +
                  (isActive ? "border-black" : "border-transparent")
                }
              >
                {item.name}
              </Link>
            );
          })}

          {/* <button className="bg-black text-white px-4 py-1 rounded-md flex items-center space-x-1 cursor-pointer">
            <FaDollarSign /> <span>Báo giá</span>
          </button> */}
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md flex items-center space-x-1 cursor-pointer"
            onClick={handleOpenModal}
          >
            <FaPhone /> <span>Liên hệ</span>
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white transform transition-transform duration-300 z-40 md:hidden \
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/">
            <Image
              priority
              width={500}
              height={500}
              src="/ankiLogo.png"
              alt="Logo"
              className="w-16"
            />
          </Link>
          <button onClick={toggleMobileMenu} aria-label="Close menu">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menu.map((item) => {
            let isActive = false;
            if (item.category) {
              isActive =
                pathname === item.href &&
                searchParams.get("category") === item.category;
            } else {
              isActive = pathname.startsWith(item.href);
            }
            return (
              <Link
                key={item.name}
                href={
                  item.category
                    ? `${item.href}?category=${item.category}`
                    : item.href
                }
              >
                <button
                  onClick={toggleMobileMenu}
                  className={
                    `w-full text-left text-lg border-b-2 pb-2 transition-all duration-200 hover:border-black ` +
                    (isActive ? "border-black" : "border-transparent")
                  }
                >
                  {item.name}
                </button>
              </Link>
            );
          })}

          {/* <button
            className="w-full bg-black text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
            onClick={toggleMobileMenu}
          >
            <FaDollarSign /> <span>Báo giá</span>
          </button> */}
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
            onClick={handleOpenModal}
          >
            <FaPhone /> <span>Liên hệ</span>
          </button>
        </nav>
      </div>
      {isOpenModal && (
        <ContactModal
          title="Thông tin liên hệ"
          ctaText="Gửi thông tin"
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </header>
  );
};

export default Header;
