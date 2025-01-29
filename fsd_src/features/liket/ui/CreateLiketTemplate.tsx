import customToast from "@/shared/helpers/customToast";
import { useUploadCardImg } from "../api/useUploadCardImg";
import { CARD_SIZE_TO_INDEX } from "./consts/card";
import { Else, If, Then } from "react-if";
import CircleCross from "@/icons/circle-cross.svg";
import { useState } from "react";
import { CardSizeType, ColorTokensType } from "./types/Card";
import useWriteTab from "../hook/useWriteTab";
import { getXPos, yPos } from "../util/helper";
import useLiket from "../hook/useLiket";
import { getRefValue } from "@/shared/helpers/getRefValue";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import FrontBackSwitch from "./FrontBackSwitch";
import { classNames } from "@/shared/helpers/classNames";
import WriteTab from "./WriteTab";
import BackSide from "./BackSide";
import TextEnteringModal from "./TextEntringModal";
import { BgImgInfo, ImgShape, TextShape } from "../../../shared/type/liket";
import dynamic from "next/dynamic";
import { ReviewEntity } from "../../../shared/api/types/ReviewEntity";
import { CreateLiketDto } from "../api/CreateLiketDto";

interface CreateLiketTemplateProps {
  liketInformation: FrontInformation;
  reviewData: Pick<ReviewEntity, "author" | "starRating" | "visitTime"> & {
    title: string;
    genre: string;
  };
  onSave: (payload: CreateLiketDto) => void;
}

interface FrontInformation {
  bgImgPath: string;
  bgImgInfo?: BgImgInfo;
  imgShapes: ImgShape[];
  textShape?: TextShape | undefined;
  size: 1 | 2 | 3;
  description: string;
}

// NOTE: React Konva는 서버사이드 렌더링이 불가함.
// https://github.com/konvajs/react-konva?tab=readme-ov-file#usage-with-nextjs
const LiketUploader = dynamic(() => import("./LiketUploader"), {
  ssr: false,
});

export const CreateLiketTemplate = ({
  liketInformation,
  reviewData,
  onSave,
}: CreateLiketTemplateProps) => {
  const { mutate: uploadCardImg } = useUploadCardImg({
    onSuccess: ({ filePath }) => {
      if (bgImgInfo && uploadedBgImgPath) {
        onSave({
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

  const [imgShapes, setImgShapes] = useState<ImgShape[]>(
    liketInformation.imgShapes
  );
  const [textShape, setTextShape] = useState<TextShape | undefined>(
    liketInformation.textShape
  );

  const [size, setSize] = useState<CardSizeType>("LARGE");
  const [selectedImgShapeCode, setSelectedImgShapeCode] = useState<number>();
  const [isTextShapeSelected, setIsTextShapeSelected] = useState(false);
  const [bgImgInfo, setBgImgInfo] = useState<BgImgInfo | undefined>(
    liketInformation.bgImgInfo
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [uploadedBgImgPath, setUploadedBgImgPath] = useState(
    liketInformation.bgImgPath
  );
  const [uploadedImage, setUploadbgImg] = useState<
    HTMLImageElement | undefined
  >(() => {
    if (liketInformation.bgImgPath) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = liketInformation.bgImgPath;
      return img;
    }

    return undefined;
  });

  const [isTextEnteringOnFrontSide, setIsTextEnteringOnFrontSide] =
    useState(false);

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
  } = useLiket({
    edittedDescription: liketInformation.description,
  });

  const isTextEnteringOpen =
    isTextEnteringOnBackSide || isTextEnteringOnFrontSide;

  const handleCreateLiket = async () => {
    // 1. 먼저 현재 stage의 참조를 저장
    const stage = getRefValue(stageRef);

    // 2. 선택 상태를 해제
    setSelectedImgShapeCode(undefined);
    setIsTextShapeSelected(false);

    // 3. 상태 업데이트가 DOM에 반영될 때까지 대기
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // 4. 이미지 생성 및 변환 함수
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

    // 5. 상태 업데이트 후 이미지 생성
    const dataURL = stage.toDataURL();
    const blobData = dataURItoBlob(dataURL);
    const file = new File([blobData], "stage-image.png", { type: "image/png" });

    uploadCardImg(file);
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
};
