"use client";

import FrontBackSwitch from "@/components/FrontBackSwitch"; // TODO: 수정필요
import { StrictShapeConfig } from "@/types/konva";
import dynamic from "next/dynamic";
import { useState } from "react";
import CircleCross from "@/icons/circle-cross.svg";
import TextEnteringModal from "@/components/TextEnteringModal"; // TODO: 수정필요
import { useRouter } from "next/navigation";
import LiketBackSide from "@/components/LiketBackSide";
import { Else, If, Then } from "react-if";
import useWriteTab from "@/hooks/useWriteTab"; // TODO: 수정필요
import useCreateLiket from "@/hooks/useCreateLiket"; // TODO: 수정필요
import WriteTab from "@/components/WriteTab"; // TODO: 수정필요
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { classNames } from "@/shared/helpers/classNames";

const NoSSRLiketUploader = dynamic(() => import("@/components/LiketUploader"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();

  const [shapes, setShapes] = useState<StrictShapeConfig[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState(" ");

  const {
    size,
    selectedIndex,
    isTextEnteringOnFrontSide,
    handleClickFrontTextEnteringCheck,
    handleClickRemoveItem,
    handleChangeTab,
    handleClickFrontTextEnteringClose,
    handleChangeInsertedTextColor,
    handleInsertTextTab,
    handleChangeSize,
    handleInsertSticker,
  } = useWriteTab({ shapes, setShapes, selectedShapeId });

  const {
    uploadedImage,
    review,
    stageRef,
    isTextEnteringOnBackSide,
    isFront,
    handleUploadImage,
    handleClickWriteReview,
    handleClickBackTextEnteringCheck,
    handleClickBackTextEnteringClose,
    handleClickSwitchFrontBack,
  } = useCreateLiket();

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
        <LiketBackSide
          isFront={isFront}
          review={review}
          onClickReview={handleClickWriteReview}
        />
        <div className={classNames(!isFront && "hidden")}>
          <NoSSRLiketUploader
            uploadedImage={uploadedImage}
            stageRef={stageRef}
            size={size}
            shapes={shapes}
            selectedShapeId={selectedShapeId}
            onSelectShape={setSelectedShapeId}
            onChangeShape={setShapes}
            onUploadImage={handleUploadImage}
          />
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
        </div>
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
