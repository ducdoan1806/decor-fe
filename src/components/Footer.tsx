"use client";

import dayjs from "dayjs";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto  px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              <Image
                width={400}
                height={400}
                src="/ankiLogoWhite.png"
                alt=""
                className="w-[250px] h-auto"
              />
            </h3>
            <p className="text-gray-400">
              Your one-stop shop for all your nail care needs.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-red-700 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2"></ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-red-700 mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-2"></ul>
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
