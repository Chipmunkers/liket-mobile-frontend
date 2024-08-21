"use client";

import { Layer, Image, Stage } from "react-konva";
import { RefObject, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { getRefValue } from "@/utils/helpers";
import { CardSizeType } from "../WriteTab/SizeEdit";
import { KonvaEventObject } from "konva/lib/Node";
import KonvaText from "../KonvoComponents/KonvaText";
import KonvaImage from "../KonvoComponents/KonvaImage";
import { EmptyFunction } from "@/types/common";
import { StrictShapeConfig } from "@/types/konva";
import { BACKGROUND_CARD_SIZES, STAGE_SIZE } from "@/utils/create-liket";

interface Props {
  uploadedImage: HTMLImageElement | undefined;
  selectedShapeId: string;
  shapes: StrictShapeConfig[];
  stageRef: RefObject<Konva.Stage>;
  size: CardSizeType;
  onSelectShape: (shapeId: string) => void;
  onChangeShape: (shapes: StrictShapeConfig[]) => void;
  onUploadImage: (dataUrl: HTMLImageElement) => void;
}

/**
 * @deprecated
 */
const LiketUploader = ({
  uploadedImage,
  shapes,
  size = "LARGE",
  stageRef,
  selectedShapeId,
  onSelectShape,
  onChangeShape,
  onUploadImage,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { x, y, width, height } = BACKGROUND_CARD_SIZES[size];

  const onClickStage = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const isEmptyAreaClicked = e.target === e.target.getStage();
    const isBackgroundImageClicked = e.target.attrs.id === "bg-image";

    if (isEmptyAreaClicked || isBackgroundImageClicked) {
      onSelectShape(" ");
    }
  };

  const onChange = (newAttrs: StrictShapeConfig, idx: number) => {
    const newShapes = [...shapes];
    newShapes[idx] = newAttrs;
    onChangeShape(newShapes);
  };

  const handleSelectItem = (id: string) => {
    onSelectShape(id);
  };

  useEffect(() => {
    const handleClickOutSideOfStage = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement)?.tagName !== "CANVAS" &&
        (e.target as HTMLElement)?.tagName !== "TEXTAREA"
      ) {
        onSelectShape(" ");
      }
    };

    window.addEventListener("click", handleClickOutSideOfStage);
    return () => window.removeEventListener("click", handleClickOutSideOfStage);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="liket-card center bg-[url(/icons/create-54.svg)] bg-[center_193px] bg-no-repeat"
    >
      {uploadedImage ? (
        <Stage
          ref={stageRef}
          width={STAGE_SIZE.WIDTH}
          height={STAGE_SIZE.HEIGHT}
          onMouseDown={onClickStage}
          onTouchStart={onClickStage}
        >
          <Layer>
            <Image
              id="bg-image"
              image={uploadedImage}
              x={x}
              y={y}
              width={width}
              height={height}
              objectFit="contain"
              alt="유저가 포토 카드에 올린 배경 이미지"
              cornerRadius={8}
            />
            {shapes.map((shape, idx) => {
              const { id, type } = shape;

              switch (type) {
                case "text": {
                  return (
                    <KonvaText
                      key={id}
                      isSelected={id === selectedShapeId}
                      shapeProps={shape}
                      onSelect={() => handleSelectItem(id)}
                      onChange={(newAttrs: StrictShapeConfig) =>
                        onChange(newAttrs, idx)
                      }
                    />
                  );
                }
                case "image": {
                  return (
                    <KonvaImage
                      key={id}
                      isSelected={id === selectedShapeId}
                      shapeProps={shape}
                      onSelect={() => handleSelectItem(id)}
                      onChange={(newAttrs: StrictShapeConfig) =>
                        onChange(newAttrs, idx)
                      }
                    />
                  );
                }
              }
            })}
          </Layer>
        </Stage>
      ) : (
        <>
          <label
            htmlFor="image-uploader"
            className="center text-center text-body5 text-grey-02 mt-[110px] cursor-pointer w-[100%] h-[100%]"
          >
            이미지를 추가해
            <br />
            나만의 티켓을 만들어보세요.
          </label>
          <input
            id="image-uploader"
            ref={inputRef}
            accept="image/*"
            type="file"
            hidden
            onChange={(e) => {
              const files = e.target.files;

              if (!files) {
                return;
              }

              const file = files[0];
              const reader = new FileReader();

              reader.onload = () => {
                const image = new window.Image();
                image.src = reader.result as string;
                image.onload = () => {
                  onUploadImage(image);
                };
              };

              reader.readAsDataURL(file);
            }}
          />
        </>
      )}
    </div>
  );
};

export default LiketUploader;
