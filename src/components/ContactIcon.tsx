"use client";

import { RawContact } from "@/types";
import { JSX } from "react";
import { FaPhone, FaLocationDot, FaFacebookF } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const ContactIcon = ({ contactItem }: { contactItem: RawContact }) => {
  const iconMap: Record<RawContact["type"], JSX.Element> = {
    email: <MdEmail />,
    facebook: <FaFacebookF />,
    phone: <FaPhone />,
    location: <FaLocationDot />,
  };
  return iconMap[contactItem.type];
};

export default ContactIcon;
