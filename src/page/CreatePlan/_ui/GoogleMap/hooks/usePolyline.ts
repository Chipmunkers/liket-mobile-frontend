import { useGetPedestrianRoute } from "@/page/CreatePlan/hooks/useGetPedestrianRoute";
import { Place } from "@/page/CreatePlan/type";
import { PedestrianRouteEntity } from "@/shared/types/api/address/PedestrianRouteEntity";
import { useEffect, useState } from "react";

export const usePolyline = ({
  googleMap,
  origin,
  stopoverList,
  destination,
  pedestrianRoute,
}: {
  googleMap: google.maps.Map | null;
  origin?: Place;
  destination?: Place;
  stopoverList: Place[];
  pedestrianRoute?: PedestrianRouteEntity;
}) => {
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!pedestrianRoute || !googleMap) return;

    setPath(
      pedestrianRoute.features
        .filter((feature) => feature.type === "LineString")
        .flatMap((feature) => feature.coordinates)
        .map(({ x: lng, y: lat }) => ({ lat, lng }))
    );
  }, [pedestrianRoute]);

  useEffect(() => {
    if (path.length === 0 || !googleMap) return;

    polyline.forEach((polyline) => polyline.setMap(null));
  }, [origin, stopoverList, destination]);

  useEffect(() => {
    if (path.length === 0 || !googleMap) return;

    polyline.forEach((polyline) => polyline.setMap(null));

    // 실선 추가
    const solidPolyline = new google.maps.Polyline({
      path,
      strokeColor: "#00C2FF",
      strokeWeight: 6,
      map: googleMap,
    });

    // 점선 추가
    const dottedPolyline = new google.maps.Polyline({
      path,
      strokeColor: "white",
      strokeWeight: 4,
      strokeOpacity: 0,
      icons: [
        {
          icon: {
            path: "M 0,-1 0,1",
            strokeOpacity: 1,
            scale: 2,
          },
          offset: "0",
          repeat: "10px",
        },
      ],
      map: googleMap,
    });

    setPolyline([solidPolyline, dottedPolyline]);
  }, [path, googleMap]);
};
