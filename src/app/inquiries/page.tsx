"use client";

import Header from "@/components/Header";
import LeftOption from "@/components/Header/LeftOption";
import RightOption from "@/components/Header/RightOption";
import DevIng from "../../components/DevIng";
import MiddleText from "@/components/Header/MiddleText";
import { useRouter } from "next/navigation";
import { useGetInquiries } from "./hooks/useGetInquiries";

export default function Page() {
  const router = useRouter();
  const res = useGetInquiries();

  return <DevIng />;

  return (
    <>
      <Header>
        <LeftOption logo />
        <MiddleText text="문의 내역" />
        <RightOption
          option={{
            create: {
              onClick: () => router.push("/create/inquiry"),
            },
          }}
        />
      </Header>
    </>
  );
}
