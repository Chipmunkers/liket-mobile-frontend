import { useState, useEffect } from "react";

/**
 * 화면 높이 관련 값을 반환하는 인터페이스
 */
interface ScreenHeightHook {
  windowHeight: number;
  screenHeight: number;
  innerHeight: number;
  outerHeight: number;
  clientHeight: number;
  vh: (percent: number) => number;
  updateHeights: () => void;
}

/**
 * 화면 높이를 반환하는 커스텀 훅
 * @returns {ScreenHeightHook} 화면 높이 관련 값들을 포함하는 객체
 */
const useScreenHeight = (): ScreenHeightHook => {
  // 다양한 화면 높이 상태 초기화
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [outerHeight, setOuterHeight] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);

  useEffect(() => {
    // 브라우저 환경인지 확인 (SSR 대응)
    if (typeof window !== "undefined") {
      // 초기 높이값 설정
      updateHeights();

      // 화면 크기 변경 시 높이값 업데이트
      window.addEventListener("resize", updateHeights);

      // 클린업 함수
      return () => window.removeEventListener("resize", updateHeights);
    }
  }, []);

  // 모든 높이값을 업데이트하는 함수
  const updateHeights = (): void => {
    setWindowHeight(window.innerHeight);
    setScreenHeight(window.screen.height);
    setInnerHeight(window.innerHeight);
    setOuterHeight(window.outerHeight);
    setClientHeight(document.documentElement.clientHeight);
  };

  // viewport 높이에 기반한 계산 함수
  const vh = (percent: number): number => {
    return (windowHeight * percent) / 100;
  };

  return {
    // 기본 높이값들
    windowHeight, // 현재 브라우저 창의 내부 높이
    screenHeight, // 사용자 화면(모니터)의 전체 높이
    innerHeight, // window.innerHeight와 동일
    outerHeight, // 브라우저 창 전체의 외부 높이
    clientHeight, // <html> 요소의 높이

    // 유틸리티 함수
    vh, // viewport 높이의 퍼센트값 계산 (vh 단위처럼 사용)

    // 수동으로 높이 업데이트
    updateHeights, // 필요시 높이값 수동 업데이트
  };
};

export default useScreenHeight;
