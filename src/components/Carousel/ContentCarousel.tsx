"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import CustomImage from "../CustomImage";
import EmptyImage from "../EmptyImage.tsx";

interface CarouselProps {
  list: string[];
}

/**
 * @deprecated
 */
const ResponsiveCarousel = ({ list }: CarouselProps) => {
  return (
    <Carousel
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
              width: "100%",
              aspectRatio: "1 / 1",
            }}
          >
            <CustomImage
              priority
              fill
              alt="배너 이미지"
              src={process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath}
              className="select-none w-[100%] h-[100%]"
              fallbackComponent={<EmptyImage width="100%" height="100%" />}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ResponsiveCarousel;
