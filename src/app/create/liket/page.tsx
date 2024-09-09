"use client";

import { useState } from "react";
import CircleCross from "@/icons/circle-cross.svg";
import { useRouter } from "next/navigation";
import { Else, If, Then } from "react-if";
import useWriteTab from "./_hooks/useWriteTab";
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
import { StrictShapeConfig } from "./types";
import dynamic from "next/dynamic";
import { useGetReview } from "./_hooks/useGetReview";
import ContentNotFound from "@/app/requested-contents/[idx]/_ui/ContentNotFound";
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
  // const { data: reviewData, error } = useGetReview(searchParams.review);

  const [shapes, setShapes] = useState<StrictShapeConfig[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState(" ");
  const [cardImageInformation, setCardImageInformation] =
    useState<CardImageInformation>();

  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement>();
  const handleUploadImage = (imageElement: HTMLImageElement) =>
    setUploadedImage(imageElement);

  // const { mutate: createLiket } = useCreateLiket();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTextEnteringOnFrontSide, setIsTextEnteringOnFrontSide] =
    useState(false);
  const [size, setSize] = useState<CardSizeType>("LARGE");

  const handleClickRemoveItem = () => {
    const targetShape = shapes.find(({ id }) => id === selectedShapeId);

    if (targetShape?.type === "text") {
      setSelectedIndex(0);
    }

    const newShapes = shapes.filter(({ id }) => id !== selectedShapeId);
    setShapes(newShapes);
  };

  const handleChangeTab = (index: number) => setSelectedIndex(index);

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

  const handleInsertTextTab = () => {
    const isTextExist = shapes.some(({ type }) => type === "text");
    !isTextExist && setIsTextEnteringOnFrontSide(true);
  };

  const handleChangeSize = (size: CardSizeType) => setSize(size);

  const handleInsertSticker = async (sticker: IconType) => {
    const num_of_images = shapes.map(({ type }) => type === "image").length;

    if (num_of_images > 10) {
      return false;
    }

    try {
      const response = await fetch(`/stickers/${sticker}.svg`);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const image = new window.Image();
        image.src = reader.result as string;
        image.onload = () => {
          setShapes([
            ...shapes,
            {
              type: "image",
              id: generateRandomId(10),
              image,
              width: 80,
              height: 80,
              x: 0,
              y: 0,
            },
          ]);
        };
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("스티커를 가져오는 도중 에러가 발생했습니다", error);
    }
  };

  const handleChangeInsertedTextColor = (fill: ColorTokensType) => {
    const textShapeIdx = shapes.findIndex(({ type }) => type === "text");

    const newShapes = [...shapes];
    newShapes[textShapeIdx] = {
      ...newShapes[textShapeIdx],
      fill,
    };

    setShapes(newShapes);
  };

  const {
    uploadedImage,
    oneLineReview,
    stageRef,
    isTextEnteringOnBackSide,
    isFront,
    handleUploadImage,
    handleClickWriteReview,
    handleClickBackTextEnteringCheck,
    handleClickBackTextEnteringClose,
    handleClickSwitchFrontBack,
  } = useLiket();

  const isTextEnteringOpen =
    isTextEnteringOnBackSide || isTextEnteringOnFrontSide;

  const handleCreateLiket = () => {
    // const dataURL = getRefValue(stageRef).toDataURL();
    // const json = JSON.stringify(shapes);
    // const bg = (uploadedImage as HTMLImageElement).src;
    // console.log("😂", json);
    // console.log("😍", bg);
    // router.push("/mypage/likets/1");
  };

  // if ((error as AxiosError)?.response?.status === 404) {
  //   return (
  //     <>
  //       <Header>
  //         <HeaderLeft
  //           option={{
  //             back: true,
  //           }}
  //         />
  //         <HeaderRight
  //           option={{
  //             search: {},
  //           }}
  //         />
  //       </Header>
  //       <ContentNotFound />
  //     </>
  //   );
  // }

  // if (!reviewData) {
  //   return <></>;
  // }

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
          {/* <BackSide
            reviewData={reviewData}
            oneLineReview={oneLineReview}
            onClickReview={handleClickWriteReview}
          /> */}
        </div>
        <div className={classNames(!isFront && "hidden")}>
          <LiketUploader
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
              onClickText={handleInsertTextTab}
              onClickChangeSize={handleChangeSize}
              onClickSticker={handleInsertSticker}
              onClickColor={handleChangeInsertedTextColor}
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
