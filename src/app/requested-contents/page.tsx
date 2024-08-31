"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetRequestedContent } from "./_hooks/useGetRequestedContent";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import ContentCardSmall from "@/entities/content/ContentCardSmall";
import { DefaultLoading } from "@/shared/ui/Loading";
import ReloadButton from "@/shared/ui/ReloadButton";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

export default function Page() {
  const router = useRouter();
  const { data: myInformationData, error: myInformationError } = useGetMyInfo();

  const { data, refetch, error, setTarget } = useGetRequestedContent(
    myInformationData?.idx
  );

  useEffect(() => {
    if (myInformationError?.response?.status === 401) {
      stackRouterPush(router, {
        path: "/login?isTokenExpired=true",
        screen: WEBVIEW_SCREEN.LOGIN,
        isStack: false,
      });
    }
  }, [myInformationError?.response?.status, router]);

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="컨텐츠 등록 요청 내역" />
        <HeaderRight
          option={{
            create: {
              onClick: () => {
                stackRouterPush(router, {
                  path: "/create/content",
                  screen: WEBVIEW_SCREEN.CREATE_CONTENT,
                });
              },
            },
          }}
        />
      </Header>
      <main className="px-[24px]">
        {(!data || !myInformationData) && !error && <DefaultLoading />}
        {data?.pages[0].contentList.length === 0 && myInformationData ? (
          <div className="empty">컨텐츠 등록 요청 내역이 없습니다.</div>
        ) : (
          <ul>
            {data?.pages
              .map((page) => page.contentList)
              .flat()
              .map((content) => (
                <li key={content.idx}>
                  <ContentCardSmall content={content} />
                </li>
              ))}
            <div ref={setTarget} />
          </ul>
        )}
        {error && (
          <ReloadButton className="my-[24px]" onClick={refetch}>
            새로 고침
          </ReloadButton>
        )}
      </main>
    </>
  );
}
