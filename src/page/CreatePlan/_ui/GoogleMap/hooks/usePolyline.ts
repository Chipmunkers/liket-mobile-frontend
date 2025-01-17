import { Route } from "@/page/CreatePlan/type";
import { useEffect, useState } from "react";

export const usePolyline = ({
  googleMap,
  routeList,
}: {
  googleMap: google.maps.Map | null;
  routeList: (Route | null)[];
}) => {
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!routeList || !googleMap) return;

    polyline.forEach((polyline) => polyline.setMap(null));

    setPath(
      routeList
        .filter((route) => !!route)
        .flatMap((route) => route.coordinateList)
        .map((coordinate) => ({
          lat: coordinate.y,
          lng: coordinate.x,
        }))
    );
  }, [routeList]);

  useEffect(() => {
    if (path.length === 0 || !googleMap) return;

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
