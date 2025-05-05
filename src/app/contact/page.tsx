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
    const location = data.find((item) => item.image);
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-red-700 mb-2 text-center">
            Thông tin liên hệ
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-3">
              {data.map((item) => (
                <div
                  key={item?.id}
                  className="flex items-center overflow-hidden bg-white shadow rounded-md"
                >
                  <p className="text-white bg-black p-5 h-full text-2xl">
                    <ContactIcon contactItem={item} />
                  </p>
                  <div className="p-2">
                    <Link
                      href={item?.value}
                      target="_blank"
                      className="text-red-700 font-semibold uppercase hover:text-red-500"
                    >
                      {item?.type}
                    </Link>
                    <p className="text-gray-600 text-sm">{item?.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
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
