"use client";

import { Layer, Image, Stage, Group } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import KonvaText from "./_ui/KonvaText";
import { STAGE_SIZE } from "../../_consts/size";
import { Props } from "./types";
import KonvaImage from "./_ui/KonvaImage";
import Konva from "konva";
import { StrictShapeConfig } from "../../types";
import LiketCreateIcon from "@/shared/icon/legacy/create-54.svg";

const LiketUploader = ({
  cardImageInformation,
  uploadedImage,
  shapes,
  size = "LARGE",
  stageRef,
  selectedShapeId,
  onSelectShape,
  onChangeShape,
  onUploadImage,
  onChangeBackgroundImage,
  selectedIndex,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchStateRef = useRef<{
    center: null | {
      x: number;
      y: number;
    };
    distance: number;
    angle: number;
  }>({
    center: null,
    distance: 0,
    angle: 0,
  });
  const touchStateRefForOneTouch = useRef<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });
  const [offset, setOffset] = useState({
    x: 147,
    y: 234,
  });

  const deselectShape = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
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

  const handleTouchEndStage = () => {
    touchStateRef.current = {
      distance: 0,
      center: null,
      angle: 0,
    };
    touchStateRefForOneTouch.current = {
      x: -1,
      y: -1,
    };
  };

  const pinchZoom = (e: KonvaEventObject<TouchEvent>) => {
    if (!stageRef.current) {
      return;
    }

    function getDistance(
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    function getCenter(
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) {
      return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
    }

    function getAngle(
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) {
      return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    let { center, distance, angle } = touchStateRef.current;

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

      if (touchStateRefForOneTouch.current.x === -1) {
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

        cardImageInformation &&
          onChangeBackgroundImage({
            ...(cardImageInformation || {}),
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
        // 최초 터치시 가운데 점과 각도를 저장
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

      // 거리는 scale 변화를 구하는 용도
      const scale = dist / touchStateRef.current.distance;

      // 회전 정도 구하기
      const rotation = newAngle - touchStateRef.current.angle;

      // 배경 이미지 가져오기
      const bgImage = stageRef.current.findOne("#bg-image");

      if (bgImage) {
        const oldWidth = bgImage.width();
        const oldHeight = bgImage.height();

        const newWidth = oldWidth * scale;
        const newHeight = oldHeight * scale;

        bgImage.width(newWidth);
        bgImage.height(newHeight);

        setOffset({
          x: oldWidth / 2,
          y: oldHeight / 2,
        });

        const angle = bgImage.rotation() + rotation * (180 / Math.PI);
        const isRotatable = angle <= 2 && angle >= -2;

        bgImage.rotation(isRotatable ? 0 : angle);

        cardImageInformation &&
          onChangeBackgroundImage({
            ...(cardImageInformation || {}),
            offsetX: oldWidth / 2,
            offsetY: oldHeight / 2,
            width: newWidth,
            height: newHeight,
            angle: isRotatable ? 0 : angle,
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
        onSelectShape(" ");
      }
    };

    window.addEventListener("click", handleClickOutSideOfStage);
    return () => window.removeEventListener("click", handleClickOutSideOfStage);
  }, []);

  useEffect(() => {
    Konva.hitOnDragEnabled = true;
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="liket-card center bg-[url(/icons/create-54.svg)] bg-[center_193px] bg-no-repeat overflow-hidden"
    >
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
            if (selectedIndex === 0 && selectedShapeId === " ") pinchZoom(e);
          }}
          onTouchEnd={() => {
            if (selectedIndex === 0 && selectedShapeId === " ")
              handleTouchEndStage();
          }}
        >
          <Layer>
            <Group
              clipFunc={(ctx) => {
                if (size === "SMALL") {
                  ctx.beginPath();
                  ctx.roundRect(16, 16, 262, 387, 8);
                  ctx.closePath();
                  return;
                }

                if (size === "MEDIUM") {
                  ctx.beginPath();
                  ctx.roundRect(16, 16, 262, 436, 8);
                  ctx.closePath();
                  return;
                }

                ctx.beginPath();
                ctx.roundRect(0, 0, 294, 468, 8);
                ctx.closePath();
              }}
            >
              <Image
                id="bg-image"
                image={uploadedImage}
                x={cardImageInformation!.x}
                y={cardImageInformation!.y}
                width={cardImageInformation!.width}
                height={cardImageInformation!.height}
                rotation={cardImageInformation!.angle}
                offsetX={cardImageInformation!.offsetX}
                offsetY={cardImageInformation!.offsetY}
                alt="유저가 포토 카드에 올린 배경 이미지"
              />
            </Group>
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
            className="center text-center text-body5 text-grey-02 cursor-pointer w-[100%] h-[100%] flex flex-col"
          >
            <LiketCreateIcon className="mb-[16px]" />
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
                  const h = (STAGE_SIZE.WIDTH * image.height) / image.width;
                  onChangeBackgroundImage({
                    width: STAGE_SIZE.WIDTH,
                    height: (STAGE_SIZE.WIDTH * image.height) / image.width,
                    angle: 0,
                    x: STAGE_SIZE.WIDTH / 2,
                    y:
                      (STAGE_SIZE.WIDTH * image.height) / image.width / 2 +
                      (STAGE_SIZE.HEIGHT -
                        (STAGE_SIZE.WIDTH * image.height) / image.width) /
                        2,
                    offsetX: STAGE_SIZE.WIDTH / 2,
                    offsetY: h / 2,
                  });

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
