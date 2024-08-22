"use client";

import { useRouter } from "next/navigation";
import { useGetInquiries } from "./_hooks/useGetInquiries";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import DevIng from "@/widgets/common/DevIng";

export default function Page() {
  const router = useRouter();
  const res = useGetInquiries();

  return <DevIng />;

  return (
    <>
      <Header>
        <HeaderLeft logo />
        <HeaderMiddle text="문의 내역" />
        <HeaderRight
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
