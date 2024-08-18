"use client";

import Checkbox from "@/components/Checkbox";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import MediumSelectButton from "@/components/SelectButton/MediumSelectButton";
import { Input, InputWrapper, Label } from "@/components/newInput";
import CalendarIcon from "@/icons/calendar.svg";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { useGetContentDetail } from "./hooks/useGetContentDetail";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import { useState } from "react";
import CustomDrawer from "@/components/CustomDrawer";
import ButtonBase from "@mui/material/ButtonBase/ButtonBase";
import { useRouter } from "next/navigation";
import { useRemoveContent } from "./hooks/useRemoveContent";
import { AxiosError } from "axios";
import customToast from "@/utils/customToast";

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
        <LeftOption option={{ back: true }} />
        <MiddleText text="컨텐츠 등록 요청" />
        {!acceptedAt && (
          <RightOption
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
          <Label.AsReadOnly>컨텐츠명</Label.AsReadOnly>
          <Input.AsReadOnly>{title}</Input.AsReadOnly>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <div>
            <Label.AsReadOnly>장르</Label.AsReadOnly>
            <Input.AsReadOnly>{genre.name}</Input.AsReadOnly>
          </div>
          <div className="my-[34px]">
            <Label.AsReadOnly>주소</Label.AsReadOnly>
            <Input.AsReadOnly>
              {location.address + " " + location.detailAddress}
            </Input.AsReadOnly>
          </div>
          <div>
            <Label.AsReadOnly>연령대</Label.AsReadOnly>
            <Input.AsReadOnly>{age.name}</Input.AsReadOnly>
          </div>
          <div className="mt-[34px]">
            <Label.AsReadOnly>스타일</Label.AsReadOnly>
            <Input.AsReadOnly>
              {style
                .map(({ name }) => {
                  return name;
                })
                .join(", ")}
            </Input.AsReadOnly>
          </div>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <div className="flex justify-between mb-[34px]">
            <div>
              <Label.AsReadOnly>오픈날짜</Label.AsReadOnly>
              <div className="mt-[12px]">
                <MediumSelectButton.AsReadOnly
                  Icon={<CalendarIcon />}
                  text={formatDateToYYYYMMDD(startDate)}
                />
              </div>
            </div>
            <div>
              <Label.AsReadOnly>종료날짜</Label.AsReadOnly>
              <div className="mt-[12px]">
                <MediumSelectButton.AsReadOnly
                  Icon={<CalendarIcon />}
                  text={formatDateToYYYYMMDD(endDate)}
                />
              </div>
            </div>
          </div>
          <div>
            <Label.AsReadOnly>오픈시간</Label.AsReadOnly>
            <Input.AsReadOnly>{openTime}</Input.AsReadOnly>
          </div>
          <div className="my-[34px]">
            <Label.AsReadOnly>웹사이트</Label.AsReadOnly>
            <Input.AsReadOnly>{websiteLink}</Input.AsReadOnly>
          </div>
          <div className="flex justify-between">
            {["입장료", "예약", "반려동물", "주차"].map((item) => {
              return (
                <Checkbox.AsReadOnly
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
          <Label htmlFor="photos" maxLength={10} currentLength={imgList.length}>
            사진
          </Label>
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
          <InputWrapper>
            <Label.AsReadOnly>상세정보</Label.AsReadOnly>
            <div className="w-[100%] mb-[34px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0">
              {description}
            </div>
          </InputWrapper>
        </div>
      </main>
      <CustomDrawer
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
      </CustomDrawer>
    </>
  );
}

function formatDateToYYYYMMDD(isoDate: string): string {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}
