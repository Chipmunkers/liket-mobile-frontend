"use client";

import { useRouter, useSearchParams } from "next/navigation";
import KaKaoIcon from "@/icons/logins/kakao.svg";
import { Case, Default, Switch } from "react-if";
import { Header, HeaderLeft } from "@/shared/ui/Header";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider");
  const email = searchParams.get("email");

  if (!provider || !email) {
    return <></>;
  }

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: {
              onClick: () => {
                stackRouterPush(router, {
                  path: "/login",
                  screen: WEBVIEW_SCREEN.LOGIN,
                  isStack: false,
                });
              },
            },
          }}
        />
      </Header>
      <main className="px-[24px] py-[24px]">
        <h2>라이켓에서 이미 가입된 계정입니다.</h2>
        <div className="text-grey-04 text-body5 mb-[34px]">
          가입되어 있는 계정으로 로그인 해주세요.
        </div>
        <div className="flex items-center text-grey-05 text-body3 rounded-[20px] border-solid border-[1px] border-grey-02 h-[40px] px-[16px]">
          <Switch>
            <Case condition={provider === "kakao"}>
              <KaKaoIcon
                style={{
                  marginRight: "16px",
                }}
              />
            </Case>
            <Default />
          </Switch>
          {email}
        </div>
      </main>
    </>
  );
}
