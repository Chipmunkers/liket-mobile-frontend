import { ModalType } from "@/page/CreatePlan/_ui/PlaceSearch/type";
import { Place } from "@/page/CreatePlan/type";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export const useGetUtils = () => {
  const extractTitleOrPlace = (data: Place) => {
    if (isContent(data)) {
      return data.title;
    }

    return `${data.addressName} ${data.placeName}`;
  };

  const isContent = (data: Place): data is SummaryContentEntity => {
    if ((data as SummaryContentEntity).idx === undefined) {
      return false;
    }

    return true;
  };

  const extractCoordinate = (data: Place): { x: number; y: number } => {
    if (isContent(data)) {
      return {
        x: data.location.positionX,
        y: data.location.positionY,
      };
    }

    return {
      x: Number(data.x),
      y: Number(data.y),
    };
  };

  const extractKey = (data: Place | undefined): string | undefined => {
    if (!data) return undefined;

    if (isContent(data)) {
      return data.idx.toString();
    }

    return data.id;
  };

  const formatSecondToTimeString = (sec: number): string => {
    return `${Math.floor(sec / 60)}분 ${sec % 60}초`;
  };

  const getInputType = (i: number, length: number): ModalType => {
    if (i === 0) return "origin";

    if (i === length - 1) return "destination";

    return "stopover";
  };

  const getInputTitle = (i: number, length: number): string => {
    const type = getInputType(i, length);

    if (type === "origin") return "출발";

    if (type === "destination") return "도착";

    return `경유지 ${i}`;
  };

  return {
    extractTitleOrPlace,
    isContent,
    extractCoordinate,
    extractKey,
    formatSecondToTimeString,
    getInputTitle,
    getInputType,
  };
};
