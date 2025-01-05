import { z } from "zod";

export const profileSchema = z
  .object({
    nickname: z
      .string()
      .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
      .max(8, "닉네임은 최대 8자까지 가능합니다.")
      .regex(/^[a-zA-Z0-9가-힣_-]+$/, {
        message: "닉네임은 한글, 영문, 숫자, _, - 만 입력할 수 있습니다.",
      }),
    gender: z.string().min(1),
    file: z.string().min(1),
    birth: z.string().min(1),
  })
  .required();
