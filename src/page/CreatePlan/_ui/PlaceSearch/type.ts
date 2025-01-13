import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { SetState } from "@/shared/types/react";

export type ModalType = "origin" | "stopover" | "destination";

export type Props = {
  setOrigin: SetState<
    SummaryContentEntity | KeywordSearchDocumentEntity | undefined
  >;

  setStopover: SetState<(SummaryContentEntity | KeywordSearchDocumentEntity)[]>;

  setDestination: SetState<
    SummaryContentEntity | KeywordSearchDocumentEntity | undefined
  >;

  type: ModalType;
};
