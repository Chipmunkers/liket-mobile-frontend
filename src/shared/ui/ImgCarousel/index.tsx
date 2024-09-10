import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Props } from "./types";
import DefaultImg from "@/shared/ui/DefaultImg";
import { classNames } from "@/shared/helpers/classNames";

const ImgCarousel = ({
  imgList,
  className = "",
  infiniteLoop = true,
  imgAlt = "캐러셀 이미지",
  aspectRatio = "1 / 1",
  onClickImg,
}: Props) => {
  return (
    <Carousel
      className={classNames(className)}
      infiniteLoop={infiniteLoop}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      emulateTouch={true}
      swipeScrollTolerance={10}
      preventMovementUntilSwipeScrollTolerance={true}
    >
      {imgList.map((path, i) => (
        <div
          key={`carousel-img-${i}`}
          className="relative w-[100%]"
          style={{ aspectRatio }}
          onClick={() => {
            onClickImg && onClickImg(path);
          }}
        >
          <DefaultImg src={path} alt={imgAlt} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImgCarousel;
