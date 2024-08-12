export const getMapInfo = (map: kakao.maps.Map) => {
  return {
    bound: {
      top: {
        x: map.getBounds().getSouthWest().getLng(),
        y: map.getBounds().getNorthEast().getLat(),
      },
      bottom: {
        x: map.getBounds().getNorthEast().getLng(),
        y: map.getBounds().getSouthWest().getLat(),
      },
    },
    level: map.getLevel(),
  };
};
