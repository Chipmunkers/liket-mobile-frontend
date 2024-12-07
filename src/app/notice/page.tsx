"use client";

import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import Link from "next/link";
import dayjs from "dayjs";
import { useGetAllNotice } from "./_services/useGetAllNotice";
import { DefaultLoading } from "@/shared/ui/Loading";
import { useEffect, useState } from "react";
import customToast from "@/shared/helpers/customToast";
import ReloadButton from "@/shared/ui/ReloadButton";
import { useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const { data, isFetching, refetch, error, hasNextPage, fetchNextPage } =
    useGetAllNotice();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!error) return;

    customToast("리뷰를 불러오는 중 에러가 발생했습니다.");
  }, [error]);

  useEffect(() => {
    return () => resetReview();
  }, []);

  const resetReview = () => {
    queryClient.removeQueries({
      queryKey: [`notices`],
    });
    queryClient.setQueryData([`content-review`], {
      pages: [],
      pageParams: [],
    });
  };

  const [infinityScrollObservingTarget, setInfinityScrollObservingTarget] =
    useState<HTMLDivElement | null>(null);

  // TODO: 리팩토링 필요
  useEffect(() => {
    if (!infinityScrollObservingTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && !error) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(infinityScrollObservingTarget);
    return () => {
      observer.unobserve(infinityScrollObservingTarget);
    };
  }, [infinityScrollObservingTarget, hasNextPage, isFetching]);

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="공지사항" />
      </Header>
      <main className="px-[24px]">
        {isFetching && !data?.pages[0] && <DefaultLoading center />}
        {data && data.pages[0]?.noticeList.length === 0 ? (
          <></>
        ) : (
          <ul>
            {data?.pages
              .map((page) => page.noticeList)
              .flat()
              .map(({ idx, title, createdAt }) => {
                return (
                  <li key={idx}>
                    <Link
                      href={`/notice/${idx}`}
                      className="flex flex-col justify-center gap-[8px] pt-[8px] pb-[6px] border-b border-grey-01"
                    >
                      <div className="text-body2">{title}</div>
                      <div className="text-body5 text-grey-03">
                        {dayjs(createdAt).format("YYYY.MM.DD HH:mm")}
                      </div>
                    </Link>
                  </li>
                );
              })}
          </ul>
        )}
        <div ref={setInfinityScrollObservingTarget} />
        {error && (
          <ReloadButton onClick={refetch} className="mt-[24px] mb-[24px]">
            새로고침
          </ReloadButton>
        )}
      </main>
    </>
  );
}
