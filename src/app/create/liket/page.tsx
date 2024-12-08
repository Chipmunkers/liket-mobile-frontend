"use client";

import { useState } from "react";
import CircleCross from "@/icons/circle-cross.svg";
import { Else, If, Then } from "react-if";
import useLiket from "./_hooks/useLiket";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { classNames } from "@/shared/helpers/classNames";
import FrontBackSwitch from "./_ui/FrontBackSwitch";
import BackSide from "./_ui/BackSide";
import TextEnteringModal from "./_ui/TextEnteringModal";
import WriteTab from "./_ui/WriteTab";
import { BgImgInfo, ImgShape, TextShape } from "./types";
import dynamic from "next/dynamic";
import { getRefValue } from "@/shared/helpers/getRefValue";
import { CardSizeType, ColorTokensType } from "../liket/types";
import { getXPos, yPos } from "./_util/position";
import useWriteTab from "./_hooks/useWriteTab";
import { useGetReview } from "./_hooks/useGetReview";
import ContentNotFound from "@/app/contents/[idx]/_ui/ContentNotFound";
import { AxiosError } from "axios";
import useCreateLiket from "./_hooks/useCreateLiket";
import { useUploadCardImg } from "./_hooks/useUploadCardImg";
import { CARD_SIZE_TO_INDEX } from "./_util/const";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";
import { useRouter } from "next/navigation";

// NOTE: React Konva는 서버사이드 렌더링이 불가함.
// https://github.com/konvajs/react-konva?tab=readme-ov-file#usage-with-nextjs
const LiketUploader = dynamic(() => import("./_ui/LiketUploader"), {
  ssr: false,
});

export default function Page({
  searchParams,
}: {
  searchParams: { review: number };
}) {
  const router = useRouter();

  const { mutate: createLiket } = useCreateLiket({
    onSuccess: () => {
      stackRouterPush(router, {
        path: `/likets`,
        screen: WEBVIEW_SCREEN.REQUESTED_CONTENT_DETAIL,
        isStack: false,
      });
    },
    onError: () => {
      customToast("라이켓 제작에 실패했어요");
    },
  });
  const { mutate: uploadCardImg } = useUploadCardImg({
    onSuccess: ({ filePath }) => {
      if (bgImgInfo && uploadedBgImgPath) {
        createLiket({
          reviewIdx: searchParams.review,
          bgImgInfo,
          cardImgPath: filePath,
          bgImgPath: uploadedBgImgPath,
          textShape,
          imgShapes,
          size: CARD_SIZE_TO_INDEX[size],
          description,
        });
      }
    },
    onError: () => {
      customToast("라이켓 이미지 업로드에 실패했어요.");
    },
  });

  const [imgShapes, setImgShapes] = useState<ImgShape[]>([]);
  const [textShape, setTextShape] = useState<TextShape | undefined>();

  const [size, setSize] = useState<CardSizeType>("LARGE");
  const [selectedImgShapeCode, setSelectedImgShapeCode] = useState<number>();
  const [isTextShapeSelected, setIsTextShapeSelected] = useState(false);
  const [bgImgInfo, setBgImgInfo] = useState<BgImgInfo>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [uploadedBgImgPath, setUploadedBgImgPath] = useState("");
  const [uploadedImage, setUploadbgImg] = useState<HTMLImageElement>();
  const [isTextEnteringOnFrontSide, setIsTextEnteringOnFrontSide] =
    useState(false);

  const { data: reviewData, error } = useGetReview(searchParams.review);

  const {
    handleChangeTab,
    handleClickRemoveItem,
    handleChangeSize,
    handleInsertSticker,
  } = useWriteTab({
    imgShapes,
    selectedImgShapeCode,
    isTextShapeSelected,
    setTextShape,
    setImgShapes,
    setSize,
    setSelectedIndex,
  });

  const handleUploadBgImg = (imgElement: HTMLImageElement) => {
    setUploadbgImg(imgElement);
  };

  const handleClickFrontTextEnteringClose = () => {
    setSelectedIndex(0);
    setIsTextEnteringOnFrontSide(false);
  };

  const handleClickFrontTextEnteringCheck = (text: string) => {
    setTextShape({
      fill: "#000",
      text,
      x: getXPos(text),
      y: yPos,
    });

    setIsTextEnteringOnFrontSide(false);
  };

  const handleInsertTextOnLiket = () => {
    !textShape && setIsTextEnteringOnFrontSide(true);
  };

  const handleChangeTextShape = (newAttrs: TextShape) => setTextShape(newAttrs);

  const handleChangeTextColor = (fill: ColorTokensType) => {
    textShape &&
      setTextShape({
        ...textShape,
        fill,
      });
  };

  const {
    description,
    handleClickWriteReview,
    stageRef,
    isTextEnteringOnBackSide,
    isFront,
    handleClickBackTextEnteringCheck,
    handleClickBackTextEnteringClose,
    handleClickSwitchFrontBack,
  } = useLiket();

  const isTextEnteringOpen =
    isTextEnteringOnBackSide || isTextEnteringOnFrontSide;

  const handleCreateLiket = () => {
    const dataURItoBlob = (dataURI: string): Blob => {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    };

    const dataURL = getRefValue(stageRef).toDataURL();
    const blobData = dataURItoBlob(dataURL);
    const file = new File([blobData], "stage-image.png", { type: "image/png" });

    uploadCardImg(file);
  };

  if ((error as AxiosError)?.response?.status === 404) {
    return (
      <>
        <Header>
          <HeaderLeft
            option={{
              back: true,
            }}
          />
          <HeaderRight
            option={{
              search: {},
            }}
          />
        </Header>
        <ContentNotFound />
      </>
    );
  }

  if (!reviewData) {
    return <></>;
  }

  return (
    <>
      <Header>
        {!isTextEnteringOpen && (
          <>
            <HeaderLeft
              option={{
                back: true,
              }}
            />
            <HeaderMiddle text="라이켓 제작" />
            <HeaderRight
              option={{
                check: {
                  disabled: !uploadedImage || !description,
                  onClick: handleCreateLiket,
                },
              }}
            />
          </>
        )}
      </Header>
      <main>
        <div className="center mt-[36px] mb-[24px]">
          <FrontBackSwitch
            isFront={isFront}
            onClickSwitch={handleClickSwitchFrontBack}
          />
        </div>
        <div
          className={classNames(
            "liket-card flex-col mx-auto p-[16px]",
            isFront && "hidden"
          )}
        >
          <BackSide
            reviewData={reviewData}
            description={description}
            onClickReview={handleClickWriteReview}
          />
        </div>
        <div className={classNames(!isFront && "hidden")}>
          <LiketUploader
            bgImgInfo={bgImgInfo}
            onChangeBackgroundImage={(bgImgInfo) => setBgImgInfo(bgImgInfo)}
            selectedIndex={selectedIndex}
            uploadedImage={uploadedImage}
            stageRef={stageRef}
            size={size}
            isTextShapeSelected={isTextShapeSelected}
            textShape={textShape}
            imgShapes={imgShapes}
            selectedImgShapeCode={selectedImgShapeCode}
            onSelectImgShape={setSelectedImgShapeCode}
            onSelectTextShape={setIsTextShapeSelected}
            onChangeTextShape={handleChangeTextShape}
            onChangeImgShapes={setImgShapes}
            onUploadImage={handleUploadBgImg}
            onUploadSuccessBgImg={setUploadedBgImgPath}
          />
        </div>
        <If condition={isFront}>
          <Then>
            <If condition={selectedImgShapeCode || isTextShapeSelected}>
              <Then>
                <button
                  className="absolute bottom-[34px] left-1/2 transform -translate-x-1/2"
                  onClick={handleClickRemoveItem}
                >
                  <CircleCross width="36" height="36" />
                </button>
              </Then>
              <Else>
                <WriteTab
                  selectedIndex={selectedIndex}
                  onChangeTab={handleChangeTab}
                  hidden={!!selectedImgShapeCode || !!isTextShapeSelected}
                  enabled={!!uploadedImage}
                  onClickText={handleInsertTextOnLiket}
                  onClickChangeSize={handleChangeSize}
                  onClickSticker={handleInsertSticker}
                  onClickColor={handleChangeTextColor}
                />
              </Else>
            </If>
          </Then>
          <Else></Else>
        </If>
      </main>
      <TextEnteringModal
        text={textShape?.text || ""}
        isOpen={isTextEnteringOnFrontSide}
        maxLength={18}
        allowNewLine={false}
        onClickClose={handleClickFrontTextEnteringClose}
        onClickCheck={handleClickFrontTextEnteringCheck}
      />
      <TextEnteringModal
        text={description}
        isOpen={isTextEnteringOnBackSide}
        maxLength={42}
        allowNewLine
        onClickClose={handleClickBackTextEnteringClose}
        onClickCheck={handleClickBackTextEnteringCheck}
      />
    </>
  );
}
