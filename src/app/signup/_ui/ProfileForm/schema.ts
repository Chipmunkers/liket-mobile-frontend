import { z } from "zod";

export const profileSchema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: "2~15자 이내로 입력해주세요." })
      .max(15, { message: "2~15자 이내로 입력해주세요." })
      .regex(/^[a-zA-Z0-9가-힣_-]{2,8}$/g, {
        message:
          "닉네임 2-8글자의 한글, 영문, 숫자, _, - 만 입력할 수 있습니다.",
      }),
    gender: z.string().min(1),
    file: z.string().min(1),
    birth: z.string().min(1),
  })
  .required();
