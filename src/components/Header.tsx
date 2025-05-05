"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDollarSign, FaBars, FaTimes } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const menu = [
  {
    name: "Sản phẩm",
    link: "/category/store-designer",
    submenu: [
      { name: "Concept A", link: "/category/store-designer/concept-a" },
      { name: "Concept B", link: "/category/store-designer/concept-b" },
    ],
  },

  { name: "Liên hệ", link: "/contact" },
  { name: "Về chúng tôi", link: "#" },
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
            <div key={item.link} className="relative group">
              <Link
                href={item.link}
                className={`p-2 text-black border-b-2 border-transparent transition-all duration-200 hover:border-black ${
                  pathname.startsWith(item.link) ? "border-black" : ""
                }`}
              >
                {item.name}
              </Link>

              {item.submenu && (
                <div className="absolute overflow-hidden top-[29px] -left-1 bg-white shadow rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-10">
                  <ul className="text-sm">
                    {item.submenu.map((sub) => (
                      <li key={sub.link}>
                        <Link
                          href={sub.link}
                          className="block px-4 py-2 whitespace-nowrap hover:bg-gray-100"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <button className="bg-black text-white px-4 py-1 rounded-md flex items-center space-x-1 cursor-pointer">
            <FaDollarSign /> <p>Báo giá</p>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md flex items-center space-x-1 cursor-pointer">
            <FaPhone /> <p>Liên hệ</p>
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
            <div key={item.link}>
              <Link href={item.link}>
                <button
                  onClick={() => {
                    toggleMobileMenu();
                  }}
                  className={`w-full text-left text-lg text-black border-b-2 border-transparent pb-2 transition-all duration-200 hover:border-black ${
                    pathname.startsWith(item.link) ? "border-black" : ""
                  }`}
                >
                  {item.name}
                </button>
              </Link>
              {item.submenu && (
                <div className="pl-4 mt-1">
                  {item.submenu.map((sub) => (
                    <Link key={sub.link} href={sub.link}>
                      <button
                        onClick={toggleMobileMenu}
                        className="block w-full text-left text-base py-1 hover:text-blue-600"
                      >
                        {sub.name}
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            className="w-full bg-black text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
            onClick={toggleMobileMenu}
          >
            <FaDollarSign /> <p>Báo giá</p>
          </button>
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
            onClick={toggleMobileMenu}
          >
            <FaPhone /> <p>Liên hệ</p>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
