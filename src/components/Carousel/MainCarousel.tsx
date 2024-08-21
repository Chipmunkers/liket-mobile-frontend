"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface CarouselProps {
  list: string[];
}

/**
 * @deprecated
 */
const ResponsiveCarousel = ({ list }: CarouselProps) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
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
              width: "100%",
              aspectRatio: `390 / 336`,
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
