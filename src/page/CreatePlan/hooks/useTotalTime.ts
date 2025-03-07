import { PedestrianRouteEntity } from "@/shared/types/api/address/PedestrianRouteEntity";
import { useEffect } from "react";

export const useTotalTime = (pedestrianRoute: PedestrianRouteEntity) => {
  useEffect(() => {
    if (!pedestrianRoute) return;
  }, [pedestrianRoute]);
};
