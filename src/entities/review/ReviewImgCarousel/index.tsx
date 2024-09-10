import ImgCarousel from "@/shared/ui/ImgCarousel";
import { Props } from "./types";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { classNames } from "@/shared/helpers/classNames";

const ReviewImgCarousel = ({ className = "", imgList }: Props) => {
  const router = useRouter();

  return (
    <ImgCarousel
      className={classNames(className)}
      imgList={imgList}
      imgAlt="리뷰 이미지"
      onClickImg={(path) => {
        stackRouterPush(router, {
          path: `/img-detail?path=${path}`,
          screen: WEBVIEW_SCREEN.IMG_DETAIL,
        });
      }}
    />
  );
};

export default ReviewImgCarousel;
