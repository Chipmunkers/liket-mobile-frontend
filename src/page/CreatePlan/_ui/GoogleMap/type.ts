import { Place } from "@/page/CreatePlan/type";
import { PedestrianRouteEntity } from "@/shared/types/api/address/PedestrianRouteEntity";

export type Props = {
  pedestrianRoute?: PedestrianRouteEntity;

  origin?: Place;

  stopoverList: Place[];

  destination?: Place;
};
