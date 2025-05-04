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
  isOnlyOneSingleIconMarkerVisibleInMap,
  googleMapRef,
  selectedMarkerId,
  markerClusteredContents,
  latLng,
  mapInfo,
  userPosition,
  setMapInfo,
  onChangeMapInfo,
  onClickMarkerCluster,
  onClickMap,
  onChangeMap,
  onDragStart,
}: Props) => {
  return (
    <LazyGoogleMap
      zoom={mapInfo.zoomLevel}
      center={latLng}
      handleGoogleApiLoaded={({ map }) => (googleMapRef.current = map)}
      onDragStart={() => onDragStart()}
      onClickMap={onClickMap}
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
        const { lat: getCenterLat, lng: getCenterLng } = bounds.getCenter();

        onChangeMapInfo(
          {
            top: { x: boundBottomX(), y: boundTopY() },
            bottom: { x: boundTopX(), y: boundBottomY() },
          },
          {
            lat: getCenterLat(),
            lng: getCenterLng(),
          },
          zoom
        );

        onChangeMap();
      }}
    >
      {markerClusteredContents?.map(({ properties, geometry, id }) => {
        if (mapInfo.zoomLevel >= 14 && properties.cluster && id) {
          // 클러스터링 된 경우 IconMarker
          const lat = geometry.coordinates[1];
          const lng = geometry.coordinates[0];
          const isSelected = selectedMarkerId === id;

          return (
            <IconMarker
              isSelected={isSelected}
              key={`${lat}-${lng}`}
              numberOfMarkers={
                properties.point_count >= 99 ? 99 : properties.point_count
              }
              icon="https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/clustered_marker.svg"
              lat={lat}
              lng={lng}
              onClickMarker={(e) => {
                e.stopPropagation();
                onClickMarkerCluster(+id);
              }}
            />
          );
        } else if (mapInfo.zoomLevel >= 14 && !properties.cluster) {
          // 클러스터링 되지 않은 경우 IconMarker
          const lat = properties.location.positionY;
          const lng = properties.location.positionX;
          const isSelected = selectedMarkerId === properties.idx;

          return (
            <IconMarker
              key={`${lat}-${lng}`}
              numberOfMarkers={
                properties.point_count >= 99 ? 99 : properties.point_count
              }
              isSelected={isSelected || isOnlyOneSingleIconMarkerVisibleInMap}
              icon={
                isSelected || isOnlyOneSingleIconMarkerVisibleInMap
                  ? `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/click_marker_${properties.genre.idx}_icon.svg`
                  : `https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/default_marker_${properties.genre.idx}_icon.svg`
              }
              lat={lat}
              lng={lng}
              onClickMarker={(e) => {
                /**
                 * INFO 지도 터치 이벤트 전파 방지
                 *
                 * 지도를 터치할 경우 Drawer가 닫히고,
                 * 마커를 터치할 경우 Drawer가 유지되어야 함
                 * 마커 이벤트가 지도로 전파되지 않도록 stopPropagation 사용
                 */
                e.stopPropagation();
                onClickMarkerCluster(+properties.idx);
              }}
            />
          );
        } else if (mapInfo.zoomLevel < 14 && !properties.cluster) {
          // 클러스터링 되지 않은 경우, 그러니까 1개만 존재하는 경우
          const lat = geometry.coordinates[1];
          const lng = geometry.coordinates[0];

          return (
            <CircleMarker
              lat={lat}
              lng={lng}
              key={`${lat}-${lng}`}
              onClickMarker={(e) => {
                /**
                 * INFO 지도 터치 이벤트 전파 방지
                 *
                 * 지도를 터치할 경우 Drawer가 닫히고,
                 * 마커를 터치할 경우 Drawer가 유지되어야 함
                 * 마커 이벤트가 지도로 전파되지 않도록 stopPropagation 사용
                 */
                e.stopPropagation();

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
              {1}
            </CircleMarker>
          );
        } else if (mapInfo.zoomLevel < 14 && properties.cluster && id) {
          // 클러스터링 된 경우
          const lat = geometry.coordinates[1];
          const lng = geometry.coordinates[0];
          const count = properties.point_count;

          return (
            <CircleMarker
              lat={lat}
              lng={lng}
              key={`${lat}-${lng}`}
              onClickMarker={(e) => {
                /**
                 * INFO 지도 터치 이벤트 전파 방지
                 *
                 * 지도를 터치할 경우 Drawer가 닫히고,
                 * 마커를 터치할 경우 Drawer가 유지되어야 함
                 * 마커 이벤트가 지도로 전파되지 않도록 stopPropagation 사용
                 */
                e.stopPropagation();
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
        }
      })}
      {userPosition.lat && userPosition.lng && (
        <AnimatedLocationMarker lat={userPosition.lat} lng={userPosition.lng} />
      )}
    </LazyGoogleMap>
  );
};

export default CustomGoogleMap;
