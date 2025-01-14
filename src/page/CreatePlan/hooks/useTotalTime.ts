import { PedestrianRouteEntity } from "@/shared/types/api/address/PedestrianRouteEntity";
import { useEffect } from "react";

export const useTotalTime = (pedestrianRoute: PedestrianRouteEntity) => {
  useEffect(() => {
    if (!pedestrianRoute) return;

    console.log(
      pedestrianRoute.features.filter((feat) => feat.type === "Point")
    );
  }, [pedestrianRoute]);
};
