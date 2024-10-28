import { useRouter } from "next/navigation";

/**
 * 발견 즉시 제거하십시오
 *
 * @deprecated
 */
const useMoveLoginPage = () => {
  const router = useRouter();
  return (type: "NO_TOKEN" | "INVALID_TOKEN" = "INVALID_TOKEN") =>
    router.replace(
      type === "NO_TOKEN" ? "/login" : "/login?isTokenExpired=true"
    );
};

export default useMoveLoginPage;
