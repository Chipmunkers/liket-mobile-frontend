import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export const useGetUtils = () => {
  const extractTitleOrPlace = (
    data: SummaryContentEntity | KeywordSearchDocumentEntity
  ) => {
    if (isContent(data)) {
      return data.title;
    }

    return `${data.addressName} ${data.placeName}`;
  };

  const isContent = (
    data: SummaryContentEntity | KeywordSearchDocumentEntity
  ): data is SummaryContentEntity => {
    if ((data as SummaryContentEntity).idx === undefined) {
      return false;
    }

    return true;
  };

  return {
    extractTitleOrPlace,
    isContent,
  };
};
