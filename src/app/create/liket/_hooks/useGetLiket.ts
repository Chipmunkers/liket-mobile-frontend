import { useQuery } from "@tanstack/react-query";

export const useGetLiket = ({ idx = 1 }) =>
  useQuery({
    queryKey: ["liket", idx],
    queryFn: async () => {
      return await new Promise((resolve) => {
        resolve(JSON.parse(localStorage.getItem("liket") || ""));
      });
    },
  });

interface TextShape {
  type: "text";
  id: number; // front에서 임의로 생성하고있음.
  fill: string; // 컬러값
  text: string;
  x: string;
  y: string;
}

interface ImageShape {
  type: "image";
  id: number;
  imageSrc: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

interface Payload {
  shapes: (TextShape | ImageShape)[];
  cardImageSrc: string; // Blob Data URL
  cardSize: "SMALL" | "MEDIUM" | "LARGE";
  cardImageInformation: {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
  };
}
