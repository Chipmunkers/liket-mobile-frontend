import KaKao from "@/icons/logins/kakao.svg";
import Naver from "@/icons/logins/naver.svg";
import Apple from "@/icons/logins/apple.svg";
import { ReactNode } from "react";

export const GENRES = [
  "팝업스토어",
  "전시회",
  "연극",
  "뮤지컬",
  "콘서트",
  "페스티벌",
] as const;

export const CONTENT_STATES = [
  "active",
  "closed",
  "waiting",
  "willActive",
  "willClosed",
  "inactive",
  "hotplace",
] as const;

export const CITIES = ["서울특별시", "인천광역시", "경기도"] as const;

export const AGES = [
  "전체",
  "아이들",
  "10대",
  "20대",
  "30대",
  "40-50대",
] as const;

export const STYLES = [
  "혼자",
  "함께",
  "반려동물",
  "체험",
  "굿즈",
  "재미있는",
  "귀여운",
  "포토존",
  "세련된",
  "힙한",
  "미니멀",
  "편안한",
  "힐링",
  "핫한",
] as const;

export const ORDERS = ["최신순", "인기순"] as const;

export const PROVIDER_ICON: {
  [key: string]: ReactNode;
} = {
  kakao: <KaKao />,
  naver: <Naver />,
  apple: <Apple />,
  local: <></>,
};
