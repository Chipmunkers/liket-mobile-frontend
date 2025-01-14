import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export type Place = SummaryContentEntity | KeywordSearchDocumentEntity;

export type RouteSegment = {
  start: Place;
  end: Place;
  type: "walking" | "transit";
};
