"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CarouselProps {
  list: string[];
}

const ResponsiveCarousel = ({ list }: CarouselProps) => {
  const { width } = useScreenDetector();

  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      emulateTouch={true}
    >
      {list.map((imgPath, index) => {
        return (
          <div
            key={imgPath + index}
            className="relative"
            style={{
              objectFit: "cover",
              width: width || "100%",
              height: width || "336px",
            }}
          >
            <Image
              priority
              fill
              alt="배너 이미지"
              src={process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath}
              className="select-none w-[100%] h-[100%]"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ResponsiveCarousel;

const useScreenDetector = () => {
  const [width, setWidth] = useState(0);

  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 336) {
      setWidth(window.innerWidth);
    } else {
      setWidth(0);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { width };
};
