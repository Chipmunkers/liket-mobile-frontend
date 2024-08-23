"use client";

import CalendarIcon from "@/icons/calendar.svg";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { useGetContentDetail } from "./_hooks/useGetContentDetail";
import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase/ButtonBase";
import { useRouter } from "next/navigation";
import { useRemoveContent } from "./_hooks/useRemoveContent";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import Divider from "@/shared/ui/Divider";
import SelectButtonMedium from "@/shared/ui/SelectButton/SelectButtonMedium";
import customToast from "@/shared/helpers/customToast";
import Drawer from "@/shared/ui/Drawer";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import CheckBox from "@/shared/ui/CheckBox";
import { formatDate } from "./_utils/formatDate";

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useGetContentDetail(params?.id);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const router = useRouter();
  const { mutate: removeContent } = useRemoveContent({
    onSuccess: () => {
      router.replace("/requested-contents");
    },
    onError: (error) => {
      if (error?.response?.status === 404) {
        customToast("해당 컨텐츠를 조회할 수 없습니다.");
        setIsMenuDrawerOpen(false);
        return;
      }
    },
  });

  if (!data) {
    return <></>;
  }

  const {
    idx,
    title,
    genre,
    location,
    age,
    style,
    startDate,
    endDate,
    websiteLink,
    openTime,
    isFee,
    isParking,
    isPet,
    isReservation,
    description,
    imgList,
    acceptedAt,
  } = data;

  const condition: {
    [key: string]: boolean;
  } = {
    입장료: isFee,
    예약: isReservation,
    반려동물: isPet,
    주차: isParking,
  };

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="컨텐츠 등록 요청" />
        {!acceptedAt && (
          <HeaderRight
            option={{
              menu: {
                onClick: () => {
                  setIsMenuDrawerOpen(true);
                },
              },
            }}
          />
        )}
      </Header>
      <main>
        <div className="px-[24px] mt-[16px]">
          <InputLabel>컨텐츠명</InputLabel>
          <BasicInput readOnly>{title}</BasicInput>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <div>
            <InputLabel>장르</InputLabel>
            <BasicInput readOnly>{genre.name}</BasicInput>
          </div>
          <div className="my-[34px]">
            <InputLabel>주소</InputLabel>
            <BasicInput readOnly>
              {location.address + " " + location.detailAddress}
            </BasicInput>
          </div>
          <div>
            <InputLabel>연령대</InputLabel>
            <BasicInput readOnly>{age.name}</BasicInput>
          </div>
          <div className="mt-[34px]">
            <InputLabel>스타일</InputLabel>
            <BasicInput readOnly>
              {style
                .map(({ name }) => {
                  return name;
                })
                .join(", ")}
            </BasicInput>
          </div>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <div className="flex justify-between mb-[34px]">
            <div>
              <InputLabel>오픈날짜</InputLabel>
              <div className="mt-[12px]">
                <SelectButtonMedium
                  readonly
                  Icon={<CalendarIcon />}
                  text={formatDate(startDate)}
                />
              </div>
            </div>
            <div>
              <InputLabel>종료날짜</InputLabel>
              <div className="mt-[12px]">
                <SelectButtonMedium
                  readonly
                  Icon={<CalendarIcon />}
                  text={formatDate(endDate)}
                />
              </div>
            </div>
          </div>
          <div>
            <InputLabel>오픈시간</InputLabel>
            <BasicInput readOnly>{openTime}</BasicInput>
          </div>
          <div className="my-[34px]">
            <InputLabel>웹사이트</InputLabel>
            <BasicInput readOnly>{websiteLink}</BasicInput>
          </div>
          <div className="flex justify-between">
            {["입장료", "예약", "반려동물", "주차"].map((item) => {
              return (
                <CheckBox
                  readonly
                  key={item}
                  isChecked={condition[item]}
                  label={item}
                  size="12px"
                />
              );
            })}
          </div>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <InputLabel
            htmlFor="photos"
            maxLength={10}
            currentLength={imgList.length}
          >
            사진
          </InputLabel>
          <ScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] mt-[8px]">
            {imgList.map((url) => {
              return (
                <li key={url} className="w-[96px] h-[96px] relative shrink-0">
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_SERVER + url}
                    fill
                    alt="업로드된 이미지"
                  />
                </li>
              );
            })}
          </ScrollContainer>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <div>
            <InputLabel>상세정보</InputLabel>
            <div className="w-[100%] mb-[34px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0">
              {description}
            </div>
          </div>
        </div>
      </main>
      <Drawer
        open={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
      >
        <div className="center text-h2">장르</div>
        <ul>
          <ButtonBase
            onClick={() => {
              router.push(`/create/content?idx=${idx}`);
            }}
            className="bottom-sheet-button flex justify-start px-[24px]"
          >
            수정하기
          </ButtonBase>
          <ButtonBase
            disabled={!!acceptedAt}
            onClick={() => {
              removeContent(params?.id);
            }}
            className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
          >
            삭제
          </ButtonBase>
        </ul>
      </Drawer>
    </>
  );
}
