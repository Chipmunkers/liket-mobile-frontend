import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import GoogleMap, { LatLngBounds } from "google-maps-react-markers";

interface GoogleMapProps {
  children: React.ReactNode;
  center: { lat: number; lng: number };
  zoom?: number;
  onChangeMap?: (mapChangeInformation: {
    bounds: LatLngBounds;
    center: (number | undefined)[];
    zoom: number;
  }) => void;
  onClickMap?: () => void;
  onDragStart?: () => void;
  handleGoogleApiLoaded?: ({
    map,
    maps,
    ref,
  }: HandleGoogleApiLoadedParam) => void;
}

export const CommonGoogleMap = ({
  children,
  center,
  zoom = 14,
  onChangeMap,
  onClickMap,
  onDragStart,
  handleGoogleApiLoaded,
}: GoogleMapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current) {
      setMapLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current]);

  return (
    <Wrapper
      id="map"
      onClick={onClickMap}
      className="size-full"
      sx={{ visibility: !mapLoaded ? "hidden" : "" }}
    >
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
        libraries={[
          "geometry",
          "places",
          "&region=KR&callback=Function.prototype",
        ]}
        defaultCenter={center}
        defaultZoom={zoom}
        onChange={onChangeMap}
        onGoogleApiLoaded={({ map, maps, ref }: HandleGoogleApiLoadedParam) => {
          map.setOptions({
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit.station",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit.line",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
            ],
            zoomControlOptions: {
              position: maps.ControlPosition.RIGHT_CENTER,
            },
            mapTypeControlOptions: {
              position: maps.ControlPosition.TOP_RIGHT,
              style: maps.MapTypeControlStyle.DEFAULT,
            },
            restriction: {
              latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180,
              },
              strictBounds: false,
            },
            maxZoom: 20,
            minZoom: 10,
            gestureHandling: "greedy",
          });

          mapRef.current = map;
          if (onDragStart) {
            mapRef.current.addListener("dragstart", onDragStart);
          }
          handleGoogleApiLoaded && handleGoogleApiLoaded({ map, maps, ref });
        }}
        options={{
          disableDefaultUI: true,
          scaleControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
          keyboardShortcuts: false,
          clickableIcons: false,
        }}
      >
        {children}
      </GoogleMap>
    </Wrapper>
  );
};

const Wrapper = styled(Box)({});
