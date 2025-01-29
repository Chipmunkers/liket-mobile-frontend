"use client";

import { Layer, Image, Stage, Group } from "react-konva";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import LiketCreateIcon from "@/shared/icon/legacy/create-54.svg";
import KonvaImage from "./KonvaImage";
import KonvaText from "./KonvaText";
import { CardSizeType, StrictShapeConfig } from "./types/Card";
import { STAGE_SIZE } from "./consts/card";
import { useUploadLiketImg } from "../apis/useUploadLiketImg";
import { BgImgInfo, ImgShape, TextShape } from "../../../shared/types/liket";
import { compressImage } from "@/shared/helpers/compressImage";

type LiketUploaderProps = {
  uploadedImage: HTMLImageElement | undefined;
  imgShapes: ImgShape[];
  textShape: TextShape | undefined;
  stageRef: RefObject<Konva.Stage>;
  isTextShapeSelected: boolean;
  size: CardSizeType;
  selectedImgShapeCode: number | undefined;
  bgImgInfo: BgImgInfo | undefined;
  onSelectImgShape: (code?: number) => void;
  onSelectTextShape: (isSelected: boolean) => void;
  onChangeImgShapes: (imgShapes: ImgShape[]) => void;
  onChangeTextShape: (textShape: TextShape) => void;
  onUploadImage: (dataUrl: HTMLImageElement) => void;
  onChangeBackgroundImage: (bgImgInfo: BgImgInfo) => void;
  onUploadSuccessBgImg: Dispatch<SetStateAction<string>>;
  selectedIndex: number;
};

const LiketUploader = ({
  bgImgInfo,
  uploadedImage,
  imgShapes,
  textShape,
  size = "LARGE",
  stageRef,
  selectedImgShapeCode,
  isTextShapeSelected,
  onSelectImgShape,
  onSelectTextShape,
  onChangeImgShapes,
  onChangeTextShape,
  onUploadImage,
  onChangeBackgroundImage,
  onUploadSuccessBgImg,
  selectedIndex,
}: LiketUploaderProps) => {
  const { mutate: uploadImage } = useUploadLiketImg({
    onSuccess: ({ fullUrl }) => {
      onUploadSuccessBgImg(fullUrl);
    },
  });

  const touchStateRef = useRef<{
    center?: {
      x: number;
      y: number;
    };
    distance: number;
    angle: number;
  }>({
    distance: 0,
    angle: 0,
  });
  const touchStateRefForOneTouch = useRef<{ x: number; y: number }>();

  const deselectShape = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const isEmptyAreaClicked = e.target === e.target.getStage();
    const isBackgroundImageClicked = e.target.attrs.id === "bg-image";

    if (isEmptyAreaClicked || isBackgroundImageClicked) {
      onSelectImgShape();
      onSelectTextShape(false);
    }
  };

  const handleChangeImgShape = (newAttrs: StrictShapeConfig, idx: number) => {
    const newShapes = [...imgShapes];
    newShapes[idx] = newAttrs;
    onChangeImgShapes(newShapes);
  };

  const handleTouchEndStage = () => {
    touchStateRef.current = {
      distance: 0,
      angle: 0,
    };
    touchStateRefForOneTouch.current = undefined;
  };

  const pinchZoom = (e: KonvaEventObject<TouchEvent>) => {
    if (!stageRef.current) {
      return;
    }

    let { center, distance } = touchStateRef.current;

    let dragStopped = false;

    e.evt.preventDefault();

    let touch1 = e.evt.touches[0];
    let touch2 = e.evt.touches[1];

    if (touch1 && !touch2 && !stageRef.current.isDragging() && dragStopped) {
      stageRef.current.startDrag();
      dragStopped = false;
    }

    if (touch1 && !touch2) {
      if (stageRef.current.isDragging()) {
        dragStopped = true;
        stageRef.current.stopDrag();
      }

      const p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };

      if (!touchStateRefForOneTouch.current) {
        touchStateRefForOneTouch.current = {
          x: p1.x,
          y: p1.y,
        };
        return;
      }

      const bgImage = stageRef.current.findOne("#bg-image");

      if (bgImage) {
        const newX = bgImage.x() + p1.x - touchStateRefForOneTouch.current.x;
        const newY = bgImage.y() + p1.y - touchStateRefForOneTouch.current.y;

        bgImage.position({
          x: newX,
          y: newY,
        });

        bgImgInfo &&
          onChangeBackgroundImage({
            ...(bgImgInfo || {}),
            x: newX,
            y: newY,
          });
        stageRef.current.batchDraw();
      }

      touchStateRefForOneTouch.current = {
        x: p1.x,
        y: p1.y,
      };
      return;
    }

    if (touch1 && touch2) {
      if (stageRef.current.isDragging()) {
        dragStopped = true;
        stageRef.current.stopDrag();
      }

      const p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      const p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      if (!center) {
        touchStateRef.current.center = getCenter(p1, p2);
        touchStateRef.current.angle = getAngle(p1, p2);
        return;
      }

      const newCenter = getCenter(p1, p2);
      const dist = getDistance(p1, p2);
      const newAngle = getAngle(p1, p2);

      if (!distance) {
        touchStateRef.current.distance = dist;
      }

      const scale = dist / touchStateRef.current.distance;
      const rotation = newAngle - touchStateRef.current.angle;
      const bgImage = stageRef.current.findOne("#bg-image");

      if (bgImage) {
        const oldWidth = bgImage.width();
        const oldHeight = bgImage.height();

        const newWidth = oldWidth * scale;
        const newHeight = oldHeight * scale;

        bgImage.width(newWidth);
        bgImage.height(newHeight);

        const angle = bgImage.rotation() + rotation * (180 / Math.PI);
        const isRotatable = angle <= 2 && angle >= -2;

        bgImage.rotation(isRotatable ? 0 : angle);

        bgImgInfo &&
          onChangeBackgroundImage({
            ...(bgImgInfo || {}),
            offsetX: oldWidth / 2,
            offsetY: oldHeight / 2,
            width: newWidth,
            height: newHeight,
            rotation: isRotatable ? 0 : angle,
          });

        stageRef.current.batchDraw();
      }

      touchStateRef.current = {
        distance: dist,
        center: newCenter,
        angle: newAngle,
      };
    }
  };

  useEffect(() => {
    const handleClickOutSideOfStage = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement)?.tagName !== "CANVAS" &&
        (e.target as HTMLElement)?.tagName !== "TEXTAREA"
      ) {
        onSelectImgShape();
        onSelectTextShape(false);
      }
    };

    window.addEventListener("click", handleClickOutSideOfStage);
    return () => window.removeEventListener("click", handleClickOutSideOfStage);
  }, []);

  useEffect(() => {
    Konva.hitOnDragEnabled = true;
  }, []);

  return (
    <div className="liket-card center bg-[url(/icons/create-54.svg)] bg-[center_193px] bg-no-repeat overflow-hidden">
      {uploadedImage ? (
        <Stage
          ref={stageRef}
          width={STAGE_SIZE.WIDTH}
          height={STAGE_SIZE.HEIGHT}
          onMouseDown={(e) => deselectShape(e)}
          onTouchStart={(e) => {
            deselectShape(e);
          }}
          onTouchMove={(e) => {
            if (
              selectedIndex === 0 &&
              !selectedImgShapeCode &&
              !isTextShapeSelected
            ) {
              pinchZoom(e);
            }
          }}
          onTouchEnd={() => {
            if (
              selectedIndex === 0 &&
              !selectedImgShapeCode &&
              !isTextShapeSelected
            ) {
              handleTouchEndStage();
            }
          }}
        >
          <Layer>
            <Group
              clipFunc={(ctx) => {
                ctx.beginPath();

                switch (size) {
                  case "SMALL":
                    ctx.roundRect(16, 16, 262, 387, 8);
                    break;

                  case "MEDIUM":
                    ctx.roundRect(16, 16, 262, 436, 8);
                    break;

                  case "LARGE":
                    ctx.roundRect(0, 0, 294, 468, 8);
                }

                ctx.closePath();
              }}
            >
              <Image
                id="bg-image"
                image={uploadedImage}
                x={bgImgInfo!.x}
                y={bgImgInfo!.y}
                width={bgImgInfo!.width}
                height={bgImgInfo!.height}
                rotation={bgImgInfo!.rotation}
                offsetX={bgImgInfo!.offsetX}
                offsetY={bgImgInfo!.offsetY}
                alt="유저가 포토 카드에 올린 배경 이미지"
              />
            </Group>
            {imgShapes.map((shape, idx) => {
              const { code } = shape;

              return (
                <KonvaImage
                  key={code}
                  isSelected={code === selectedImgShapeCode}
                  shapeProps={shape}
                  onSelect={() => {
                    onSelectTextShape(false);
                    onSelectImgShape(code);
                  }}
                  onChange={(newAttrs: StrictShapeConfig) =>
                    handleChangeImgShape(newAttrs, idx)
                  }
                />
              );
            })}
            {textShape && (
              <KonvaText
                isSelected={isTextShapeSelected}
                shapeProps={textShape}
                onSelect={() => {
                  onSelectTextShape(true);
                  onSelectImgShape();
                }}
                onChange={(newAttrs: TextShape) => onChangeTextShape(newAttrs)}
              />
            )}
          </Layer>
        </Stage>
      ) : (
        <>
          <label
            htmlFor="image-uploader"
            className="center text-center text-body5 text-grey-02 cursor-pointer w-[100%] h-[100%] flex flex-col"
          >
            <LiketCreateIcon className="mb-[16px]" />
            이미지를 추가해
            <br />
            나만의 티켓을 만들어보세요.
          </label>
          <input
            id="image-uploader"
            accept="image/*"
            type="file"
            hidden
            onChange={(e) => {
              const files = e.target.files;

              if (!files) {
                return;
              }

              if (files) {
                const reader = new FileReader();
                const file = files[0];

                reader.onloadend = async () => {
                  const image = new window.Image();
                  image.onload = () => {
                    const { width: IMAGE_WIDTH, height: IMAGE_HEIGHT } = image;
                    const { WIDTH: STAGE_WIDTH, HEIGHT: STAGE_HEIGHT } =
                      STAGE_SIZE;
                    const scale = STAGE_WIDTH / IMAGE_WIDTH;
                    const NEW_IMAGE_HEIGHT = scale * IMAGE_HEIGHT;
                    onChangeBackgroundImage({
                      width: STAGE_WIDTH,
                      height: NEW_IMAGE_HEIGHT,
                      rotation: 0,
                      x: STAGE_WIDTH / 2,
                      y:
                        NEW_IMAGE_HEIGHT / 2 +
                        (STAGE_HEIGHT - NEW_IMAGE_HEIGHT) / 2,
                      offsetX: STAGE_WIDTH / 2,
                      offsetY: NEW_IMAGE_HEIGHT / 2,
                    });
                    onUploadImage(image);
                  };

                  image.src = reader.result as string;

                  const formData = new FormData();
                  formData.append("file", await compressImage(files[0]));
                  uploadImage(formData);
                };

                reader.readAsDataURL(file);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default LiketUploader;

const getDistance = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

const getCenter = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
});

const getAngle = (p1: { x: number; y: number }, p2: { x: number; y: number }) =>
  Math.atan2(p2.y - p1.y, p2.x - p1.x);
