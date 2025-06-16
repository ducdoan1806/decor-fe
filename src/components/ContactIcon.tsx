"use client";

import { RawContact } from "@/types";
import { JSX } from "react";
import { FaPhone, FaLocationDot, FaFacebookF } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SiZalo } from "react-icons/si";

const ContactIcon = ({
  type,
  className,
}: {
  type: "email" | "facebook" | "phone" | "location" | "zalo";
  className?: string;
}) => {
  const iconMap: Record<RawContact["type"], JSX.Element> = {
    email: <MdEmail className={className} />,
    facebook: <FaFacebookF className={className} />,
    phone: <FaPhone className={className} />,
    location: <FaLocationDot className={className} />,
    zalo: <SiZalo className={`${className}`} size={20} />,
  };
  return iconMap[type];
};

export default ContactIcon;
