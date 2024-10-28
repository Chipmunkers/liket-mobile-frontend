export const CONTENT_STATES = {
  active: {
    name: "진행중",
  },
  closed: {
    name: "종료",
  },
  waiting: {
    name: "등록대기",
  },
  willActive: {
    name: "오픈예정",
  },
  willClosed: {
    name: "종료예정",
  },
  inactive: {
    name: "비활성화",
  },
  hotplace: {
    name: "핫플",
  },
} as const;

export type ContentState = keyof typeof CONTENT_STATES;
