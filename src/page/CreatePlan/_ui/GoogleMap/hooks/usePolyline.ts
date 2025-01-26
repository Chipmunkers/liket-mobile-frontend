import { Route } from "@/page/CreatePlan/type";
import { useEffect, useState } from "react";

export const usePolyline = ({
  googleMap,
  routeList,
}: {
  googleMap: google.maps.Map | null;
  routeList: (Route | null)[];
}) => {
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!routeList || !googleMap) return;

    // 기존 경로 삭제
    polylines.forEach((polyline) => polyline.setMap(null));

    // 새 경로 추가
    const newPolylines: google.maps.Polyline[] = [];

    routeList.forEach((route, index) => {
      if (!route) return;

      const path = route.coordinateList.map((coordinate) => ({
        lat: coordinate.y,
        lng: coordinate.x,
      }));

      // 각 경로에 고유 색상 지정 (예: HSL 색상으로 분산)
      const color = `hsl(${(index * 360) / routeList.length}, 100%, 50%)`;

      // 실선
      const solidPolyline = new google.maps.Polyline({
        path,
        strokeColor: color,
        strokeWeight: 6,
        map: googleMap,
      });

      // 점선
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

      newPolylines.push(solidPolyline, dottedPolyline);
    });

    setPolylines(newPolylines);
  }, [routeList, googleMap]);
};
