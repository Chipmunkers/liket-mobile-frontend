"use client";

import Badge from "@/components/Badge/Badge";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DevIng from "../../components/DevIng";
import { useGetMyInfo } from "@/hooks/useGetMyInfo";
import { useGetContents } from "./hooks/useGetContents";

export default function Page() {
  const [contents, setContents] = useState([1]);
  const router = useRouter();
  const { data, error } = useGetMyInfo();
  const { contentListToShow } = useGetContents(data?.idx);

  useEffect(() => {
    if (error?.response?.status === 401) {
      router.replace("/login");
    }
  }, [error?.response?.status, router]);

  return <DevIng />;

  if (!contentListToShow) {
    return <></>;
  }

  return (
    <>
      <Header>
        <Header.LeftOption option={{ back: true }} />
        <Header.MiddleText text="컨텐츠 등록 요청 내역" />
        <Header.RightOption
          option={{ create: { onClick: () => router.push("/create/content") } }}
        />
      </Header>
      <main className="px-[24px]">
        {contentListToShow?.length === 0 ? (
          <div className="empty">컨텐츠 등록 요청 내역이 없습니다.</div>
        ) : (
          <ul>
            {contentListToShow?.map(
              ({ idx, genre, title, thumbnail, createdAt, acceptedAt }) => {
                return (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b-[1px] w-[100%] h-[80px] border-bottom"
                  >
                    <div className="flex">
                      <div className="w-[64px] h-[64px] mr-[12px] relative">
                        <Image
                          src={process.env.NEXT_PUBLIC_IMAGE_SERVER + thumbnail}
                          fill
                          alt="컨텐츠 이미지"
                        />
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
                      <Badge variant={acceptedAt ? "active" : "waiting"}>
                        {acceptedAt ? "등록완료" : "등록대기"}
                      </Badge>
                    </div>
                  </li>
                );
              }
            )}
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
