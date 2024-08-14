"use client";

import SearchHeader from "@/components/SearchHeader";
import { useEffect, useState } from "react";
import SmallSelectButton from "@/components/SelectButton/SmallSelectButton";
import SmallDownArrow from "@/icons/down-arrow-small.svg";
import CustomDrawer from "@/components/CustomDrawer";
import Chip from "@/components/Chip";
import Checkbox from "@/components/Checkbox";
import { ButtonBase } from "@mui/material";
import { Sido, sidoList } from "../../../public/data/sido";
import { Genre, Style } from "../../types/content";
import { useRouter, useSearchParams } from "next/navigation";
import { ages } from "../../../public/data/age";
import { styles } from "../../../public/data/style";
import customToast from "../../utils/customToast";
import { genres } from "../../../public/data/genre";
import CustomScrollContainer from "@/components/CustomScrollContainer";
import { useQueryClient } from "@tanstack/react-query";
import {
  GET_CONTENT_ALL_KEY,
  useGetContentAll,
} from "./hooks/useGetContentAll";
import { AxiosError } from "axios";
import ContentCardGroup from "@/components/ContentCardGroup";
import useModalStore from "@/stores/modalStore";
import { classNames } from "../../utils/helpers";
import ReloadIcon from "@/icons/reload.svg";

interface Pagerble {
  region: string | null;
  style: string[];
  age: string | null;
  genre: string | null;
  open: string | null;
  orderby: string | null;
  search: string | null;
}

export default function Page() {
  const searchParams = useSearchParams();

  const getQueryString = (): Pagerble => {
    return {
      style: searchParams.getAll("style"),
      region: searchParams.get("region"),
      genre: searchParams.get("genre"),
      age: searchParams.get("age"),
      open: searchParams.get("open"),
      orderby: searchParams.get("orderby"),
      search: searchParams.get("search"),
    };
  };

  const createQuerystring = (data: Pagerble): string => {
    const params = new URLSearchParams();

    if (data.region) {
      params.set("region", data.region);
    }

    if (data.genre) {
      params.set("genre", data.genre);
    }

    if (data.age) {
      params.set("age", data.age);
    }

    if (data.open) {
      params.set("open", data.open);
    }

    if (data.orderby) {
      params.set("orderby", data.orderby);
    }

    if (data.search) {
      params.set("search", data.search);
    }

    if (data.style && data.style.length > 0) {
      data.style.forEach((style) => {
        params.append("style", style);
      });
    }

    return params.toString();
  };

  const [pagerble, setPagerble] = useState<Pagerble>(getQueryString());

  const { data, fetchNextPage, isFetching, refetch, error, hasNextPage } =
    useGetContentAll(createQuerystring(getQueryString()));

  // * Drawer
  const [isSidoDrawerOpen, setIsSidoDrawerOpen] = useState(false);
  const [isAgeDrawerOpen, setIsAgeDrawerOpen] = useState(false);
  const [isStyleDrawerOpen, setIsStyleDrawerOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  const router = useRouter();

  // * Style
  const [selectStyles, setSelectStyles] = useState<Style[]>([]);

  useEffect(() => {
    setPagerble(getQueryString());
  }, [searchParams]);

  // * 옵션 변경 시 리뷰 쿼리 데이터 초기화
  const queryClient = useQueryClient();
  const resetContent = () => {
    queryClient.removeQueries({
      queryKey: [GET_CONTENT_ALL_KEY],
    });
    queryClient.setQueryData([GET_CONTENT_ALL_KEY], {
      pages: [],
      pageParams: [],
    });
  };

  useEffect(() => {
    if (!pagerble) return;

    // pagerble이 바뀌면 경로 변경
    router.push("/search?" + createQuerystring(pagerble));
  }, [pagerble]);

  // * 무한 스크롤 타겟
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && !error) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, hasNextPage, isFetching]);

  const openModal = useModalStore(({ openModal }) => openModal);

  useEffect(() => {
    if (!error) return;

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        openModal("LoginModal", {
          onClickPositive: () => {
            router.replace("/login");
          },
          onClickNegative: () => {
            router.back();
          },
        });
        return;
      }
    }

    customToast("에러가 발생했습니다. 다시 시도해주세요.");
  }, [error]);

  return (
    <>
      <SearchHeader
        onSearch={(text) => {
          setPagerble({
            ...pagerble,
            search: text || null,
          });
        }}
        placeholder="검색어를 입력해주세요."
      />
      <CustomScrollContainer className="flex overflow-x-hidden flex-row mt-[8px] [&>*:first-child]:ml-[24px] border-b-[1px] border-b-grey-01">
        <ul className="flex h-[32px] ">
          <li
            key={"all_category"}
            className={classNames(
              "h-[100%] w-[80px]",
              pagerble.genre === null
                ? "text-skyblue-01 border-b-[2px] border-skyblue-01 text-button3"
                : "text-button4 text-grey-03 pb-[2px]"
            )}
          >
            <ButtonBase
              disableRipple={true}
              className="w-[100%] h-[100%] center"
              onClick={() => {
                setPagerble({
                  ...pagerble,
                  genre: null,
                });
              }}
            >
              전체
            </ButtonBase>
          </li>
          {genres.map((genre) => {
            return (
              <li
                key={genre.idx}
                className={classNames(
                  "h-[100%] w-[80px]",
                  pagerble.genre === genre.idx.toString()
                    ? "text-skyblue-01 border-b-[2px] border-skyblue-01 text-button3"
                    : "text-button4 text-grey-03 pb-[2px]"
                )}
              >
                <ButtonBase
                  disableRipple={true}
                  className="w-[100%] h-[100%] center"
                  onClick={() => {
                    setPagerble({
                      ...pagerble,
                      genre: genre.idx.toString(),
                    });
                  }}
                >
                  {genre.name}
                </ButtonBase>
              </li>
            );
          })}
        </ul>
      </CustomScrollContainer>
      <div className="flex ml-[24px] mt-[8px] mb-[11px] gap-[8px]">
        <SmallSelectButton
          placeholder="지역"
          text={
            sidoList.find((sido) => sido.cd === pagerble.region)?.name || ""
          }
          onClick={() => {
            setIsSidoDrawerOpen(true);
          }}
          Icon={
            <SmallDownArrow
              className={classNames(
                sidoList.find((sido) => sido.cd === pagerble.region)
                  ? "fill-white"
                  : "fill-grey-black"
              )}
            />
          }
        />
        <SmallSelectButton
          placeholder="연령대"
          text={
            ages.find((age) => age.idx.toString() === pagerble.age)?.name || ""
          }
          onClick={() => setIsAgeDrawerOpen(true)}
          Icon={
            <SmallDownArrow
              className={classNames(
                ages.find((age) => age.idx.toString() === pagerble.age)
                  ? "fill-white"
                  : "fill-grey-black"
              )}
            />
          }
        />
        <SmallSelectButton
          placeholder="스타일"
          text={pagerble.style
            .map(
              (styleIdx) =>
                styles.find((style) => style.idx.toString() === styleIdx)
                  ?.name || ""
            )
            .join("·")}
          onClick={() => {
            const findStyles = styles.filter((style) =>
              pagerble.style.includes(style.idx.toString())
            );

            setSelectStyles(findStyles);
            setIsStyleDrawerOpen(true);
          }}
          Icon={
            <SmallDownArrow
              className={classNames(
                pagerble.style.length ? "fill-white" : "fill-grey-black"
              )}
            />
          }
        />
      </div>
      <div className="flex justify-between mx-[24px]">
        <Checkbox
          label="진행중인 컨텐츠만 보기"
          size="12px"
          isChecked={pagerble.open === "true"}
          onChange={() =>
            setPagerble({
              ...pagerble,
              open: pagerble.open === "true" ? null : "true",
            })
          }
        />
        {pagerble.orderby === "time" || !pagerble.orderby ? (
          <SmallSelectButton
            rippleEffect={false}
            withBorder={false}
            placeholder="최신순"
            className="text-button3"
            text=""
            onClick={() => {
              setIsOrderDrawerOpen(true);
            }}
            Icon={<SmallDownArrow />}
          />
        ) : (
          <SmallSelectButton
            rippleEffect={false}
            withBorder={false}
            placeholder="인기순"
            className="text-button3"
            text=""
            onClick={() => {
              setIsOrderDrawerOpen(true);
            }}
            Icon={<SmallDownArrow />}
          />
        )}
      </div>
      <main>
        {data && data.pages[0].contentList.length === 0 ? (
          <div className="empty">검색 결과가 없습니다.</div>
        ) : null}
        {data && (
          <ContentCardGroup
            contentList={data.pages.map((page) => page.contentList).flat()}
            key={"content-card-group"}
            setTarget={setTarget}
          />
        )}
        {error && (error as AxiosError).response?.status !== 401 && (
          <div className="absolute bottom-[24px] flex justify-center w-[100%]">
            <ButtonBase
              className="flex justify-center items-center rounded-[16px] bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.16)] w-[105px] h-[32px]"
              onClick={() => {
                refetch();
              }}
            >
              <div className="mr-[8px]">
                <ReloadIcon />
              </div>
              <span className="text-button4">새로 고침</span>
            </ButtonBase>
          </div>
        )}
      </main>
      {/* 지역 선택 */}
      <CustomDrawer
        open={isSidoDrawerOpen}
        onClose={() => setIsSidoDrawerOpen(false)}
      >
        <div className="center text-h2">지역</div>
        {sidoList.map((sido) => (
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                setPagerble((pagerble) => ({
                  ...pagerble,
                  region: pagerble.region === sido.cd ? null : sido.cd,
                }));
                setIsSidoDrawerOpen(false);
              }}
              className={classNames(
                "bottom-sheet-button flex justify-start px-[24px]",
                pagerble.region === sido.cd ? "text-skyblue-01 text-body1" : ""
              )}
            >
              {sido.fullName}
            </ButtonBase>
          </li>
        ))}
      </CustomDrawer>

      {/* 연령대 선택 */}
      <CustomDrawer
        open={isAgeDrawerOpen}
        onClose={() => setIsAgeDrawerOpen(false)}
      >
        <div className="center text-h2">연령대</div>
        {ages.map((age) => (
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                setPagerble((pagerble) => ({
                  ...pagerble,
                  age:
                    age.idx.toString() === pagerble.age
                      ? null
                      : age.idx.toString(),
                }));
                setIsAgeDrawerOpen(false);
              }}
              className={classNames(
                "bottom-sheet-button flex justify-start px-[24px]",
                pagerble.age === age.idx.toString()
                  ? "text-skyblue-01 text-body1"
                  : ""
              )}
            >
              {age.name}
            </ButtonBase>
          </li>
        ))}
      </CustomDrawer>

      {/* 스타일 선택 */}
      <CustomDrawer
        open={isStyleDrawerOpen}
        onClose={() => {
          setIsStyleDrawerOpen(false);
        }}
      >
        <div className="center text-h2">스타일</div>
        <ul className="my-[16px] w-[100%] flex px-[34px] flex-wrap gap-[8px]">
          {styles.map((style) => {
            return (
              <li key={style.idx} className="">
                <Chip
                  isSelected={
                    !!selectStyles.find(
                      (selectStyle) => selectStyle.idx === style.idx
                    )
                  }
                  onClick={() => {
                    const index = selectStyles.findIndex(
                      (selectStyle) => selectStyle.idx === style.idx
                    );

                    if (index !== -1) {
                      setSelectStyles(
                        selectStyles.filter((style, i) => i !== index)
                      );
                      return;
                    }

                    if (selectStyles.length >= 3) {
                      customToast("스타일은 최대 3개까지 선택할 수 있습니다.");
                      return;
                    }

                    setSelectStyles([...selectStyles, style]);
                  }}
                >
                  {style.name}
                </Chip>
              </li>
            );
          })}
        </ul>
        <div className="flex h-[98px] px-[24px]">
          <ButtonBase
            className="w-[100%] h-[48px] rounded-[28px] bg-skyblue-01 text-button1 text-white"
            onClick={() => {
              setPagerble({
                ...pagerble,
                style: selectStyles.map((style) => style.idx.toString()),
              });
              setIsStyleDrawerOpen(false);
            }}
          >
            확인
          </ButtonBase>
        </div>
      </CustomDrawer>

      <CustomDrawer
        open={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
      >
        <div className="center text-h2">정렬</div>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              setPagerble({
                ...pagerble,
                orderby: "time",
              });
              setIsOrderDrawerOpen(false);
            }}
            className={classNames(
              "bottom-sheet-button flex justify-start px-[24px]",
              pagerble.orderby === "time" ? "text-skyblue-01 text-body1" : ""
            )}
          >
            최신순
          </ButtonBase>
        </li>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              setPagerble({
                ...pagerble,
                orderby: "like",
              });
              setIsOrderDrawerOpen(false);
            }}
            className={classNames(
              "bottom-sheet-button flex justify-start px-[24px]",
              pagerble.orderby === "like" ? "text-skyblue-01 text-body1" : ""
            )}
          >
            인기순
          </ButtonBase>
        </li>
      </CustomDrawer>
    </>
  );
}
