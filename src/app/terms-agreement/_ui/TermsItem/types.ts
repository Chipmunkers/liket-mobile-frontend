import { SummaryTosEntity } from "@/shared/types/api/terms-of-service/SummaryTosEntity";
import { SetState } from "@/shared/types/react";

export type Props = {
  tos: SummaryTosEntity;

  /**
   * 체크 되어있는지 여부
   *
   * @default false
   */
  isCheck?: boolean;

  agree: boolean[];

  setAgree: SetState<boolean[]>;

  /**
   * 순번
   */
  i: number;
};
