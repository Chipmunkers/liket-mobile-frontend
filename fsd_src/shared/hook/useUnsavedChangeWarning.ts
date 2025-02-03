// hooks/useUnsavedChangesWarning.ts
"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * @param shouldBlock 사용자가 수정 중인 상태인지, "나가기 방지"가 필요한지 여부
 * @returns { showModal, confirmNavigation, cancelNavigation } 등 모달 표시/제어용 값과 함수
 *
 * 사용 예:
 *  const { showModal, navigatingType, confirmNavigation, cancelNavigation } = useUnsavedChangesWarning(isDirty);
 */
const useUnsavedChangesWarning = (shouldBlock: boolean) => {
  // 모달 노출 여부
  const [showModal, setShowModal] = useState(false);

  // '뒤로가기'인지 '앞으로가기'인지(혹은 구분 안 해도 되면 안 써도 됨)
  const [navigatingType, setNavigatingType] = useState<
    "back" | "forward" | null
  >(null);

  // beforeunload (새로고침/창닫기) 핸들러
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldBlock) return;
      // 브라우저마다 메시지 커스텀은 불가/제한적. 크롬 등은 기본 문구만 표시
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldBlock]);

  // popstate (뒤로가기/앞으로가기) 핸들러
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!shouldBlock) return;
      e.preventDefault();

      // 앞으로가기/뒤로가기인지 구분해보고 싶다면, 히스토리 스택 비교가 필요하지만
      // 여기서는 단순히 "사용자가 페이지 벗어남" 상황을 막는다고 보고, 모달 표시
      // (아래는 임의로 '뒤로가기'로 간주했지만, 실제 구분은 어려울 수 있음)
      setNavigatingType("back");
      setShowModal(true);

      // **주의**: 브라우저가 이미 URL을 변경하려고 시도 -> 우리가 막으려면
      //  history.forward() or history.back() / pushState(...) 로 "현재 상태" 복구 필요
      //  아래에서 모달 "취소" 시, 다시 원래 페이지 상태로 돌릴 것임
      //  우선 "현재" 위치로 pushState
      history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [shouldBlock]);

  // 모달에서 "확인" 클릭 시 → 실제로 뒤/앞 이동 수행
  const confirmNavigation = useCallback(() => {
    setShowModal(false);

    if (navigatingType === "back") {
      // 뒤로가기 진행
      history.back();
    } else if (navigatingType === "forward") {
      // 필요하다면 여기서 history.forward() 등
      history.forward();
    }

    setNavigatingType(null);
  }, [navigatingType]);

  // 모달에서 "취소" 클릭 시 → 현재 페이지 유지
  const cancelNavigation = useCallback(() => {
    setShowModal(false);
    setNavigatingType(null);
  }, []);

  return {
    showModal,
    navigatingType,
    confirmNavigation,
    cancelNavigation,
  };
};

export default useUnsavedChangesWarning;
