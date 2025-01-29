import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, "필수로 입력돼야합니다."),
  genre: z.string().min(1, "필수로 입력돼야합니다."),
  address: z.string().min(1, "필수로 입력돼야합니다."),
  age: z.string().min(1, "필수로 입력돼야합니다."),
  style: z.array(z.string()),
  detailAddress: z.string(),
  openTime: z.string(),
  websiteLink: z.string(),
  description: z.string(),
  startDate: z.string().min(1, "필수로 입력돼야합니다."),
  endDate: z.string(),
  imgList: z.array(z.string()).min(1, "이미지가 최소 하나 이상 필요합니다."),
  condition: z.array(z.string()),
});

export type FormType = z.infer<typeof schema>;
