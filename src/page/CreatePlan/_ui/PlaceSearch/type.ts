import { Place } from "@/page/CreatePlan/type";
import { SetState } from "@/shared/types/react";

export type ModalType = "origin" | "stopover" | "destination";

export type Props = {
  setPlaceList: SetState<(Place | null)[]>;
  i: number;
};
