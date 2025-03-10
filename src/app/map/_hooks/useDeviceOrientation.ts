"use client";

import { useState, useEffect, useCallback } from "react";

// 방향 정보 인터페이스
export interface OrientationState {
  alpha: number | null; // z축 (나침반 방향)
  beta: number | null; // x축 (앞뒤 기울기)
  gamma: number | null; // y축 (좌우 기울기)
  accuracy: number | null; // 나침반 정확도 (해당하는 경우)
  timestamp: number | null;
  isAvailable: boolean; // 방향 센서 사용 가능 여부
}

// React Native에서 오는 방향 메시지 인터페이스
export interface RNOrientationMessage {
  type: string;
  alpha?: number;
  beta?: number;
  gamma?: number;
  heading?: number | null;
}

// 훅 옵션 인터페이스
export interface UseOrientationOptions {
  interval?: number;
  autoStart?: boolean;
}

// Window 인터페이스 확장
declare global {
  interface Window {
    isWebview?: boolean;
    DeviceOrientationEvent: {
      requestPermission?: () => Promise<string>;
    } & Event;
  }
}

/**
 * 웹 브라우저와 React Native WebView 환경에서 모두 작동하는 기기 방향 정보 훅
 *
 * @param options - 방향 추적 설정 옵션
 * @returns 방향 정보와 추적 제어 함수들
 */
const useDeviceOrientation = ({
  interval = 100,
  autoStart = true,
}: UseOrientationOptions = {}): OrientationState & {
  startTracking: () => void;
  stopTracking: () => void;
} => {
  // 방향 정보 상태
  const [orientation, setOrientation] = useState<OrientationState>({
    alpha: null,
    beta: null,
    gamma: null,
    accuracy: null,
    timestamp: null,
    isAvailable: false,
  });

  // WebView 환경 확인
  const isRNWebView = typeof window !== "undefined" && !!window?.isWebview;

  // 웹 브라우저에서 방향 정보 가져오기
  const getWebOrientation = useCallback((): (() => void) | undefined => {
    if (typeof window === "undefined" || !window.DeviceOrientationEvent) {
      setOrientation((prev) => ({
        ...prev,
        isAvailable: false,
      }));
      return;
    }

    // 방향 센서 사용 가능 여부 확인
    setOrientation((prev) => ({
      ...prev,
      isAvailable: true,
    }));

    // 일부 브라우저에서 권한 요청이 필요할 수 있음
    if (
      window.DeviceOrientationEvent.requestPermission &&
      typeof window.DeviceOrientationEvent.requestPermission === "function"
    ) {
      window.DeviceOrientationEvent.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            return enableOrientationListener();
          } else {
            setOrientation((prev) => ({
              ...prev,
              isAvailable: false,
            }));
            return undefined;
          }
        })
        .catch((err) => {
          console.error("방향 센서 권한 요청 오류:", err);
          setOrientation((prev) => ({
            ...prev,
            isAvailable: false,
          }));
          return undefined;
        });
    } else {
      // 권한 요청이 필요 없는 브라우저
      return enableOrientationListener();
    }
  }, []);

  // 방향 센서 이벤트 리스너 활성화
  const enableOrientationListener = useCallback((): (() => void) => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // iOS Safari에서는 웹사이트 설정에서 모션 및 방향 접근 허용 필요
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        accuracy: (event as any).webkitCompassAccuracy || null,
        timestamp: Date.now(),
        isAvailable: true,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);

    // 클린업 함수 반환
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // 방향 추적 시작 요청 (환경에 따라 다른 방식 사용)
  const startTracking = useCallback((): void => {
    if (!isRNWebView) {
      getWebOrientation();
    } else if (window?.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "START_ORIENTATION_TRACKING",
        })
      );
    }
  }, [isRNWebView, getWebOrientation]);

  // 방향 추적 중지 요청
  const stopTracking = useCallback((): void => {
    if (isRNWebView && window?.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "STOP_ORIENTATION_TRACKING",
        })
      );
    }
    // 웹 브라우저 환경에서는 useEffect의 클린업에서 처리됨
  }, [isRNWebView]);

  // React Native WebView 메시지 이벤트 처리
  useEffect(() => {
    if (!isRNWebView) {
      return;
    }

    const handleMessage = (e: MessageEvent) => {
      try {
        const data: RNOrientationMessage = JSON.parse(e.data);

        if (data.type === "DEVICE_ORIENTATION") {
          setOrientation({
            alpha: data.alpha ?? null,
            beta: data.beta ?? null,
            gamma: data.gamma ?? null,
            accuracy: null,
            timestamp: Date.now(),
            isAvailable: true,
          });
        }
      } catch (err) {
        alert(err);
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

  // 웹 환경에서의 자동 시작 설정
  useEffect(() => {
    if (!autoStart) return;

    let cleanup: (() => void) | undefined;

    if (!isRNWebView) {
      cleanup = getWebOrientation();
    } else {
      startTracking();
    }

    return () => {
      if (cleanup) cleanup();
      if (isRNWebView) stopTracking();
    };
  }, [autoStart, isRNWebView, getWebOrientation, startTracking, stopTracking]);

  return {
    ...orientation,
    startTracking,
    stopTracking,
  };
};

export default useDeviceOrientation;
