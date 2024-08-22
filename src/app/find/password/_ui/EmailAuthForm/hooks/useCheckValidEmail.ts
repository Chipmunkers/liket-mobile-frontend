import { sendEmailVerificationSchema } from "@/app/find/password/_ui/EmailAuthForm/schema";
import { useEffect, useState } from "react";

export const useCheckValidEmail = (email: string) => {
  const [emailValid, setEmailValid] = useState(false);

  useEffect(() => {
    const isValidEmail =
      sendEmailVerificationSchema.shape.email.safeParse(email);

    setEmailValid(isValidEmail.success);
  }, [email]);

  return { emailValid };
};
