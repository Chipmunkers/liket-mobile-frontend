import { LatLngBounds } from "google-maps-react-markers";
import dynamic from "next/dynamic";
import { Props } from "./types";
import IconMarker from "@/shared/ui/Marker/IconMarker";
import AnimatedLocationMarker from "@/shared/ui/Marker/UserPosition";
import CircleMarker from "@/shared/ui/Marker/CircleMarker";

const LazyGoogleMap = dynamic(
  () => import("@/shared/ui/GoogleMap").then((mod) => mod.CommonGoogleMap),
  {
    ssr: false,
  }
);

const CustomGoogleMap = ({
  googleMapRef,
  selectedMarkerId,
  markerClusteredContents,
  latLng,
  mapInfo,
  userPosition,
  setMapInfo,
  onClickMarkerCluster,
  onClickGoogleMap,
}: Props) => {
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
      {markerClusteredContents?.map(({ properties, geometry, id }) => {
        if (mapInfo.zoomLevel >= 14 && properties.cluster && id) {
          const lat = geometry.coordinates[1];
          const lng = geometry.coordinates[0];

          return (
            <IconMarker
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
        } else if (mapInfo.zoomLevel < 14 && properties.cluster && id) {
          const lat = geometry.coordinates[1];
          const lng = geometry.coordinates[0];
          const count = properties.point_count;

          return (
            <CircleMarker
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
            </CircleMarker>
          );
        } else if (mapInfo.zoomLevel >= 14) {
          const lat = properties.location.positionY;
          const lng = properties.location.positionX;

          return (
            <IconMarker
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
      {userPosition.lat && userPosition.lng && (
        <AnimatedLocationMarker lat={userPosition.lat} lng={userPosition.lng} />
      )}
    </LazyGoogleMap>
  );
};

export default CustomGoogleMap;
