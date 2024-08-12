import { useRouter } from "next/router";

const useMoveLoginPage =
  (type: "NO_TOKEN" | "INVALID TOKEN" = "INVALID TOKEN") =>
  () =>
    useRouter().replace(
      type === "NO_TOKEN" ? "/login" : "/login?isTokenExpired=true"
    );

export default useMoveLoginPage;
