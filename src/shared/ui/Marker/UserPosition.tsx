import React, { useState, useEffect } from "react";

interface AnimatedLocationMarkerProps {
  // 필수 속성
  lat: number;
  lng: number;

  // 스타일 커스터마이징 (선택적)
  markerSize?: number;
  rippleSize?: number;
  markerColor?: string;
  rippleColor?: string;
  borderColor?: string;
  borderWidth?: number;

  // 애니메이션 관련 (선택적)
  maxScale?: number;
  minOpacity?: number;
  maxOpacity?: number;
  animationSpeed?: number;

  // 기타 (선택적)
  showShadow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedLocationMarker: React.FC<AnimatedLocationMarkerProps> = ({
  lat,
  lng,
  markerSize = 16,
  rippleSize = 60,
  markerColor = "rgb(59, 130, 246)",
  rippleColor = "rgb(59, 130, 246)",
  borderColor = "white",
  borderWidth = 2,
  maxScale = 1.2,
  minOpacity = 0.1,
  maxOpacity = 0.3,
  animationSpeed = 80,
  showShadow = true,
  className = "",
  style = {},
}) => {
  const [scale, setScale] = useState(1);
  const [rippleOpacity, setRippleOpacity] = useState(maxOpacity);

  useEffect(() => {
    // 크기 애니메이션 (1 ~ maxScale)
    const scaleInterval = setInterval(() => {
      setScale((prevScale) => {
        return prevScale >= maxScale ? 1 : prevScale + 0.03;
      });
    }, animationSpeed);

    // 투명도 애니메이션 (maxOpacity ~ minOpacity)
    const opacityInterval = setInterval(() => {
      setRippleOpacity((prevOpacity) => {
        return prevOpacity <= minOpacity ? maxOpacity : prevOpacity - 0.01;
      });
    }, animationSpeed);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => {
      clearInterval(scaleInterval);
      clearInterval(opacityInterval);
    };
  }, [animationSpeed, maxScale, minOpacity, maxOpacity]);

  // rippleSize의 절반을 계산 (top, left 위치 지정용)
  const halfRippleSize = rippleSize / 2;
  // markerSize의 절반을 계산 (top, left 위치 지정용)
  const halfMarkerSize = markerSize / 2;

  // 그림자 스타일 설정
  const shadowStyle = showShadow ? `0 1px 4px rgba(0, 0, 0, 0.2)` : "none";

  // RGBA 색상으로 변환 (투명도 적용을 위해)
  const getRgbaColor = (color: string, opacity: number): string => {
    // 기본 RGB 색상인 경우
    if (color.startsWith("rgb(")) {
      return color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
    }
    // 이미 RGBA 색상인 경우
    else if (color.startsWith("rgba(")) {
      return color.replace(/rgba\((.+?),\s*[\d.]+\)/, `rgba($1, ${opacity})`);
    }
    // HEX 색상인 경우 (예: #3b82f6)
    else if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // 다른 형식의 색상인 경우 기본값 사용
    return `rgba(59, 130, 246, ${opacity})`;
  };

  return (
    <div
      className={`animated-location-marker ${className}`}
      style={{
        position: "relative",
        width: 0,
        height: 0,
        ...style,
      }}
      data-lat={lat}
      data-lng={lng}
    >
      {/* 외부 파동 효과 */}
      <div
        className="ripple-effect"
        style={{
          width: `${rippleSize}px`,
          height: `${rippleSize}px`,
          borderRadius: "50%",
          backgroundColor: getRgbaColor(rippleColor, rippleOpacity),
          transform: `scale(${scale})`,
          transition: `transform ${animationSpeed * 0.8}ms ease-out, opacity ${
            animationSpeed * 0.8
          }ms ease-out`,
          position: "absolute",
          top: `-${halfRippleSize}px`,
          left: `-${halfRippleSize}px`,
          zIndex: 1,
        }}
      />

      {/* 내부 마커 */}
      <div
        className="marker-dot"
        style={{
          width: `${markerSize}px`,
          height: `${markerSize}px`,
          borderRadius: "50%",
          backgroundColor: markerColor,
          border: `${borderWidth}px solid ${borderColor}`,
          boxShadow: shadowStyle,
          position: "absolute",
          top: `-${halfMarkerSize}px`,
          left: `-${halfMarkerSize}px`,
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default AnimatedLocationMarker;
