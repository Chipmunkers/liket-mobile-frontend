"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";

const ContentImgCarousel = ({ list }: Props) => {
  return (
    <Carousel
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      emulateTouch={true}
      swipeScrollTolerance={70}
      preventMovementUntilSwipeScrollTolerance={true}
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
            <DefaultImg src={imgPath} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ContentImgCarousel;
