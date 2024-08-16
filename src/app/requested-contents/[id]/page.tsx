"use client";

import Checkbox from "@/components/Checkbox";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import MediumSelectButton from "@/components/SelectButton/MediumSelectButton";
import { Input, InputWrapper, Label } from "@/components/newInput";
import CalendarIcon from "@/icons/calendar.svg";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";

const uploadedImgs = Array.from(
  { length: 10 },
  (_, index) => `https://picsum.photos/112/112?random=${index}`
);

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Header>
        <LeftOption option={{ back: true }} />
        <MiddleText text="컨텐츠 등록 요청" />
      </Header>
      <main>
        <div className="px-[24px] mt-[16px]">
          <Label.AsReadOnly>컨텐츠명</Label.AsReadOnly>
          <Input.AsReadOnly>동대문엽기떡볶이 팝업스토어</Input.AsReadOnly>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <div>
            <Label.AsReadOnly>장르</Label.AsReadOnly>
            <Input.AsReadOnly>팝업스토어</Input.AsReadOnly>
          </div>
          <div className="my-[34px]">
            <Label.AsReadOnly>주소</Label.AsReadOnly>
            <Input.AsReadOnly>
              서울특별시 성동구 성수이로18길 6-1
            </Input.AsReadOnly>
          </div>
          <div>
            <Label.AsReadOnly>연령대</Label.AsReadOnly>
            <Input.AsReadOnly>20대</Input.AsReadOnly>
          </div>
          <div className="mt-[34px]">
            <Label.AsReadOnly>스타일</Label.AsReadOnly>
            <Input.AsReadOnly>함께, 재미있는, 핫한</Input.AsReadOnly>
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
                  text="2023.10.20"
                />
              </div>
            </div>
            <div>
              <Label.AsReadOnly>오픈날짜</Label.AsReadOnly>
              <div className="mt-[12px]">
                <MediumSelectButton.AsReadOnly
                  Icon={<CalendarIcon />}
                  text="2023.10.20"
                />
              </div>
            </div>
          </div>
          <div>
            <Label.AsReadOnly>오픈시간</Label.AsReadOnly>
            <Input.AsReadOnly>
              월-금 12:00-20:00 / 토-일 11:00-20:00
            </Input.AsReadOnly>
          </div>
          <div className="my-[34px]">
            <Label.AsReadOnly>웹사이트</Label.AsReadOnly>
            <Input.AsReadOnly>https://liket-web.vercel.app/</Input.AsReadOnly>
          </div>
          <div className="flex justify-between">
            {["입장료", "예약", "반려동물", "주차"].map((item) => {
              return (
                <Checkbox.AsReadOnly
                  key={item}
                  isChecked={false}
                  label={item}
                  size="12px"
                />
              );
            })}
          </div>
        </div>
        <Divider width="100%" height="8px" margin="16px 0" />
        <div className="px-[24px]">
          <Label
            htmlFor="photos"
            maxLength={10}
            currentLength={uploadedImgs.length}
          >
            사진
          </Label>
          <ScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] mt-[8px]">
            {uploadedImgs.map((url) => {
              return (
                <li key={url} className="w-[96px] h-[96px] relative shrink-0">
                  <Image src={url} fill alt="업로드된 이미지" />
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </InputWrapper>
        </div>
      </main>
    </>
  );
}
