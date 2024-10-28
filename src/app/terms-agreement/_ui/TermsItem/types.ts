import { SummaryTosEntity } from "@/shared/types/api/terms-of-service/SummaryTosEntity";

export type Props = {
  tos: SummaryTosEntity;

  /**
   * 체크 되어있는지 여부
   *
   * @default false
   */
  isChecked: boolean;
  onChange: () => void;
};
