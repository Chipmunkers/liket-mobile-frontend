"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Props } from "./types";
import DefaultImg from "@/shared/ui/DefaultImg";
import Image from "next/image";

const MainBannerCarousel = ({ srcList }: Props) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      emulateTouch={true}
    >
      {srcList.map((imgPath, index) => {
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
            <DefaultImg src={imgPath} cover={false} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default MainBannerCarousel;
