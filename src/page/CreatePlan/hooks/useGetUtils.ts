import { Place } from "@/page/CreatePlan/type";
import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
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

  return {
    extractTitleOrPlace,
    isContent,
    extractCoordinate,
    extractKey,
  };
};
