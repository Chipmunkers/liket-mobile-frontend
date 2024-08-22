import { z } from "zod";

export const passwordSchema = z
  .object({
    oldPw: z.string().min(8, "비밀번호 형식이 올바르지 않습니다."),
    pw: z
      .string()
      .min(8, "최소 8자리 이상 입력해야 합니다.")
      .regex(/[a-zA-Z]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다."),
    "confirm-pw": z.string(),
  })
  .refine((data) => data.pw === data["confirm-pw"], {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm-pw"],
  });
