"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Carousel = dynamic(() => import("antd").then((mod) => mod.Carousel), {
  ssr: false,
});

interface Slide {
  id: string;
  image: string;
  link: string;
}

interface HeroProps {
  slides: Slide[];
}

const Hero = ({ slides }: HeroProps) => (
  <Carousel arrows infinite draggable>
    {slides.map((slide) => (
      <Link href={slide?.link || "#"} target="_blank" key={slide?.id}>
        <div className="w-full h-auto">
          <Image
            className="block"
            width={1920}
            height={1080}
            src={
              slide?.image
                ? slide?.image.includes("localhost")
                  ? slide?.image
                  : slide?.image.replace("http", "https")
                : "/placeholder.png"
            }
            alt=""
          />
        </div>
      </Link>
    ))}
  </Carousel>
);

export default Hero;
