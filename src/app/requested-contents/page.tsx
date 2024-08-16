"use client";

import Badge from "@/components/Badge/Badge";
import Header from "@/components/Header";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DevIng from "../../components/DevIng";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";

export default function Page() {
  const [contents, setContents] = useState([1]);
  const router = useRouter();

  return <DevIng />;

  return (
    <>
      <Header>
        <LeftOption option={{ back: true }} />
        <MiddleText text="컨텐츠 등록 요청 내역" />
        <RightOption
          option={{ create: { onClick: () => router.push("/create/content") } }}
        />
      </Header>
      <main className="px-[24px]">
        {contents.length === 0 ? (
          <div className="empty">컨텐츠 등록 요청 내역이 없습니다.</div>
        ) : (
          <ul>
            {DUMMY_DATA.map(({ id, genre, title, img, date, status }) => {
              return (
                <li
                  key={id}
                  className="flex justify-between items-center border-b-[1px] w-[100%] h-[80px] border-bottom"
                >
                  <div className="flex">
                    <div className="w-[64px] h-[64px] mr-[12px] relative">
                      <Image src={img} fill alt="컨텐츠 이미지" />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="text-body4 text-skyblue-01">{genre}</div>
                      <div className="text-body2">{title}</div>
                      <div className="text-body5 text-grey-04">{date}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="active">등록 대기</Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}

const DUMMY_DATA = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  date: "2023.09.03",
  genre: "팝업스토어",
  title: "동대문엽기떡볶이 팝업스토어",
  img: `https://picsum.photos/112/112?random=${index}`,
  status: "active",
}));
