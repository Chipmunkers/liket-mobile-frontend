"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Props } from "./types";
import DefaultImg from "@/shared/ui/DefaultImg";
import { DefaultLink } from "@/shared/ui/DefaultLink";

const MainBannerCarousel = ({ bannerList }: Props) => {
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
      {bannerList.map((banner, index) => {
        return (
          <div
            key={`banner-${index}`}
            className="relative"
            style={{
              objectFit: "cover",
              width: "100%",
              aspectRatio: `390 / 336`,
            }}
          >
            <DefaultLink href={banner.link}>
              <DefaultImg
                isPriority={true}
                src={banner.imgPath}
                cover={false}
                select={false}
                alt="배너이미지"
              />
            </DefaultLink>
          </div>
        );
      })}
    </Carousel>
  );
};

export default MainBannerCarousel;
