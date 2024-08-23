"use client";

import StarRating from "@/entities/review/StarRating";
import { classNames } from "@/shared/helpers/classNames";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [selectedId, setSelectedId] = useState(0);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      thumbnail: "https://picsum.photos/48/48?random=1",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 2,
      thumbnail: "https://picsum.photos/48/48?random=2",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 3,
      thumbnail: "https://picsum.photos/48/48?random=3",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 4,
      thumbnail: "https://picsum.photos/48/48?random=4",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 5,
      thumbnail: "https://picsum.photos/48/48?random=5",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 6,
      thumbnail: "https://picsum.photos/48/48?random=6",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 8,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },

    {
      id: 7,
      thumbnail: "https://picsum.photos/48/48?random=7",
      title: "Lady and the Tramp",
      genre: "팝업스토어",
      rate: 3,
      date: new Date(),
    },
  ]);

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: {
              onClick: () => {},
            },
          }}
        />
        <HeaderMiddle text="리뷰 선택" />
      </Header>
      <main>
        <ul className="flex flex-col grow">
          {reviews.map(({ id, thumbnail, title, genre, rate, date }) => {
            const formattedDate = dayjs(date).format("YYYY.MM.DD");
            const formattedTime = dayjs(date).format("HH:mm");
            return (
              <li
                className={classNames(
                  "border-b border-solid border-grey-01",
                  selectedId === id && "bg-[#e1f8ff]"
                )}
                key={id}
              >
                <button className="w-[100%]" onClick={() => setSelectedId(id)}>
                  <div className="h-[64px] py-[8px] flex">
                    <Image src={thumbnail} width={48} height={48} alt={title} />
                    <div className="pl-[12px] flex flex-col justify-around">
                      <div className="text-body2">{title}</div>
                      <div className="text-body5 text-grey-04 text-start">
                        {genre}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center h-[34px]">
                    <div className="h-[16px] w-[90px]">
                      <StarRating value={rate} readOnly />
                    </div>
                    <div>
                      <time
                        className="text-body5 text-grey-04 mr-[4px]"
                        dateTime={dayjs(date).toString()}
                      >
                        {formattedDate}
                      </time>
                      <span className="text-body5 text-grey-04">
                        {formattedTime}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <div>
          <Button
            className="flex-1 h-[48px]"
            onClick={() => {}}
            disabled={!selectedId}
          >
            다음
          </Button>
        </div>
      </main>
    </>
  );
}
