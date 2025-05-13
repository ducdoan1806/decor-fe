import ContactIcon from "@/components/ContactIcon";
import { RawContact } from "@/types";
import api from "@/utils/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Contact - Anki Decor",
  description: "Nội thất shop Anki Decor",
};

const Contact = async () => {
  try {
    const response = await api.get("/contact-info/");
    const data: RawContact[] = response?.data.results;
    console.log("data: ", data);
    const location = data.find((item) => item.image);
    const grouped = Object.values(
      data.reduce(
        (acc: Record<string, { type: string; data: RawContact[] }>, item) => {
          if (!acc[item.type]) {
            acc[item.type] = { type: item.type, data: [] };
          }
          acc[item.type].data.push(item);
          return acc;
        },
        {}
      )
    );
    console.log(grouped);
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-red-700 mb-2 text-center">
            Thông tin liên hệ
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-3">
              {grouped.map((item) => (
                <div
                  key={item?.type}
                  className="flex overflow-hidden bg-white shadow rounded-md"
                >
                  <p className="text-white flex items-center justify-center bg-black flex-1 text-2xl max-w-[70px]">
                    <ContactIcon
                      type={
                        item.type as "email" | "facebook" | "phone" | "location"
                      }
                    />
                  </p>
                  <div className="p-2">
                    <p className="text-red-700 font-semibold uppercase">
                      {item?.type}
                    </p>
                    {item?.data.map((contact, idx) => (
                      <Link
                        key={idx}
                        href={contact?.value}
                        target="_blank"
                        className="text-gray-600 text-sm hover:underline block"
                      >
                        {contact?.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="shadow-md overflow-hidden rounded-md">
              {location && (
                <Link target="_blank" href={location.value ?? ""}>
                  <Image
                    width={800}
                    height={800}
                    src={location.image ?? "/placeholder.png"}
                    alt=""
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default Contact;
