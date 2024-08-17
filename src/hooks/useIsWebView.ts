export const WEB_VIEW_FLAG = "WEB_VIEW";

export const useIsWebView = (userAgent?: string) => {
  // ! navigate 코드 빌드때문에 삭제했음
  // 클라이언트 사이드
  if (!userAgent) {
    userAgent = "";
  }

  return userAgent.endsWith(WEB_VIEW_FLAG);
};
