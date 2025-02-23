import { LatLngBounds } from "google-maps-react-markers";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Props } from "./types";
import CircleClusteredMarker from "@/shared/ui/Marker/CircleClusteredMarker";
import Marker from "@/shared/ui/Marker/Marker";

const LazyGoogleMap = dynamic(
  () => import("@/shared/ui/GoogleMap").then((mod) => mod.CommonGoogleMap),
  {
    ssr: false,
  }
);

const CustomGoogleMap = ({
  children,
  selectedMarkerId,
  circleClusteredContentList,
  markerClusteredContents,
  latLng,
  mapInfo,
  setMapInfo,
  onClickMarkerCluster,
  onClickGoogleMap,
}: Props) => {
  const googleMapRef = useRef<google.maps.Map | null>(null);

  return (
    <LazyGoogleMap
      center={latLng}
      handleGoogleApiLoaded={({ map }) => (googleMapRef.current = map)}
      onChangeMap={({
        zoom,
        bounds,
      }: {
        bounds: LatLngBounds;
        center: (number | undefined)[];
        zoom: number;
      }) => {
        const { lat: boundTopY, lng: boundTopX } = bounds.getNorthEast();
        const { lat: boundBottomY, lng: boundBottomX } = bounds.getSouthWest();

        setMapInfo({
          bound: {
            top: { x: boundBottomX(), y: boundTopY() },
            bottom: { x: boundTopX(), y: boundBottomY() },
          },
          zoomLevel: zoom,
        });

        onClickGoogleMap();
      }}
    >
      {circleClusteredContentList?.map(({ count, lat, lng }) => {
        return (
          <CircleClusteredMarker
            lat={lat}
            lng={lng}
            key={`${lat}-${lng}`}
            onClickMarker={(lat, lng) => {
              const currentZoom = googleMapRef.current?.getZoom();

              if (currentZoom) {
                googleMapRef.current?.setZoom(currentZoom + 1);
                googleMapRef.current?.setCenter({
                  lat: lat,
                  lng: lng,
                });
                setMapInfo({ ...mapInfo, zoomLevel: currentZoom + 1 });
              }
            }}
          >
            {count}
          </CircleClusteredMarker>
        );
      })}
      {markerClusteredContents?.map(({ properties, geometry, id }) => {
        if (properties.cluster && id) {
          const lat = geometry.coordinates[1];
          const lng = geometry.coordinates[0];

          return (
            <Marker
              key={`${lat}-${lng}`}
              isClustered
              selected={selectedMarkerId === id}
              numberOfMarkers={
                properties.point_count >= 99 ? 99 : properties.point_count
              }
              icon="https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/clustered_marker.svg"
              lat={lat}
              lng={lng}
              onClickMarker={() => {
                onClickMarkerCluster(+id);
              }}
            />
          );
        } else {
          const lat = properties.location.positionY;
          const lng = properties.location.positionX;

          return (
            <Marker
              key={`${lat}-${lng}`}
              selected={selectedMarkerId === id}
              numberOfMarkers={
                properties.point_count >= 99 ? 99 : properties.point_count
              }
              icon={
                selectedMarkerId === properties.idx
                  ? `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${properties.genre.idx}_icon.svg`
                  : `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/default_marker_${properties.genre.idx}_icon.svg`
              }
              lat={lat}
              lng={lng}
              onClickMarker={() => {
                onClickMarkerCluster(+properties.idx);
              }}
            />
          );
        }
      })}
      {children}
    </LazyGoogleMap>
  );
};

export default CustomGoogleMap;
