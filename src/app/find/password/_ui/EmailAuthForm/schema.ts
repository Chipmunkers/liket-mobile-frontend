import { z } from "zod";

export const sendEmailVerificationSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  token: z.string().length(6, "6자를 입력해주세요"),
});
