"use client";

import { useRouter } from "next/navigation";
import { NotFoundError } from "@/widgets/common/Error";

export default function Page() {
  const router = useRouter();

  return <NotFoundError />;
}
