"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Props } from "./types";
import DefaultImg from "@/shared/ui/DefaultImg";

const MainBannerCarousel = ({ srcList }: Props) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      emulateTouch={true}
      swipeScrollTolerance={10}
      preventMovementUntilSwipeScrollTolerance={true}
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
            <DefaultImg
              isPriority={true}
              src={imgPath}
              cover={false}
              select={false}
              alt="배너이미지"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default MainBannerCarousel;
