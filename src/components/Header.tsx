"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDollarSign, FaBars, FaTimes } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const menu = [
  { name: "Thiết kế cửa hàng", link: "/category/store-designer" },
  { name: "Ma nơ canh", link: "/category/monocanh" },
  { name: "Móc quần áo", link: "/category/clothes-hanger" },
  { name: "Liên hệ", link: "/category/contact" },
  { name: "Tư vấn", link: "/category/consult" },
];

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <header className="bg-white py-2 sticky top-0 z-50 shadow">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="block w-20">
          <h1>
            <Image
              priority
              width={500}
              height={500}
              src="/ankiLogo.png"
              alt="Logo"
            />
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2">
          {menu.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`p-1 text-black border-b-2 border-transparent transition-all duration-200 hover:border-black ${
                pathname.split("/")[2] === item.link.split("/")[2]
                  ? "border-black"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          <button className="bg-black text-white px-4 py-1 rounded-md flex items-center gap-1 cursor-pointer">
            <FaDollarSign /> Báo giá
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md flex items-center gap-1 cursor-pointer">
            <FaPhone /> Liên hệ
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
        className={`fixed inset-0 bg-white transform transition-transform duration-300 z-40 md:hidden 
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/">
            <button className="block w-16">
              <Image
                priority
                width={500}
                height={500}
                src="/ankiLogo.png"
                alt="Logo"
              />
            </button>
          </Link>
          <button onClick={toggleMobileMenu} aria-label="Close menu">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menu.map((item) => (
            <Link key={item.link} href={item.link}>
              <button
                onClick={toggleMobileMenu}
                className={`text-lg text-black border-b-2 border-transparent pb-2 transition-all duration-200 hover:border-black \$
                  {pathname.split("/")[2] === item.link.split("/")[2] ? "border-black" : ""}
                `}
              >
                {item.name}
              </button>
            </Link>
          ))}

          <button
            className="w-full bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
            onClick={toggleMobileMenu}
          >
            <FaDollarSign /> Báo giá
          </button>
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
            onClick={toggleMobileMenu}
          >
            <FaPhone /> Liên hệ
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
