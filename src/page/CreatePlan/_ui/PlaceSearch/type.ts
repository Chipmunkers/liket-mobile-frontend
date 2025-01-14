import { Place } from "@/page/CreatePlan/type";
import { SetState } from "@/shared/types/react";

export type ModalType = "origin" | "stopover" | "destination";

export type Props = {
  setOrigin: SetState<Place | undefined>;

  setStopover: SetState<Place[]>;

  setDestination: SetState<Place | undefined>;

  type: ModalType;
};
