"use client";

import { useState, useEffect, useCallback } from "react";
import { WEBVIEW_EVENT_TYPE } from "../consts/webview/event";
import { messageToRN } from "../helpers/messageToRN";

type PermissionStatus = "granted" | "denied" | "undetermined";

interface LocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  timestamp: number | null;
  WEB_PERMISSION: PermissionStatus;
  WEBVIEW_PERMISSION: PermissionStatus;
  canAskAgain: boolean;
}

interface RNLocationMessage {
  type: string;
  lat?: number;
  lng?: number;
  WEB_PERMISSION: PermissionStatus;
  WEBVIEW_PERMISSION?: PermissionStatus;
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
  WEB_PERMISSION: PermissionStatus;
  WEBVIEW_PERMISSION: PermissionStatus;
  canAskAgain: boolean;
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
    WEB_PERMISSION: "undetermined",
    WEBVIEW_PERMISSION: "undetermined",
    canAskAgain: true,
  });

  const isRNWebView = typeof window !== "undefined" && !!window?.isWebview;

  // 웹 브라우저에서 위치 정보 가져오기
  const getWebLocation = useCallback((): void => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        WEBVIEW_PERMISSION: "denied",
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
          WEB_PERMISSION: "granted",
        }));
      },
      (error: GeolocationPositionError): void => {
        const permissionDenied = error.code === error.PERMISSION_DENIED;

        setLocation((prev) => ({
          ...prev,
          WEB_PERMISSION: permissionDenied ? "denied" : prev.WEB_PERMISSION,
          canAskAgain: false, // 브라우저에서는 거부시 다시 물어볼 수 없음
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  // React Native WebView 메시지 이벤트 처리
  useEffect(() => {
    if (!isRNWebView) {
      return;
    }

    const handleMessage = (e: MessageEvent) => {
      try {
        const data: RNLocationMessage = JSON.parse(e.data);

        switch (data.type) {
          case "PERMISSION_GRANTED":
            setLocation((prev) => ({
              ...prev,
              lat: data.lat ?? null,
              lng: data.lng ?? null,
              WEBVIEW_PERMISSION: "granted",
              canAskAgain: true,
            }));
            break;
          case "PERMISSION_DENIED":
            setLocation((prev) => ({
              ...prev,
              WEBVIEW_PERMISSION: "denied",
              canAskAgain: data.canAskAgain ?? false,
            }));
            break;
          case "LOCATION_UPDATED":
            setLocation((prev) => ({
              ...prev,
              lat: data.lat ?? null,
              lng: data.lng ?? null,
            }));
            break;
        }
      } catch (err) {
        console.error("메시지 파싱 오류:", err);
      }
    };

    // RN에 준비 완료 알리기
    messageToRN({
      type: WEBVIEW_EVENT_TYPE.WEB_READY_FOR_MESSAGES,
    });

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

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [interval, getWebLocation, isRNWebView, autoStart]);

  return {
    lat: location.lat,
    lng: location.lng,
    WEB_PERMISSION: location.WEB_PERMISSION,
    WEBVIEW_PERMISSION: location.WEBVIEW_PERMISSION,
    canAskAgain: location.canAskAgain,
  };
};

export default useLocation;
