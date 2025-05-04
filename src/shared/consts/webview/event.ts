export const WEBVIEW_EVENT_TYPE = {
  ROUTER_EVENT: "ROUTER_EVENT",
  /**
   * Webview navigation bar 상태를 조절하는 메서드
   * @param back true일 경우 nav를 뒤로 보냄
   */
  NAV_BACK: "NAV_BACK",
  CLICK: "CLICK_EVENT",
  SEARCH_SUBMIT: "SEARCH_SUBMIT",
  SOCIAL_LOGIN: "SOCIAL_LOGIN",
  OPEN_EXTERNAL_LINK: "OPEN_EXTERNAL_LINK",
  HAPTIC_FEEDBACK: "HAPTIC_FEEDBACK",
  /**
   * RN을 통해서 "위치 정보를 제공하겠습니까?" 권한 요청 창을 보여줘야하는 경우
   * 권한 요청 창을 띄울 수 있는 메세지
   */
  REQUEST_PERMISSION_AGAIN: "REQUEST_PERMISSION_AGAIN",

  /**
   * 더 이상 "위치 정보를 제공하겠습니까?" 권한 요청 창을 띄울 수 없고, 유저가 직접 앱 설정에 가서 권한을 허용해야 하는 경우
   * 현재 앱 대신 앱 설정 창을 띄우는 메세지
   */
  OPEN_SETTINGS: "OPEN_SETTINGS",

  /**
   * WEBVIEW가 RN으로부터 오는 정보를 받을 수 있는 상태임을 RN에게 전달할 수 있는 메세지.
   *
   * 예를들면,
   * 지도 페이지 접근시 RN은 "위치 정보를 제공하겠습니까?" 권한 요청 창을 띄우거나 이미 허용이 된 경우 위치 정보를 내려줘야함.
   * 하지만 WEBVIEW가 RN으로부터 오는 정보를 받을 수 없는 상태에서는 권한 요청 창이 제대로 안띄어지거나 위치 정보를 받을 수 없음.
   * 그러므로 WEBVIEW가 RN으로부터 오는 정보를 받을 수 있는 상태를 RN에게 알려줘야함.
   */
  WEB_READY_FOR_MESSAGES: "WEB_READY_FOR_MESSAGES",
} as const;

export type WebviewEvent = keyof typeof WEBVIEW_EVENT_TYPE;
