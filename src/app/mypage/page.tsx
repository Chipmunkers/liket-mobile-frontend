"use client";

import RightArrow from "@/icons/right-arrow.svg";
import { ButtonBase } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { If, Then, Else } from "react-if";
import ScrollContainer from "react-indiana-drag-scroll";
import VerticalDivider from "./icons/vertical-divider.svg";
import BottomTab from "@/widgets/common/BottomTab";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import DefaultImg from "@/shared/ui/DefaultImg";
import Divider from "@/shared/ui/Divider";
import LinkItem from "@/shared/ui/Link/LinkItem";
import customToast from "@/shared/helpers/customToast";
import ProfileImgUploader from "@/shared/ui/ProfileImgUploader";
import { useUploadProfileImg } from "./_hooks/useUploadProfileImg";
import { useGetMyInfo } from "@/app/mypage/_hooks/useGetMyInfo";
import { DefaultLoading } from "@/shared/ui/Loading";

export default function Page() {
  const router = useRouter();
  const { data, error } = useGetMyInfo({
    onSuccess: (data) => {},
  });

  const [profileImgPath, setProfileImgPath] = useState(
    data?.profileImgPath || ""
  );

  // * 프로필 이미지 state 관리
  useEffect(() => {
    if (!data) return;

    setProfileImgPath(data.profileImgPath);
  }, [data]);

  // * 내 정보 보기 에러 처리
  useEffect(() => {
    if (!error) return;

    stackRouterPush(router, {
      path: "/login",
      screen: WEBVIEW_SCREEN.LOGIN,
      isStack: false,
    });
  }, [error, router]);

  const { mutate: uploadProfileImg, status: uploadStatus } =
    useUploadProfileImg({
      onSuccess: (data) => {
        setProfileImgPath(data.filePath);
      },
    });

  if (!data) {
    return <></>;
  }

  const {
    reviewCount,
    reviewList,
    liketCount,
    liketList,
    nickname,
    email,
    likeCount,
  } = data;

  return (
    <>
      <main className="grow mb-[48px]">
        <div className="mx-[24px]">
          <div className="flex mt-[64px]">
            <div className="grow">
              <div className="flex flex-col">
                <Link
                  className="text-h1"
                  href="/mypage/edit/profile"
                  onClick={(e) => {
                    e.preventDefault();

                    stackRouterPush(router, {
                      path: "/mypage/edit/profile",
                      screen: WEBVIEW_SCREEN.EDIT_PROFILE,
                    });
                  }}
                >
                  {nickname}
                  <RightArrow
                    style={{
                      display: "inline",
                    }}
                  />
                </Link>
                <div className="text-body5 text-grey-04 mt-[7px]">{email}</div>
                <div className="flex mt-[15px]">
                  <div className="flex text-body3 items-end">
                    좋아요{" "}
                    <ButtonBase
                      disableRipple={true}
                      className="text-numbering1 text-skyblue-01 ml-[4px] h-[18px]"
                      onClick={() => {
                        stackRouterPush(router, {
                          path: "/like",
                          screen: WEBVIEW_SCREEN.LIKE,
                        });
                      }}
                    >
                      <div className="text-numbering1 text-skyblue-01 ml-[4px]">
                        {likeCount}
                      </div>
                    </ButtonBase>
                  </div>
                  <div className="flex items-center mx-[16px]">
                    <VerticalDivider />
                  </div>
                  <div className="flex text-body3 items-end">
                    루트보관함{" "}
                    <ButtonBase
                      disableRipple={true}
                      className="text-numbering1 text-skyblue-01 ml-[4px] h-[18px]"
                      onClick={() => {
                        customToast("열심히 준비중입니다!");
                      }}
                    >
                      <div className="text-numbering1 text-skyblue-01 ml-[4px]">
                        0
                      </div>
                    </ButtonBase>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-[80px] h-[80px] rounded-full relative">
                {uploadStatus === "pending" ? (
                  <div className="bg-grey-01 rounded-full w-[100%] h-[100%]">
                    <DefaultLoading dotSize="8px" />
                  </div>
                ) : (
                  <ProfileImgUploader
                    key={profileImgPath}
                    preview={false}
                    src={profileImgPath}
                    onUpload={async (file) => {
                      uploadProfileImg(file);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[24px]">
            <Link
              className="flex items-center"
              href="/reviews"
              onClick={(e) => {
                e.preventDefault();

                stackRouterPush(router, {
                  path: "/reviews",
                  screen: WEBVIEW_SCREEN.MY_REVIEW,
                });
              }}
            >
              <div className="text-h2 mr-[4px]">리뷰</div>
              <div className="text-numbering1 text-skyblue-01">
                {reviewCount}
              </div>
              <RightArrow />
            </Link>
            <If condition={reviewList.length > 0}>
              <Then>
                <ScrollContainer className="flex flex-row gap-[8px] w-[100%] mt-[8px]">
                  {reviewList.map((review) => {
                    return (
                      <Link
                        href={`/reviews/${review.idx}`}
                        key={review.idx}
                        onClick={(e) => {
                          e.preventDefault();

                          // TODO: 추후에 /contents/${idx}?review=${review.idx} 로 변경
                        }}
                      >
                        <div className="relative w-[112px] h-[112px]">
                          <DefaultImg src={review.thumbnail} />
                        </div>
                      </Link>
                    );
                  })}
                </ScrollContainer>
              </Then>
              <Else>
                <div className="text-body5 text-grey-04">
                  게시물이 없습니다.
                </div>
              </Else>
            </If>
          </div>
          <div className="flex flex-col mt-[24px] mb-[24px]">
            <Link
              className="flex items-center"
              href="/likets"
              onClick={(e) => {
                e.preventDefault();

                stackRouterPush(router, {
                  path: "/likets",
                  screen: WEBVIEW_SCREEN.MY_LIKET,
                });
              }}
            >
              <div className="text-h2 mr-[4px]">라이켓</div>
              <div className="text-numbering1 text-skyblue-01">
                {liketCount}
              </div>
              <RightArrow />
            </Link>
            <If condition={liketList.length > 0}>
              <Then>
                <ScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] mt-[8px]">
                  {liketList.map((liket) => (
                    <Link
                      href={`/likets/${liket.idx}`}
                      key={liket.idx}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="relative w-[112px] h-[178px]">
                        <DefaultImg src={liket.imgPath} />
                      </div>
                    </Link>
                  ))}
                </ScrollContainer>
              </Then>
              <Else>
                <div className="text-body5 text-grey-04">
                  게시물이 없습니다.
                </div>
              </Else>
            </If>
          </div>
        </div>
        <Divider width="100%" height="8px" />
        <ButtonBase
          onClick={() => {
            stackRouterPush(router, {
              path: "/account",
              screen: WEBVIEW_SCREEN.ACCOUNT,
            });
          }}
        >
          <LinkItem screen={WEBVIEW_SCREEN.ACCOUNT} href="/account">
            계정 관리
          </LinkItem>
        </ButtonBase>
        <Divider width="100%" height="8px" />
        <ButtonBase
          onClick={(e) => {
            stackRouterPush(router, {
              path: "/requested-contents",
              screen: WEBVIEW_SCREEN.MY_REQUEST_CONTENT,
            });
          }}
        >
          <LinkItem
            screen={WEBVIEW_SCREEN.MY_REQUEST_CONTENT}
            href="/requested-contents"
          >
            컨텐츠 등록 요청
          </LinkItem>
        </ButtonBase>
        <ButtonBase
          onClick={() => {
            stackRouterPush(router, {
              path: "/inquiries",
              screen: WEBVIEW_SCREEN.MY_INQUIRY,
            });
          }}
        >
          <LinkItem screen={WEBVIEW_SCREEN.MY_INQUIRY} href="/inquires">
            1:1문의
          </LinkItem>
        </ButtonBase>
        <Divider width="100%" height="8px" />
        <ButtonBase
          onClick={() => {
            stackRouterPush(router, {
              path: "/terms",
              screen: WEBVIEW_SCREEN.TERMS_LIST,
            });
          }}
        >
          <LinkItem screen={WEBVIEW_SCREEN.TERMS_LIST} href="/terms">
            약관/정책
          </LinkItem>
        </ButtonBase>
        <div className="flex justify-between items-center w-[100%] h-[48px] px-[24px]">
          <div className="text-h2">버전</div>
          <div className="text-body2 text-grey-04">1.0</div>
        </div>
      </main>
      <BottomTab shadow={true} />
    </>
  );
}
