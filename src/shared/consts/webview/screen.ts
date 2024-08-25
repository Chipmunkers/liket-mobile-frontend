export const WEBVIEW_SCREEN = {
  MAIN: "Main",
  SEARCH: "Search",
  LIKE: "Like",
  LOGIN: "Login",
  EMAIL_LOGIN: "Email Login",
  FIND_PASSWORD: "Find Password",
  CONTENT_DETAIL: "Content Detail",
  SIGN_UP: "Sign Up",
  CREATE_REVIEW: "Create Review",
  TERMS_DETAIL: "Terms Detail",
  SOCIAL_SIGNUP: "Social Signup",
  TERMS_LIST: "Terms List",
  EDIT_PROFILE: "Edit Profile",
  MY_REVIEW: "My Review",
  MY_LIKET: "My Liket",
  MY_INQUIRY: "My Inquiry",
  MY_REQUEST_CONTENT: "Request Content",
  ACCOUNT: "Account",
  EDIT_MY_PASSWORD: "Edit My Password",
  DELETE_ACCOUNT: "Delete Account", // 회원탈퇴
  NAVER_LOGIN: "Naver Login",
  KAKAO_LOGIN: "Kakao Login",
  APPLE_LOGIN: "Apple Login",
  REQUESTED_CONTENT_DETAIL: "Requested Content Detail",
  EDIT_REQUESTED_CONTENT: "Edit Requested Content",
} as const;

export type WebviewScreen = keyof typeof WEBVIEW_SCREEN;
