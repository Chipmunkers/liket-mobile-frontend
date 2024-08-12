"use client";

import CustomImage from "@/components/CustomImage";
import Divider from "@/components/Divider";
import FallbackContentImg from "@/components/FallbackContentImg";
import LinkItem from "@/components/LinkItem";
import LinkableTab from "@/components/LinkableTab";
import RightArrow from "@/icons/right-arrow.svg";
import { useMyPage } from "@/service/profile";
import profileStore from "@/stores/profileStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { If, Then, Else } from "react-if";
import ScrollContainer from "react-indiana-drag-scroll";

export default function Page() {
  const router = useRouter();
  const setProfile = profileStore(({ setProfile }) => setProfile);
  const { data, error } = useMyPage({
    onSuccess: (profile) => setProfile(profile),
  });

  useEffect(() => {
    if (!error) return;

    router.replace("/login");
  }, [error, router]);

  if (!data) {
    return <></>;
  }

  const {
    reviewCount,
    reviewList,
    liketCount,
    liketList,
    profileImgPath,
    nickname,
    email,
  } = data;

  return (
    <>
      <main className="grow">
        <div className="mx-[24px]">
          <div className="flex mt-[64px]">
            <div className="grow">
              <div className="flex flex-col">
                <Link className="text-h1" href="/mypage/edit/profile">
                  {nickname}
                  <RightArrow
                    style={{
                      display: "inline",
                    }}
                  />
                </Link>
                <div className="text-body5 text-grey-04 mt-[7px]">{email}</div>
                <div className="flex text-body3 items-center mt-[15px]">
                  좋아요{" "}
                  <p className="text-numbering1 text-skyblue-01 ml-[4px]">20</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-[80px] h-[80px] rounded-full relative overflow-hidden">
                <CustomImage
                  src={
                    profileImgPath &&
                    process.env.NEXT_PUBLIC_IMAGE_SERVER + profileImgPath
                  }
                  fallbackImg={"/icons/default-avatar.svg"}
                  alt="프로필 이미지"
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[24px]">
            <Link className="flex items-center" href="/reviews">
              <div className="text-h2 mr-[4px]">리뷰</div>
              <div className="text-numbering1 text-skyblue-01">
                {reviewCount}
              </div>
              <RightArrow />
            </Link>
            <If condition={reviewList.length > 0}>
              <Then>
                <ScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] mt-[8px]">
                  {reviewList.map(({ idx, thumbnail }) => {
                    return (
                      <Link href={`/reviews/${idx}`} key={idx}>
                        <div className="relative w-[112px] h-[178px]">
                          <CustomImage
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_SERVER + thumbnail
                            }
                            fallbackComponent={<FallbackContentImg />}
                            width={112}
                            height={178}
                            alt={`리뷰 썸네일 이미지`}
                            style={{
                              width: 112,
                              height: 178,
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </ScrollContainer>
              </Then>
              <Else>
                <div className="text-body5 text-grey-04">
                  컨텐츠가 없습니다.
                </div>
              </Else>
            </If>
          </div>
          <div className="flex flex-col mt-[24px]">
            <Link className="flex items-center" href="/likets">
              <div className="text-h2 mr-[4px]">라이켓</div>
              <div className="text-numbering1 text-skyblue-01">
                {liketCount}
              </div>
              <RightArrow />
            </Link>
            <If condition={liketList.length > 0}>
              <Then>
                <ScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] mt-[8px]">
                  {liketList.map(({ idx, imgPath }) => {
                    return (
                      <Link href={`/likets/${idx}`} key={idx}>
                        <div className="relative w-[112px] h-[178px]">
                          <CustomImage
                            src={process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath}
                            fallbackComponent={<FallbackContentImg />}
                            width={112}
                            height={178}
                            alt={`라이켓 이미지`}
                            style={{
                              width: 112,
                              height: 178,
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </ScrollContainer>
              </Then>
              <Else>
                <div className="text-body5 text-grey-04">
                  컨텐츠가 없습니다.
                </div>
              </Else>
            </If>
          </div>
        </div>
        <Divider width="100%" height="8px" margin="24px 0 0 0" />
        <LinkItem href="/account">계정 관리</LinkItem>
        <Divider width="100%" height="8px" />
        <LinkItem href="/requested-contents">컨텐츠 등록 요청</LinkItem>
        <LinkItem href="/inquires">1:1문의</LinkItem>
        <Divider width="100%" height="8px" />
        <LinkItem href="/terms">약관/정책</LinkItem>
        <div className="flex justify-between items-center w-[100%] h-[48px] px-[24px]">
          <div className="text-h2">버전</div>
          <div className="text-body2 text-grey-04">1.0</div>
        </div>
      </main>
      <LinkableTab shadow />
    </>
  );
}
