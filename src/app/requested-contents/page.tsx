"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetContents } from "./_hooks/useGetContents";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import Badge from "@/shared/ui/Badge";
import DefaultImg from "@/shared/ui/DefaultImg";
import ContentCardSmall from "@/entities/content/ContentCardSmall";
import { DefaultLoading } from "@/shared/ui/Loading";

export default function Page() {
  const router = useRouter();
  const { data: myInformationData, error: myInformationError } = useGetMyInfo();
  const { data, fetchNextPage, isFetching, refetch, error, hasNextPage } =
    useGetContents(myInformationData?.idx);

  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (myInformationError?.response?.status === 401) {
      router.replace("/login");
    }
  }, [myInformationError?.response?.status, router]);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && !error) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, hasNextPage, isFetching]);

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="컨텐츠 등록 요청 내역" />
        <HeaderRight
          option={{ create: { onClick: () => router.push("/create/content") } }}
        />
      </Header>
      <main className="px-[24px]">
        {!data && <DefaultLoading />}
        {!data ? <DefaultLoading center /> : null}
        {data?.pages[0].contentList.length === 0 ? (
          <div className="empty">컨텐츠 등록 요청 내역이 없습니다.</div>
        ) : (
          <ul>
            {data?.pages
              .map((page) => page.contentList)
              .flat()
              ?.map((content) => (
                <li key={content.idx}>
                  <ContentCardSmall content={content} />
                </li>
              ))}
            <div ref={setTarget} />
          </ul>
        )}
      </main>
    </>
  );
}
