"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const Carousel = dynamic(() => import("antd").then((mod) => mod.Carousel), {
  ssr: false,
});

const Hero = () => (
  <Carousel arrows infinite draggable>
    <div>
      <div className="w-full h-auto">
        <Image
          className="block"
          width={2560}
          height={1707}
          src="/banner.webp"
          alt=""
        />
      </div>
    </div>
    <div>
      <div className="w-full h-auto">
        <Image
          className="block"
          width={2560}
          height={1707}
          src="/banner.webp"
          alt=""
        />
      </div>
    </div>
    <div>
      <div className="w-full h-auto">
        <Image
          className="block"
          width={2560}
          height={1707}
          src="/banner.webp"
          alt=""
        />
      </div>
    </div>
    <div>
      <div className="w-full h-auto">
        <Image
          className="block"
          width={2560}
          height={1707}
          src="/banner.webp"
          alt=""
        />
      </div>
    </div>
  </Carousel>
);

export default Hero;
