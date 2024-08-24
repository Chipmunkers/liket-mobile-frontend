"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
        {data && data?.pages[0].contentList.length === 0 ? (
          <div className="empty">컨텐츠 등록 요청 내역이 없습니다.</div>
        ) : (
          <ul>
            {data?.pages
              .map((page) => page.contentList)
              .flat()
              ?.map(
                ({ idx, genre, title, thumbnail, createdAt, acceptedAt }) => {
                  return (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b-[1px] w-[100%] h-[80px] border-bottom"
                      onClick={() => router.push(`/requested-contents/${idx}`)}
                    >
                      <div className="flex">
                        <div className="w-[64px] h-[64px] mr-[12px] relative">
                          <DefaultImg src={thumbnail} alt="컨텐츠 썸네일" />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="text-body4 text-skyblue-01">
                            {genre.name}
                          </div>
                          <div className="text-body2">{title}</div>
                          <div className="text-body5 text-grey-04">
                            {formatDateToYYYYMMDD(createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge state={acceptedAt ? "active" : "waiting"}>
                          {acceptedAt ? "등록완료" : "등록대기"}
                        </Badge>
                      </div>
                    </li>
                  );
                }
              )}
            <div ref={setTarget} />
          </ul>
        )}
      </main>
    </>
  );
}

function formatDateToYYYYMMDD(isoDate: string): string {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
