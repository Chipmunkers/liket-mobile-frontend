"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import ScrollContainer from "react-indiana-drag-scroll";
import DeleteIcon from "@/icons/circle-cross.svg";
import CreateIcon from "@/icons/create.svg";
import { useEffect, useRef, useState } from "react";
import CalendarIcon from "@/icons/calendar.svg";
import { ButtonBase, TextareaAutosize } from "@mui/material";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import Script from "next/script";
import { useCreateContent } from "./_hooks/useCreateContent";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import Divider from "@/shared/ui/Divider";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import Chip from "@/shared/ui/Chip";
import Button from "@/shared/ui/Button";
import { classNames } from "@/shared/helpers/classNames";
import customToast from "@/shared/helpers/customToast";
import { GENRES } from "@/shared/consts/content/genre";
import { AGES } from "@/shared/consts/content/age";
import { STYLES } from "@/shared/consts/content/style";
import Drawer from "@/shared/ui/Drawer";
import InputButton from "@/shared/ui/Input/InputButton";
import { useUploadContentImages } from "./_hooks/useUploadContentImages";
import CheckBox from "@/shared/ui/CheckBox";
import SelectButtonMedium from "@/shared/ui/SelectButton/SelectButtonMedium";
import { SelectedAddress } from "./types";
import { DEFAULT_VALUE, schema, ValidateSchema } from "./schema";
import { LocationEntity } from "@/shared/types/api/content/LocationEntity";
import { compressImage } from "@/shared/helpers/compressImage";
import DefaultImg from "@/shared/ui/DefaultImg";
import { findIdxByName } from "./_util/findIdxByName";
import { findIdxsByNames } from "./_util/findIdxsByNames";

enum AnalyzeType {
  SIMILAR = "SIMILAR",
  EXACT = "EXACT",
}

const MAX_IMAGES_COUNT = 10;
const CONDITIONS = ["입장료", "예약", "반려동물", "주차"];

export default function Page() {
  const searchParam = useSearchParams();
  const isSearchModalOpen = searchParam.get("isSearchModalOpen");

  const [uploadedImgs, setUploadedImgs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadContentImages } = useUploadContentImages({
    onSuccess: ({ data }) => {
      const newData = data.map(({ filePath }) => filePath);

      setUploadedImgs([...uploadedImgs, ...newData]);
      setValue("imgList", [...uploadedImgs, ...newData]);
      trigger("imgList");
    },
  });

  const pathname = usePathname();
  const router = useRouter();
  const [detailAddress, setDetailAddress] = useState("");
  const [currentScroll, setCurrentScroll] = useState(0);
  const [address, setAddress] = useState<LocationEntity>();
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>();

  const methods = useForm<ValidateSchema>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(schema),
  });

  const { formState, watch, register, setValue, getValues, trigger } = methods;

  const { mutate: createContent, status: createContentStatus } =
    useCreateContent({
      onSuccess: ({ data }) => {
        //router.replace(`/requested-contents/${data.idx}`);
      },
    });

  const [isStyleDrawerOpen, setIsStyleDrawerOpen] = useState(false);
  const [isAgeDrawerOpen, setIsAgeDrawerOpen] = useState(false);
  const [isGenreDrawerOpen, setIsGenreDrawerOpen] = useState(false);
  const [isStartDateDrawerOpen, setIsStartDateDrawerOpen] = useState(false);
  const [isEndDateDrawerOpen, setIsEndDateDrawerOpen] = useState(false);

  const [tempStyles, setTempStyles] = useState<string[]>([]);
  const [tempStartDate, setTempStartDate] = useState<string>();
  const [tempEndDate, setTempEndDate] = useState<string>();

  const thisYear = new Date().getFullYear() - 1;

  const handleClickSearchAddress = () => {
    setCurrentScroll(
      Math.max(document.body.scrollTop, document.documentElement.scrollTop)
    );

    new (window as any).daum.Postcode({
      oncomplete: function ({ address }: SelectedAddress) {
        document.body.scrollTop = currentScroll;

        if (geocoder) {
          geocoder.addressSearch(
            address,
            (res, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const {
                  address_name,
                  b_code,
                  h_code,
                  region_1depth_name,
                  region_2depth_name,
                  x,
                  y,
                } = res[0].address;

                setDetailAddress(address);
                setValue("address", address);
                setAddress({
                  detailAddress: "",
                  address: address_name,
                  bCode: b_code,
                  hCode: h_code,
                  region1Depth: region_1depth_name,
                  region2Depth: region_2depth_name,
                  positionX: +x,
                  positionY: +y,
                });
              } else {
                customToast("알 수 없는 에러가 발생했습니다.");
              }
            },
            {
              page: 1,
              size: 1,
              analyze_type: AnalyzeType.EXACT,
            }
          );
        }

        router.replace(pathname);
      },
      width: "100%",
      height: "100%",
    }).embed("search-list");

    router.replace(`${pathname}?isSearchModalOpen=true`);
  };

  useEffect(() => {
    const $mapScript = document.createElement("script");
    $mapScript.async = false;
    $mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild($mapScript);

    const onLoadMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        setGeocoder(geocoder);
      });
    };

    $mapScript.addEventListener("load", onLoadMap);
  }, []);

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="컨텐츠 등록 요청" />
        <HeaderRight
          option={{
            check: {
              disabled: !formState.isValid,
              onClick: () => {
                if (["success", "pending"].includes(createContentStatus))
                  return;

                const {
                  age,
                  style,
                  genre,
                  condition,
                  title,
                  openTime,
                  websiteLink,
                  description,
                  startDate,
                  endDate,
                  imgList,
                } = getValues();
                const genreIdx = findIdxByName(GENRES, genre);
                const ageIdx = findIdxByName(AGES, age);
                const styleIdxList = findIdxsByNames(STYLES, style);

                if (address && genreIdx && ageIdx && styleIdxList) {
                  createContent({
                    isPet: condition.includes("반려동물"),
                    isFee: condition.includes("입장료"),
                    isParking: condition.includes("주차"),
                    isReservation: condition.includes("예약"),
                    genreIdx,
                    ageIdx,
                    styleIdxList: styleIdxList as number[],
                    title,
                    openTime,
                    websiteLink,
                    description,
                    startDate: startDate.replace(/\./g, "-"),
                    endDate: endDate.replace(/\./g, "-"),
                    imgList: imgList,
                    location: {
                      ...address,
                      detailAddress: getValues("additional-address"),
                    },
                  });
                }
              },
            },
          }}
        />
      </Header>
      <main>
        <form
          className={classNames(`mt-[16px]`, !!isSearchModalOpen && "hidden")}
        >
          <div className="mx-[24px]">
            <div>
              <InputLabel
                maxLength={40}
                htmlFor="title"
                currentLength={watch("title").length}
              >
                컨텐츠명<span className="text-top">*</span>
              </InputLabel>
              <BasicInput
                field="title"
                maxLength={40}
                placeholder="컨텐츠명을 입력해주세요."
                formState={formState}
                register={register}
              />
            </div>
          </div>
          <Divider width="100%" height="8px" margin="34px 0" />
          <div className="mx-[24px]">
            <div className="flex-1 mb-[34px]">
              <InputLabel htmlFor="genre">
                장르<span className="text-top">*</span>
              </InputLabel>
              <InputButton
                text={watch("genre")}
                placeholder="장르를 선택해주세요."
                onClick={() => setIsGenreDrawerOpen(true)}
              />
            </div>
            <div>
              <InputLabel htmlFor="address">
                주소<span className="text-top">*</span>
              </InputLabel>
              <InputButton
                text={detailAddress}
                placeholder="주소를 검색해주세요."
                subButtonText="주소 검색"
                onClick={handleClickSearchAddress}
              />
            </div>
            <div className="mb-[34px]">
              <BasicInput
                field="additional-address"
                placeholder="상세주소를 입력해주세요. (필수)"
                register={register}
                formState={formState}
              />
            </div>
            <div className="mb-[34px]">
              <InputLabel htmlFor="age">
                연령대<span className="text-top">*</span>
              </InputLabel>
              <InputButton
                text={watch("age")}
                placeholder="연령대를 선택해주세요."
                onClick={() => setIsAgeDrawerOpen(true)}
              />
            </div>
            <div>
              <InputLabel htmlFor="style">
                스타일<span className="text-top">*</span>
              </InputLabel>
              <InputButton
                text={watch("style").join(", ")}
                placeholder="스타일을 선택해주세요."
                onClick={() => setIsStyleDrawerOpen(true)}
              />
            </div>
          </div>
          <Divider width="100%" height="8px" margin="24px 0 0" />
          <div className="mx-[24px]">
            <div className="flex justify-between flex-wrap mb-[34px]">
              <div className="mt-[16px]">
                <InputLabel htmlFor="open-date">
                  오픈날짜<span className="text-top">*</span>
                </InputLabel>
                <div className="mt-[12px]">
                  <SelectButtonMedium
                    text={getValues("startDate")}
                    placeholder="날짜 선택"
                    onClick={() => setIsStartDateDrawerOpen(true)}
                    Icon={<CalendarIcon />}
                  />
                </div>
              </div>
              <div className="mt-[16px]">
                <InputLabel htmlFor="close-date">
                  종료날짜<span className="text-top">*</span>
                </InputLabel>
                <div className="mt-[12px]">
                  <SelectButtonMedium
                    text={getValues("endDate")}
                    placeholder="날짜 선택"
                    onClick={() => setIsEndDateDrawerOpen(true)}
                    Icon={<CalendarIcon />}
                  />
                </div>
              </div>
            </div>
            <div className="mb-[34px]">
              <InputLabel
                htmlFor="openTime"
                maxLength={40}
                currentLength={watch("openTime").length}
              >
                오픈시간<span className="text-top">*</span>
              </InputLabel>
              <BasicInput
                field="openTime"
                formState={formState}
                maxLength={40}
                register={register}
                placeholder="평일 오후 2시 ~ 오후 9시 / 주말 오후 2시 ~ 오후 7시"
              />
            </div>
            <div className="mb-[34px]">
              <InputLabel
                htmlFor="websiteLink"
                maxLength={2000}
                currentLength={watch("websiteLink").length}
              >
                웹사이트<span className="text-top">*</span>
              </InputLabel>
              <BasicInput
                field="websiteLink"
                maxLength={2000}
                placeholder="https://liket.site"
                register={register}
                formState={formState}
              />
            </div>
            <div className="flex justify-between">
              {CONDITIONS.map((item) => {
                const isChecked = watch("condition").some(
                  (condition) => condition === item
                );

                return (
                  <CheckBox
                    key={item}
                    isChecked={isChecked}
                    size="12px"
                    label={item}
                    onChange={() => {
                      if (isChecked) {
                        const newCondition = getValues("condition").filter(
                          (condition) => condition !== item
                        );

                        setValue("condition", newCondition);
                      } else {
                        setValue("condition", [
                          ...getValues("condition"),
                          item,
                        ]);
                      }
                    }}
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
              currentLength={uploadedImgs.length}
            >
              사진<span className="text-top">*</span>
            </InputLabel>
            <ScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] mt-[8px]">
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden grow"
                onChange={async (e) => {
                  const uploadedFileCount = e.target.files?.length || 0;
                  if (
                    uploadedImgs.length + uploadedFileCount >
                    MAX_IMAGES_COUNT
                  ) {
                    customToast("이미지는 최대 10개까지만 업로드 가능합니다.");

                    return;
                  }

                  if (e.target.files) {
                    const formData = new FormData();

                    for (let i = 0; i < e.target.files.length; i++) {
                      formData.append(
                        "files",
                        await compressImage(e.target.files[i])
                      );
                    }

                    uploadContentImages(formData);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  inputRef.current && inputRef.current.click();
                }}
                className="center w-[96px] h-[96px] bg-grey-01 shrink-0"
                aria-label="이미지 업로드 버튼"
              >
                <CreateIcon color="#fff" />
              </button>
              {uploadedImgs.map((filePath) => {
                return (
                  <div
                    key={filePath}
                    className="w-[96px] h-[96px] relative shrink-0"
                  >
                    <DefaultImg src={filePath} alt="업로드된 이미지" />
                    <button
                      type="button"
                      aria-label="현재 선택된 이미지 삭제"
                      className="absolute right-[8px] top-[8px]"
                      onClick={() => {
                        const newImgList = uploadedImgs.filter(
                          (targetFilePath) => targetFilePath !== filePath
                        );

                        setUploadedImgs(newImgList);
                        setValue("imgList", newImgList);
                        trigger("imgList");
                      }}
                    >
                      <DeleteIcon width="24px" height="24px" />
                    </button>
                  </div>
                );
              })}
            </ScrollContainer>
          </div>
          <Divider width="100%" height="8px" margin="16px 0" />
          <div className="px-[24px]">
            <div>
              <InputLabel
                htmlFor="description"
                maxLength={1000}
                currentLength={watch("description").length}
              >
                상세정보<span className="text-top">*</span>
              </InputLabel>
              <TextareaAutosize
                maxLength={1000}
                placeholder="컨텐츠 소개나 이벤트 등에 대해 작성해주세요."
                className="w-[100%] mb-[34px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0"
                {...register("description")}
              />
            </div>
          </div>
        </form>
      </main>
      <Drawer
        open={isStyleDrawerOpen}
        onClose={() => {
          setIsStyleDrawerOpen(false);
          setTempStyles(getValues("style"));
        }}
      >
        <div className="center text-h2">스타일</div>
        <ul className="my-[16px] w-[100%] flex px-[34px] flex-wrap gap-[8px]">
          {STYLES.map(({ name, idx }) => {
            return (
              <li key={idx}>
                <Chip
                  isSelected={tempStyles.some((style) => style === name)}
                  onClick={() => {
                    let newStyles = null;

                    if (tempStyles.some((style) => style === "")) {
                      tempStyles.pop();
                    }

                    if (tempStyles.some((style) => style === name)) {
                      newStyles = tempStyles.filter((style) => style !== name);
                    } else {
                      newStyles = [...tempStyles, name];
                    }

                    if (newStyles.length >= 4) {
                      customToast("스타일은 최대 3개까지 선택할 수 있습니다.");
                      return;
                    }

                    setTempStyles(newStyles);
                  }}
                >
                  {name}
                </Chip>
              </li>
            );
          })}
        </ul>
        <div className="flex px-[24px] pb-[8px]">
          <Button
            className="h-[48px] w-[100%]"
            onClick={() => {
              if (tempStyles.length > 3) {
                customToast("스타일은 최대 3개까지 선택할 수 있습니다.");
                return;
              }

              setValue("style", tempStyles);
              setIsStyleDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </Drawer>
      <Drawer open={isAgeDrawerOpen} onClose={() => setIsAgeDrawerOpen(false)}>
        <div className="center text-h2">연령대</div>
        <ul>
          {AGES.map(({ idx, name }) => (
            <li className="bottom-sheet-list" key={idx}>
              <ButtonBase
                onClick={() => {
                  setValue("age", name);
                  setIsAgeDrawerOpen(false);
                }}
                className={classNames(
                  "bottom-sheet-button flex justify-start px-[24px]",
                  watch("age") === name ? "text-skyblue-01 text-body1" : ""
                )}
              >
                {name}
              </ButtonBase>
            </li>
          ))}
        </ul>
      </Drawer>
      <Drawer
        open={isGenreDrawerOpen}
        onClose={() => setIsGenreDrawerOpen(false)}
      >
        <div className="center text-h2">장르</div>
        <ul>
          {GENRES.map(({ idx, name }) => (
            <li className="bottom-sheet-list" key={idx}>
              <ButtonBase
                onClick={() => {
                  setValue("genre", name);
                  setIsGenreDrawerOpen(false);
                }}
                className={classNames(
                  "bottom-sheet-button flex justify-start px-[24px]",
                  watch("genre") === name ? "text-skyblue-01 text-body1" : ""
                )}
              >
                {name}
              </ButtonBase>
            </li>
          ))}
        </ul>
      </Drawer>
      <Drawer
        open={isStartDateDrawerOpen}
        onClose={() => {
          setIsStartDateDrawerOpen(false);
        }}
      >
        <DateCalendar
          value={dayjs(tempStartDate)}
          onChange={(date) =>
            setTempStartDate(dayjs(date).format("YYYY.MM.DD").toString())
          }
        />
        <div className="flex pb-[8px] px-[24px]">
          <Button
            className="h-[48px] w-[100%]"
            onClick={() => {
              tempStartDate && setValue("startDate", tempStartDate.toString());
              setIsStartDateDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </Drawer>
      <Drawer
        open={isEndDateDrawerOpen}
        onClose={() => {
          setIsEndDateDrawerOpen(false);
        }}
      >
        <DateCalendar
          value={dayjs(tempEndDate)}
          onChange={(date) =>
            setTempEndDate(dayjs(date).format("YYYY.MM.DD").toString())
          }
        />
        <div className="flex pb-[8px] px-[24px]">
          <Button
            className="h-[48px] w-[100%]"
            onClick={() => {
              tempEndDate && setValue("endDate", tempEndDate);
              setIsEndDateDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </Drawer>
      <div
        className="full-modal"
        style={{
          transform: !!isSearchModalOpen ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <Header>
          <HeaderLeft
            option={{
              back: {
                onClick: () => router.replace("/create/content"),
              },
            }}
          />
          <HeaderMiddle text="주소 검색" />
        </Header>
        <div className="full-modal-main">
          <div id="search-list" className="flex grow h-[100%] mx-[24px]"></div>
        </div>
      </div>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
    </>
  );
}
