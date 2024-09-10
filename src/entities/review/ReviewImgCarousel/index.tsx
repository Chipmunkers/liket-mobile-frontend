import ImgCarousel from "@/shared/ui/ImgCarousel";
import { Props } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { classNames } from "@/shared/helpers/classNames";
import { useEffect, useState } from "react";
import DetailImgCarousel from "@/shared/ui/DetailImgCarousel";
import { useIsWebView } from "@/shared/hooks/useIsWebview";

const ReviewImgCarousel = ({ className = "", imgList }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedImgIndex, setSelectedImgIndex] = useState<number>();
  const isWebview = useIsWebView();

  useEffect(() => {
    const selectIdxQuerystring = searchParams.get("review-img-index");

    if (!selectIdxQuerystring) {
      return setSelectedImgIndex(undefined);
    }

    setSelectedImgIndex(
      isNaN(Number(selectIdxQuerystring))
        ? undefined
        : Number(selectIdxQuerystring)
    );
  }, [searchParams]);

  return (
    <>
      {selectedImgIndex !== undefined ? (
        // * 웹 전용 확대보기 페이지
        <div className="fixed max-w-[600px] w-[100%] h-[100vh] z-10 top-0 translate-x-[-24px]">
          <DetailImgCarousel selectIdx={selectedImgIndex} imgList={imgList} />
        </div>
      ) : null}
      <ImgCarousel
        className={classNames(className)}
        imgList={imgList}
        imgAlt="리뷰 이미지"
        onClickImg={(path, i) => {
          if (!isWebview) {
            router.push(window.location.pathname + `?review-img-index=${i}`, {
              scroll: false,
            });
            return;
          }

          stackRouterPush(router, {
            path:
              `/img-detail?select=${i}&` +
              imgList.map((path) => `path=${path}`).join("&"),
            screen: WEBVIEW_SCREEN.IMG_DETAIL,
          });
        }}
      />
    </>
  );
};

export default ReviewImgCarousel;
