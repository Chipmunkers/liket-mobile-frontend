import { SummaryTosEntity } from "@/shared/types/api/terms-of-service/SummaryTosEntity";

export type Props = {
  /**
   * 체크 되어있는지 여부
   *
   * @default false
   */
  isChecked: boolean;
  title: string;
  isEssential: boolean;
  onClickArrow: () => void;
  onChange: () => void;
};
