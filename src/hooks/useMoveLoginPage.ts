import { useRouter } from "next/navigation";

const useMoveLoginPage = () => {
  const router = useRouter();
  return (type: "NO_TOKEN" | "INVALID_TOKEN" = "INVALID_TOKEN") =>
    router.replace(
      type === "NO_TOKEN" ? "/login" : "/login?isTokenExpired=true"
    );
};

export default useMoveLoginPage;
