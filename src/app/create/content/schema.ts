import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, "필수로 입력돼야합니다."),
  genre: z.string().min(1, "필수로 입력돼야합니다."),
  address: z.string().min(1, "필수로 입력돼야합니다."),
  age: z.string().min(1, "필수로 입력돼야합니다."),
  style: z.array(z.string()),
  "additional-address": z.string().min(1, "필수로 입력돼야합니다."), // TODO: nullable하게 변경 필요
  openTime: z.string().min(1, "필수로 입력돼야합니다."), // TODO: nullable하게 변경 필요
  websiteLink: z.string().min(1, "필수로 입력돼야합니다."), // TODO: nullable하게 변경 필요
  condition: z.array(z.string()),
  description: z.string().min(1, "필수로 입력돼야합니다."), // TODO: nullable하게 변경 필요
  startDate: z.string().min(1, "필수로 입력돼야합니다."),
  endDate: z.string().min(1, "필수로 입력돼야합니다."), // TODO: nullable하게 변경 필요
  imgList: z.array(z.string()).min(1, "이미지가 최소 하나 이상 필요합니다."),
});

export const DEFAULT_VALUE = {
  title: "",
  genre: "",
  address: "",
  age: "",
  style: [],
  "additional-address": "",
  openTime: "",
  websiteLink: "",
  condition: [],
  description: "",
  startDate: "",
  endDate: "",
  imgList: [],
};

export type ValidateSchema = {
  title: string;
  genre: string;
  address: string;
  age: string;
  style: string[];
  "additional-address": string;
  openTime: string;
  websiteLink: string;
  condition: string[];
  description: string;
  startDate: string;
  endDate: string;
  imgList: string[];
};
