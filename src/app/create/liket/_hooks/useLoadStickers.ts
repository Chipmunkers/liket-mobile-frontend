import { useEffect, useState } from "react";
import sticker1 from "../../../../../public/stickers/꽃.svg";
import sticker2 from "../../../../../public/stickers/리본.svg";
import sticker3 from "../../../../../public/stickers/리본끈1.svg";
import sticker4 from "../../../../../public/stickers/리본끈2.svg";
import sticker5 from "../../../../../public/stickers/무지개.svg";
import sticker6 from "../../../../../public/stickers/반짝이.svg";
import sticker7 from "../../../../../public/stickers/별1.svg";
import sticker8 from "../../../../../public/stickers/별2.svg";
import sticker9 from "../../../../../public/stickers/선글라스.svg";
import sticker10 from "../../../../../public/stickers/스마일.svg";
import sticker11 from "../../../../../public/stickers/음표1.svg";
import sticker12 from "../../../../../public/stickers/음표2.svg";
import sticker13 from "../../../../../public/stickers/클로버.svg";
import sticker14 from "../../../../../public/stickers/하트.svg";

const stickers = [
  { code: 1, svg: sticker1 },
  { code: 2, svg: sticker2 },
  { code: 3, svg: sticker3 },
  { code: 4, svg: sticker4 },
  { code: 5, svg: sticker5 },
  { code: 6, svg: sticker6 },
  { code: 7, svg: sticker7 },
  { code: 8, svg: sticker8 },
  { code: 9, svg: sticker9 },
  { code: 10, svg: sticker10 },
  { code: 11, svg: sticker11 },
  { code: 12, svg: sticker12 },
  { code: 13, svg: sticker13 },
  { code: 14, svg: sticker14 },
];

const stickerUrls = stickers.map(({ svg }) => svg);

export const useLoadStickers = () => {
  const [stickerImages, setStickerImages] = useState<CanvasImageSource[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = stickerUrls.map(
        (url: string) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
          });
        }
      );

      try {
        const loadedImages: HTMLImageElement[] = await Promise.all(
          imagePromises
        );
        setStickerImages(loadedImages);
      } catch (error) {
        console.error("이미지 로딩 중 오류 발생:", error);
      }
    };

    loadImages();
  }, []);
  // const [stickerNumberToSticker, setStickerNumberToStiker] = useState<{
  //   [id: string]: string;
  // }>();

  // useEffect(() => {
  //   const loadImages = async () => {
  //     const imagePromises = stickers.map((sticker) => {
  //       return new Promise<{ code: number; image: HTMLImageElement }>(
  //         (resolve) => {
  //           const img = new Image();
  //           const blob = new Blob([sticker.svg], { type: "image/svg+xml" });
  //           const url = URL.createObjectURL(blob);
  //           img.src = url;
  //           img.onload = () => {
  //             URL.revokeObjectURL(url);
  //             resolve({ code: sticker.code, image: img });
  //           };
  //         }
  //       );
  //     });

  //     const images = await Promise.all(imagePromises);

  //     setStickerNumberToStiker(
  //       images.reduce((acc, { code, image }) => ({ ...acc, [code]: image }), {})
  //     );
  //   };

  //   loadImages();
  // }, []);

  return stickerImages;
};
