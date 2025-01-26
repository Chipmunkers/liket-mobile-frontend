import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { Place } from "@/page/CreatePlan/type";
import { useEffect } from "react";

export const useMapCenter = ({
  googleMap,
  placeList,
}: {
  googleMap: google.maps.Map | null;
  placeList: (Place | null)[];
}) => {
  const { extractCoordinate } = useGetUtils();

  useEffect(() => {
    if (!googleMap) {
      return;
    }

    const notNullPlaceList = placeList.filter(
      (place): place is Place => !!place
    );
    if (!notNullPlaceList.length) return;

    const mostRecent = notNullPlaceList.reduce((latest, current) =>
      new Date(latest.insertedAt) > new Date(current.insertedAt)
        ? latest
        : current
    );

    googleMap.setZoom(15);

    googleMap.setCenter({
      lat: extractCoordinate(mostRecent).y,
      lng: extractCoordinate(mostRecent).x,
    });
  }, [placeList, googleMap]);
};
