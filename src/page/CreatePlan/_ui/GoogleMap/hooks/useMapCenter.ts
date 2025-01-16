import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { Place } from "@/page/CreatePlan/type";
import { useEffect } from "react";

/**
 * @deprecated
 */
export const useMapCenter = ({
  googleMap,
  origin,
  stopoverList,
  destination,
}: {
  googleMap: google.maps.Map | null;
  origin?: Place;
  destination?: Place;
  stopoverList: Place[];
}) => {
  const { extractCoordinate } = useGetUtils();

  useEffect(() => {
    if (!origin || !googleMap) return;

    googleMap.setCenter({
      lng: extractCoordinate(origin).x,
      lat: extractCoordinate(origin).y,
    });
    googleMap.setZoom(16);
  }, [origin, googleMap]);

  useEffect(() => {
    if (!destination || !googleMap) return;

    googleMap.setCenter({
      lng: extractCoordinate(destination).x,
      lat: extractCoordinate(destination).y,
    });
    googleMap.setZoom(16);
  }, [destination, googleMap]);
};
