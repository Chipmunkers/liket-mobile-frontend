export const INQUIRY_TYPES = [
  { idx: 1, name: "이용 문의" },
  { idx: 2, name: "오류 신고" },
  { idx: 3, name: "서비스 제안" },
  { idx: 4, name: "기타" },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["name"];
