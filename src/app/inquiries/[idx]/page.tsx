"use client";

import SkeletonItem from "@/shared/ui/SkeletonItem";
import { useGetInquiryByIdx } from "./_hooks/useGetInquiryByIdx";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import InquirySkeleton from "@/app/inquiries/[idx]/_ui/InquirySkeleton";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function page({ params: { idx } }: PageProps) {
  const { data: inquiry } = useGetInquiryByIdx(Number(idx));

  if (inquiry) {
    return (
      <>
        <Header>
          <HeaderLeft
            option={{
              back: true,
            }}
          />
          <HeaderMiddle text="문의내역" />
        </Header>
        <main className="boxShadow h-fit">
          <InquirySkeleton />
        </main>
      </>
    );
  }

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text="문의내역" />
      </Header>
    </>
  );
}
