"use client";

import { useEffect, useState } from "react";
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
import { CardImageInformation, StrictShapeConfig } from "./types";
import dynamic from "next/dynamic";
import { getRefValue } from "@/shared/helpers/getRefValue";
import { useGetLiket } from "./_hooks/useGetLiket";
import { CardSizeType, ColorTokensType } from "../liket/types";
import { getXPos, yPos } from "./_util/position";
import { generateRandomId } from "@/shared/helpers/random";
import useWriteTab from "./_hooks/useWriteTab";
import { useGetReview } from "./_hooks/useGetReview";
import ContentNotFound from "@/app/contents/[idx]/_ui/ContentNotFound";
import { AxiosError } from "axios";

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
  const [shapes, setShapes] = useState<StrictShapeConfig[]>([]);
  const [size, setSize] = useState<CardSizeType>("LARGE");
  const [selectedShapeId, setSelectedShapeId] = useState(" ");
  const [cardImageInformation, setCardImageInformation] =
    useState<CardImageInformation>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement>();
  const [isTextEnteringOnFrontSide, setIsTextEnteringOnFrontSide] =
    useState(false);

  const { data: reviewData, error } = useGetReview(searchParams.review);
  const { data: restoredLiket, isSuccess } = useGetLiket({ idx: 1 });

  const {
    handleChangeTab,
    handleClickRemoveItem,
    handleChangeSize,
    handleInsertSticker,
  } = useWriteTab({
    shapes,
    selectedShapeId,
    setShapes,
    setSize,
    setSelectedIndex,
  });

  const handleUploadImage = (imageElement: HTMLImageElement) =>
    setUploadedImage(imageElement);

  const handleClickFrontTextEnteringClose = () => {
    setSelectedIndex(0);
    setIsTextEnteringOnFrontSide(false);
  };

  const handleClickFrontTextEnteringCheck = (text: string) => {
    setShapes([
      ...shapes,
      {
        type: "text",
        id: generateRandomId(10),
        fill: "black",
        text,
        x: getXPos(text),
        y: yPos,
      },
    ]);

    setIsTextEnteringOnFrontSide(false);
  };

  const handleInsertTextOnLiket = () => {
    const isTextExist = shapes.some(({ type }) => type === "text");
    !isTextExist && setIsTextEnteringOnFrontSide(true);
  };

  const handleChangeTextColor = (fill: ColorTokensType) => {
    const textShapeIdx = shapes.findIndex(({ type }) => type === "text");

    const newShapes = [...shapes];
    newShapes[textShapeIdx] = {
      ...newShapes[textShapeIdx],
      fill,
    };

    setShapes(newShapes);
  };

  const {
    oneLineReview,
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
    const dataURL = getRefValue(stageRef).toDataURL();
    const shapesToSave = shapes.map((shape) => {
      if (shape.type === "image") {
        return {
          ...shape,
          image: shape.image.src,
        };
      }

      return shape;
    });

    const payload = {
      shapes: JSON.stringify(shapesToSave),
      cardImageSrc: dataURL,
      backgroundImage: (uploadedImage as HTMLImageElement).src,
      cardSize: size,
      cardImageInformation,
    };

    localStorage.setItem("liket", JSON.stringify(payload));
    // router.push("/mypage/likets/1");
  };

  useEffect(() => {
    if (isSuccess && restoredLiket) {
      const { shapes, backgroundImage, cardSize, cardImageInformation } =
        restoredLiket as {
          shapes: string;
          backgroundImage: any;
          cardSize: any;
          cardImageInformation: any;
        };
      const $image = new window.Image();
      $image.src = backgroundImage;
      $image.alt = "배경 사진";

      const shapesWithImage = (JSON.parse(shapes) as any[]).map((shape) => {
        if (shape.type === "image") {
          const image = new Image();
          image.src = shape.image;
          image.alt = "스티커";

          return { ...shape, image };
        }

        return shape;
      });

      $image.onload = () => {
        setUploadedImage($image);
        setShapes(shapesWithImage);
        setSize(cardSize);
        setCardImageInformation(cardImageInformation);
      };
    }
  }, [isSuccess, restoredLiket]);

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
                  disabled: !uploadedImage,
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
            oneLineReview={oneLineReview}
            onClickReview={handleClickWriteReview}
          />
        </div>
        <div className={classNames(!isFront && "hidden")}>
          <LiketUploader
            cardImageInformation={cardImageInformation}
            onChangeBackgroundImage={(cardImageInformation) =>
              setCardImageInformation(cardImageInformation)
            }
            selectedIndex={selectedIndex}
            uploadedImage={uploadedImage}
            stageRef={stageRef}
            size={size}
            shapes={shapes}
            selectedShapeId={selectedShapeId}
            onSelectShape={setSelectedShapeId}
            onChangeShape={setShapes}
            onUploadImage={handleUploadImage}
          />
        </div>
        <If condition={selectedShapeId.length > 1}>
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
              hidden={selectedShapeId.length > 1}
              enabled={!!uploadedImage}
              onClickText={handleInsertTextOnLiket}
              onClickChangeSize={handleChangeSize}
              onClickSticker={handleInsertSticker}
              onClickColor={handleChangeTextColor}
            />
          </Else>
        </If>
      </main>
      <TextEnteringModal
        isOpen={isTextEnteringOnFrontSide}
        maxLength={18}
        allowNewLine={false}
        onClickClose={handleClickFrontTextEnteringClose}
        onClickCheck={handleClickFrontTextEnteringCheck}
      />
      <TextEnteringModal
        isOpen={isTextEnteringOnBackSide}
        maxLength={42}
        allowNewLine
        onClickClose={handleClickBackTextEnteringClose}
        onClickCheck={handleClickBackTextEnteringCheck}
      />
    </>
  );
}
