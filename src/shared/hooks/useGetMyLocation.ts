"use client";

import { useState, useEffect, useCallback } from "react";

type PermissionStatus = "granted" | "denied" | "undetermined";

interface LocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  timestamp: number | null;
  error: string | null;
  permission: PermissionStatus;
  canAskAgain: boolean;
}

interface RNLocationMessage {
  type: string;
  latitude?: number;
  longitude?: number;
  permission?: PermissionStatus;
  canAskAgain?: boolean;
}

interface UseLocationOptions {
  interval?: number;
  autoStart?: boolean;
  geolocationOptions?: PositionOptions;
}

interface UseLocationReturn {
  lat: number | null;
  lng: number | null;
  permission: PermissionStatus;
  error: string | null;
  canAskAgain: boolean;
  getLocation?: () => void;
}

/**
 * 웹 브라우저와 React Native WebView 환경에서 모두 작동하는 위치 정보 훅
 *
 * @param options - 위치 추적 설정 옵션
 * @returns 위치 정보와 추적 제어 함수들
 */
const useLocation = ({
  interval = 1000,
  autoStart = true,
}: UseLocationOptions = {}): UseLocationReturn => {
  // 위치 정보 상태
  const [location, setLocation] = useState<LocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    timestamp: null,
    error: null,
    permission: "undetermined",
    canAskAgain: true,
  });

  const isRNWebView = typeof window !== "undefined" && !!window?.isWebview;

  // 웹 브라우저에서 위치 정보 가져오기
  const getWebLocation = useCallback((): void => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "이 브라우저는 위치 정보를 지원하지 않습니다.",
        permission: "denied",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        const { latitude, longitude, accuracy } = position.coords;

        setLocation((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude,
          accuracy,
          timestamp: position.timestamp,
          error: null,
          permission: "granted",
        }));
      },
      (error: GeolocationPositionError): void => {
        // 권한 거부 오류 확인
        const permissionDenied = error.code === error.PERMISSION_DENIED;

        setLocation((prev) => ({
          ...prev,
          error: `위치 정보를 가져오는데 실패했습니다: ${error.message}`,
          permission: permissionDenied ? "denied" : prev.permission,
          // 브라우저에서는 거부 시 다시 물어볼 수 있음
          canAskAgain: true,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  // 위치 정보 가져오기 (환경에 따라 다른 방식 사용)
  const getLocation = useCallback((): void => {
    if (!isRNWebView) {
      getWebLocation();
    } else {
      // React Native에 위치 정보 요청
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "REQUEST_LOCATION",
        })
      );
    }
  }, [isRNWebView, getWebLocation]);

  // React Native WebView 메시지 이벤트 처리
  useEffect(() => {
    if (!isRNWebView) {
      return;
    }

    const handleMessage = (e: MessageEvent) => {
      try {
        const data: RNLocationMessage = JSON.parse(e.data);

        alert(data.latitude);
        switch (data.type) {
          case "PERMISSION_GRANTED":
            setLocation((prev) => ({
              ...prev,
              lat: data.latitude ?? null,
              lng: data.longitude ?? null,
              permission: "granted",
              canAskAgain: true,
              error: null,
            }));
            break;
          case "PERMISSION_DENIED":
            setLocation((prev) => ({
              ...prev,
              permission: "denied",
              canAskAgain: data.canAskAgain ?? false,
              error: "위치 정보 권한이 거부되었습니다.",
            }));
            break;
          case "LOCATION_UPDATED":
            setLocation((prev) => ({
              ...prev,
              lat: data.latitude ?? null,
              lng: data.longitude ?? null,
              error: null,
            }));
            break;
        }
      } catch (err) {
        console.error("메시지 파싱 오류:", err);
      }
    };

    // RN에 준비 완료 알리기
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "WEB_READY_FOR_MESSAGES",
      })
    );

    document.addEventListener("message", handleMessage as any);
    window.addEventListener("message", handleMessage);

    return () => {
      document.removeEventListener("message", handleMessage as any);
      window.removeEventListener("message", handleMessage);
    };
  }, [isRNWebView]);

  // 웹 환경에서의 주기적 위치 업데이트 설정
  useEffect(() => {
    if (isRNWebView || !autoStart) {
      return;
    }

    let timerId: NodeJS.Timeout | null = null;

    getWebLocation(); // 추적 시작할 때 즉시 위치 확인
    timerId = setInterval(getWebLocation, interval);

    // 정리 함수 (인터벌 클리어)
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [interval, getWebLocation, isRNWebView, autoStart]);

  return {
    lat: location.lat,
    lng: location.lng,
    permission: location.permission,
    error: location.error,
    canAskAgain: location.canAskAgain,
    getLocation,
  };
};

export default useLocation;
