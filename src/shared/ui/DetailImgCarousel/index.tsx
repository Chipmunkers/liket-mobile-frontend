import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ButtonBase } from "@mui/material";
import CrossIcon from "@/shared/icon/common/cross/DefaultCrossIcon.svg";
import { stackRouterBack } from "@/shared/helpers/stackRouter";
import { colors } from "@/shared/style/color";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { Props } from "./types";
import { useRouter } from "next/navigation";
import { classNames } from "@/shared/helpers/classNames";
import { useIsWebView } from "@/shared/hooks/useIsWebview";

const DetailImgCarousel = ({
  className = "",
  selectIdx = 0,
  imgList,
}: Props) => {
  const router = useRouter();
  const isWebview = useIsWebView();

  return (
    <div
      className={classNames(
        "flex items-center h-[100vh] w-[100%] bg-grey-black",
        className
      )}
    >
      <ButtonBase
        disableRipple
        className="icon-button absolute top-[12px] left-[12px] w-[24px] h-[24px] flex justify-center items-center"
        onClick={() => {
          if (!isWebview) return router.back();

          stackRouterBack(router);
        }}
      >
        <CrossIcon fill={colors.grey.white} />
      </ButtonBase>
      <Carousel
        className="w-[100%]"
        dynamicHeight={true}
        infiniteLoop={false}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        emulateTouch={true}
        swipeScrollTolerance={10}
        preventMovementUntilSwipeScrollTolerance={true}
        selectedItem={selectIdx}
      >
        {imgList.map((path, i) => (
          <div
            key={`carousel-img-${i}`}
            className="relative w-[100%] h-[calc(100vh-120px)]"
          >
            <Image
              className="select-none"
              src={process.env.NEXT_PUBLIC_IMAGE_SERVER + path}
              alt="이미지"
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DetailImgCarousel;
