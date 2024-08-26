"use client";

import { Layer, Image, Stage } from "react-konva";
import { useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import KonvaText from "./_ui/KonvaText";
import { BACKGROUND_CARD_SIZES, STAGE_SIZE } from "../../_consts/size";
import { Props } from "./types";
import KonvaImage from "./_ui/KonvaImage";
import Konva from "konva";
import { StrictShapeConfig } from "../../types";

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
  const touchStateRef = useRef<{
    center: null | {
      x: number;
      y: number;
    };
    distance: number;
  }>({
    center: null,
    distance: 0,
  });
  const { x, y, width, height } = BACKGROUND_CARD_SIZES[size];

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

    let { center, distance } = touchStateRef.current;

    let dragStopped = false;

    e.evt.preventDefault();

    let touch1 = e.evt.touches[0];
    let touch2 = e.evt.touches[1];

    if (touch1 && !touch2 && !stageRef.current.isDragging() && dragStopped) {
      stageRef.current.startDrag();
      dragStopped = false;
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
        return;
      }
      const newCenter = getCenter(p1, p2);

      const dist = getDistance(p1, p2);

      if (!distance) {
        touchStateRef.current.distance = dist;
      }

      const pointTo = {
        x: (newCenter.x - stageRef.current.x()) / stageRef.current.scaleX(),
        y: (newCenter.y - stageRef.current.y()) / stageRef.current.scaleX(),
      };

      const scale =
        stageRef.current.scaleX() * (dist / touchStateRef.current.distance);

      stageRef.current.scaleX(scale);
      stageRef.current.scaleY(scale);

      const dx = newCenter.x - center.x;
      const dy = newCenter.y - center.y;

      const newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };

      stageRef.current.position(newPos);

      touchStateRef.current = {
        distance: dist,
        center: newCenter,
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
      className="liket-card center bg-[url(/icons/create-54.svg)] bg-[center_193px] bg-no-repeat"
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
            pinchZoom(e);
          }}
          onTouchEnd={handleTouchEndStage}
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
