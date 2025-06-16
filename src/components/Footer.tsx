"use client";

import { RawContact } from "@/types";
import api from "@/utils/api";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactIcon from "./ContactIcon";
import Link from "next/link";

const Footer = () => {
  const [contacts, setContacts] = useState<
    { type: string; data: RawContact[] }[]
  >([]);
  const image = contacts
    .find((item) => item.type === "location")
    ?.data.find((item) => item?.image);
  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/contact-info/");
      const data: RawContact[] = response?.data.results;
      setContacts(
        Object.values(
          data.reduce(
            (
              acc: Record<string, { type: string; data: RawContact[] }>,
              item
            ) => {
              if (!acc[item.type]) {
                acc[item.type] = { type: item.type, data: [] };
              }
              acc[item.type].data.push(item);
              return acc;
            },
            {}
          )
        )
      );
    };
    getData();
  }, []);
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-8 space-y-8 md:space-y-0">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              <Image
                width={400}
                height={400}
                src="/ankiLogoWhite.png"
                alt=""
                className="mx-auto md:mx-0 w-[250px] h-auto"
              />
            </h3>
            <p className="text-gray-400">
              Nội thất shop, đồ trang trí shop, đồ decor shop, phụ kiện vật tư,
              đồ mở shop
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-red-700 mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.type} className="flex space-x-1">
                  <ContactIcon
                    className="mt-1"
                    type={
                      contact.type as
                        | "email"
                        | "facebook"
                        | "phone"
                        | "location"
                        | "zalo"
                    }
                  />
                  <div className="space-y-0.5 ">
                    {contact.data.map((item, idx) => (
                      <Link
                        href={item?.value}
                        key={idx}
                        className="block hover:underline"
                      >
                        {item?.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <Link
              href={image?.value || "#"}
              target="_blank"
              className="relative group overflow-hidden rounded-md block"
            >
              <span className="absolute bg-black/30 transition-all top-0 left-0 right-0 bottom-0 z-10 opacity-0 group-hover:opacity-100 flex justify-center items-center">
                Click to open map
              </span>
              {image?.image && (
                <Image
                  className="rounded-md group-hover:scale-125 transition-all"
                  width={800}
                  height={600}
                  src={image.image}
                  alt=""
                />
              )}
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {dayjs().format("YYYY")} Anki decor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
