// AnimatedDirectionMarker.tsx 수정본

import React, { useState, useEffect } from "react";
import useDeviceOrientation from "../../_hooks/useDeviceOrientation";

interface AnimatedDirectionMarkerProps {
  // 필수 속성
  lat: number;
  lng: number;

  // 스타일 커스터마이징 (선택적)
  markerSize?: number;
  rippleSize?: number;
  markerColor?: string;
  rippleColor?: string;
  borderColor?: string;
  arrowColor?: string;
  arrowBorderColor?: string;
  showDirectionLabel?: boolean;

  // 기타 (선택적)
  className?: string;
}

const AnimatedDirectionMarker: React.FC<AnimatedDirectionMarkerProps> = ({
  lat,
  lng,
  markerSize = 16,
  rippleSize = 60,
  markerColor = "bg-blue-500",
  rippleColor = "bg-blue-500",
  borderColor = "border-white",
  arrowColor = "fill-blue-500",
  arrowBorderColor = "stroke-white",
  showDirectionLabel = true,
  className = "",
}) => {
  // 방향 센서 데이터 가져오기
  const { alpha, beta, gamma, isAvailable } = useDeviceOrientation({
    autoStart: true,
  });

  // 방향 화살표 스타일 상태
  const [arrowStyle, setArrowStyle] = useState({
    rotation: 0,
    scale: 1,
  });

  // 방향 데이터 기반 화살표 스타일 업데이트
  useEffect(() => {
    if (!isAvailable) return;

    // alpha값은 장치의 나침반 방향(0-360도)을 나타냅니다
    if (alpha !== null) {
      // 방향 보정 - 지도에 표시된 파란색 마커처럼 정확한 방향을 가리키도록 조정
      // 90도 조정 (테스트 결과에 따라 미세 조정이 필요할 수 있음)
      let rotation = alpha;

      // 기울기 강도에 따른 크기 조절
      let scale = 1;
      if (beta !== null && gamma !== null) {
        const tiltIntensity = Math.max(Math.abs(gamma), Math.abs(beta)) / 45;
        scale = 1 + tiltIntensity * 0.5;
      }

      setArrowStyle({ rotation, scale });
    }
  }, [alpha, beta, gamma, isAvailable]);

  // rippleSize의 절반을 계산 (top, left 위치 지정용)
  const halfRippleSize = rippleSize / 2;
  // markerSize의 절반을 계산 (top, left 위치 지정용)
  const halfMarkerSize = markerSize / 2;

  // tailwind는 inline transform style을 사용해야 하는 경우가 있습니다
  const arrowTransform = `rotate(90deg) scale(${arrowStyle.scale})`;

  return (
    <div
      className={`relative w-0 h-0 ${className}`}
      data-lat={lat}
      data-lng={lng}
    >
      {/* 외부 파동 효과 - 내부/외부 2개의 파동 효과 추가 */}
      <div
        className={`absolute rounded-full ${rippleColor} opacity-20 animate-ping pointer-events-none z-10`}
        style={{
          width: `${rippleSize * 1.2}px`,
          height: `${rippleSize * 1.2}px`,
          top: `-${(rippleSize * 1.2) / 2}px`,
          left: `-${(rippleSize * 1.2) / 2}px`,
          animationDuration: "3s",
        }}
      />
      <div
        className={`absolute rounded-full ${rippleColor} opacity-30 animate-ping pointer-events-none z-10`}
        style={{
          width: `${rippleSize}px`,
          height: `${rippleSize}px`,
          top: `-${halfRippleSize}px`,
          left: `-${halfRippleSize}px`,
          animationDuration: "2s",
        }}
      />

      {/* 마커 그림자 효과 */}
      <div
        className="absolute rounded-full bg-black opacity-10 z-15 pointer-events-none blur-sm"
        style={{
          width: `${markerSize + 4}px`,
          height: `${markerSize + 4}px`,
          top: `-${halfMarkerSize + 2}px`,
          left: `-${halfMarkerSize + 2}px`,
        }}
      />

      {/* 내부 마커 - 파란색 그라데이션 효과 적용 */}
      <div
        className={`absolute rounded-full ${borderColor} border-2 shadow-lg z-20 pointer-events-none overflow-hidden`}
        style={{
          width: `${markerSize}px`,
          height: `${markerSize}px`,
          top: `-${halfMarkerSize}px`,
          left: `-${halfMarkerSize}px`,
          background: "linear-gradient(145deg, #4299e1, #3182ce)",
        }}
      >
        {/* 마커 내부 하이라이트 효과 */}
        <div
          className="absolute rounded-full bg-white opacity-30"
          style={{
            width: `${markerSize / 2}px`,
            height: `${markerSize / 2}px`,
            top: `${markerSize / 8}px`,
            left: `${markerSize / 8}px`,
          }}
        />
      </div>

      {/* 방향 화살표 - 파란색 디자인으로 수정 */}
      <svg
        className={`absolute z-30 pointer-events-none transition-transform duration-200`}
        style={{
          width: `36px`,
          height: `36px`,
          top: `-${halfMarkerSize + 24}px`,
          left: `-18px`,
          transform: arrowTransform,
          filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.3))",
        }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 화살표 배경 그림자 */}
        <filter id="shadow">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="0.5"
            floodColor="#000"
            floodOpacity="0.3"
          />
        </filter>

        {/* 화살표 메인 - 파란색으로 변경 */}
        <path
          d="M12 2L4 13h6v9h4v-9h6L12 2z"
          className="fill-blue-500"
          filter="url(#shadow)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* 화살표 테두리 */}
        <path
          d="M12 2L4 13h6v9h4v-9h6L12 2z"
          className="stroke-white fill-none"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* 화살표 내부 하이라이트 효과 */}
        <path
          d="M12 4L7 11.5h4v7.5h2v-7.5h4L12 4z"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>

      {/* 현재 방향 텍스트 표시 - 파란색 스타일로 수정 */}
      {showDirectionLabel && (
        <div
          className="absolute bg-blue-500 text-black px-2 py-1 rounded-full text-xs font-semibold shadow-md z-40"
          style={{
            top: `-${halfMarkerSize + 50}px`,
            left: "-24px",
            transition: "opacity 0.3s",
            opacity: 0.9,
          }}
        >
          {arrowStyle.rotation >= 337.5 || arrowStyle.rotation < 22.5
            ? "북"
            : arrowStyle.rotation >= 22.5 && arrowStyle.rotation < 67.5
            ? "북동"
            : arrowStyle.rotation >= 67.5 && arrowStyle.rotation < 112.5
            ? "동"
            : arrowStyle.rotation >= 112.5 && arrowStyle.rotation < 157.5
            ? "남동"
            : arrowStyle.rotation >= 157.5 && arrowStyle.rotation < 202.5
            ? "남"
            : arrowStyle.rotation >= 202.5 && arrowStyle.rotation < 247.5
            ? "남서"
            : arrowStyle.rotation >= 247.5 && arrowStyle.rotation < 292.5
            ? "서"
            : "북서"}
        </div>
      )}

      {/* 디버깅용 방향 표시 */}
      {alpha && (
        <div
          className="absolute bg-blue-800 bg-opacity-70 text-black px-2 py-1 rounded text-xs"
          style={{ top: "20px", left: "-20px" }}
        >
          {Math.round(alpha)}° → {Math.round(arrowStyle.rotation)}°
        </div>
      )}
    </div>
  );
};

export default AnimatedDirectionMarker;
