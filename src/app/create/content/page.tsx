"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import ScrollContainer from "react-indiana-drag-scroll";
import { z } from "zod";
import DeleteIcon from "@/icons/circle-cross.svg";
import CreateIcon from "@/icons/create.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CalendarIcon from "@/icons/calendar.svg";
import { ButtonBase, TextareaAutosize } from "@mui/material";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import Script from "next/script";
import { useCreateContent } from "./_hooks/useCreateContent";
import { useGetContentDetail } from "./_hooks/useGetContentDetail";
import { useEditContent } from "./_hooks/useEditContent";
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
import { findIdxsByNames } from "./_util/findIdxsByNames";
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

enum AnalyzeType {
  SIMILAR = "SIMILAR",
  EXACT = "EXACT",
}

const MAX_IMAGES_COUNT = 10;
const CONDITIONS = ["입장료", "예약", "반려동물", "주차"];

const schema = z.object({
  title: z.string().min(1, "필수로 입력돼야합니다."),
  genre: z.string().min(1, "필수로 입력돼야합니다."),
  address: z.string().min(1, "필수로 입력돼야합니다."),
  age: z.string().min(1, "필수로 입력돼야합니다."),
  style: z.array(z.string()),
  "additional-address": z.string().min(1, "필수로 입력돼야합니다."),
  openTime: z.string().min(1, "필수로 입력돼야합니다."),
  websiteLink: z.string().min(1, "필수로 입력돼야합니다."),
  condition: z.array(z.string()),
  description: z.string().min(1, "필수로 입력돼야합니다."),
  startDate: z.string().min(1, "필수로 입력돼야합니다."),
  endDate: z.string().min(1, "필수로 입력돼야합니다."),
  imgList: z.array(z.string()).min(1, "이미지가 최소 하나 이상 필요합니다."),
});

export default function Page() {
  const searchParam = useSearchParams();
  const editedContentIdx = searchParam.get("idx");
  const { data: contentDetail, isFetched } = useGetContentDetail({
    idx: editedContentIdx,
    queryKey: ["requested-content-detail", editedContentIdx],
    enabled: !!editedContentIdx,
  });
  const { mutate: editContent } = useEditContent({
    idx: editedContentIdx,
    onSuccess: () => {
      router.replace("/requested-contents/" + editedContentIdx);
    },
  });

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
  const [addressInformation, setAddressInformation] = useState<{
    detailAddress: string;
    address: string;
    region1Depth: string;
    region2Depth: string;
    positionX: number;
    positionY: number;
    hCode: string;
    bCode: string;
  }>();
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>();

  const methods = useForm<{
    title: string;
    genre: string;
    address: string;
    age: string;
    style: string[];
    "additional-address": string;
    openTime: string;
    websiteLink: string;
    condition: string[];
    description: string;
    startDate: string;
    endDate: string;
    imgList: string[];
  }>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      genre: "",
      address: "",
      age: "",
      style: [],
      "additional-address": "",
      openTime: "",
      websiteLink: "",
      condition: [],
      description: "",
      startDate: "",
      endDate: "",
      imgList: [],
    },
    resolver: zodResolver(schema),
  });

  const { formState, watch, register, setValue, getValues, trigger } = methods;
  const isSearchModalOpen = searchParam.get("isSearchModalOpen");
  const { mutate: createContent } = useCreateContent({
    onSuccess: ({ data }) => {
      router.replace(`/requested-contents/${data.idx}`);
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });

  const [isStyleSelectionDrawerOpen, setIsStyleSelectionDrawerOpen] =
    useState(false);
  const [isAgeRangeSelectionDrawerOpen, setIsAgeRangeSelectionDrawerOpen] =
    useState(false);
  const [isGenreSelectionDrawerOpen, setIsGenreSelectionDrawerOpen] =
    useState(false);
  const [isStartDateSelectionDrawerOpen, setIsStartDateSelectionDrawerOpen] =
    useState(false);
  const [isEndDateSelectionDrawerOpen, setIsEndDateSelectionDrawerOpen] =
    useState(false);

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
                setAddressInformation({
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

        router.back();
        router.back();
      },
      width: "100%",
      height: "100%",
    }).embed("search-list");

    router.push(`${pathname}?isSearchModalOpen=true`);
  };

  useEffect(() => {
    if (contentDetail && isFetched) {
      const {
        title,
        genre,
        location,
        startDate,
        endDate,
        age,
        style,
        openTime,
        websiteLink,
        description,
        isFee,
        isParking,
        isPet,
        isReservation,
        imgList,
      } = contentDetail;

      const condition = ["에약", "주차", "입장료", "반려동물"].reduce(
        (prev, cur) => {
          if (prev.length === 1 && prev[0] === "") {
            prev.pop();
          }

          if (cur === "예약" && isReservation) {
            prev.push("예약");
          }

          if (cur === "주차" && isParking) {
            prev.push("주차");
          }

          if (cur === "반려동물" && isPet) {
            prev.push("반려동물");
          }

          if (cur === "입장료" && isFee) {
            prev.push("입장료");
          }

          return prev;
        },
        [""]
      );
      setValue("address", location.address);
      setValue("title", title);
      setValue("genre", genre.name);
      setValue("additional-address", location.detailAddress);
      setValue("description", description);
      setValue("age", age.name);
      setValue("startDate", formateDate(startDate));
      setValue("endDate", formateDate(endDate));
      setValue(
        "style",
        style.map(({ name }) => name)
      );
      setValue("openTime", openTime);
      setValue("websiteLink", websiteLink);
      setValue("condition", condition);

      setDetailAddress(location.address);
      setAddressInformation(location);
      setUploadedImgs([...imgList]);
      setValue("imgList", [...imgList]);
      trigger();
    }
  }, [contentDetail, isFetched, setValue]);

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

                if (addressInformation && genreIdx && ageIdx && styleIdxList) {
                  const finalDataToSave = {
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
                      ...addressInformation,
                      detailAddress: getValues("additional-address"),
                    },
                  };
                  // editedContentIdx
                  //   ? editContent(finalDataToSave)
                  //   : createContent(finalDataToSave);
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
                onClick={() => setIsGenreSelectionDrawerOpen(true)}
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
                onClick={() => setIsAgeRangeSelectionDrawerOpen(true)}
              />
            </div>
            <div>
              <InputLabel htmlFor="style">
                스타일<span className="text-top">*</span>
              </InputLabel>
              <InputButton
                text={watch("style").join(", ")}
                placeholder="스타일을 선택해주세요."
                onClick={() => setIsStyleSelectionDrawerOpen(true)}
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
                    onClick={() => setIsStartDateSelectionDrawerOpen(true)}
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
                    onClick={() => setIsEndDateSelectionDrawerOpen(true)}
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
                placeholder="요일별 오픈시간을 입력해주세요."
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
                placeholder="URL을 입력해주세요."
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
                onChange={(e) => {
                  if (uploadedImgs.length > MAX_IMAGES_COUNT) {
                    customToast("이미지는 최대 10개까지만 업로드 가능합니다.");

                    return;
                  }

                  if (e.target.files) {
                    const formData = new FormData();

                    for (let i = 0; i < e.target.files.length; i++) {
                      formData.append("files", e.target.files[i]);
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
                  <li
                    key={filePath}
                    className="w-[96px] h-[96px] relative shrink-0"
                  >
                    <Image
                      src={process.env.NEXT_PUBLIC_IMAGE_SERVER + filePath}
                      fill
                      alt="업로드된 이미지"
                    />
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
                  </li>
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
        open={isStyleSelectionDrawerOpen}
        onClose={() => {
          setIsStyleSelectionDrawerOpen(false);
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
              setValue("style", tempStyles);
              setIsStyleSelectionDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </Drawer>
      <Drawer
        open={isAgeRangeSelectionDrawerOpen}
        onClose={() => setIsAgeRangeSelectionDrawerOpen(false)}
      >
        <div className="center text-h2">연령대</div>
        <ul>
          {AGES.map(({ idx, name }) => (
            <li className="bottom-sheet-list" key={idx}>
              <ButtonBase
                onClick={() => {
                  setValue("age", name);
                  setIsAgeRangeSelectionDrawerOpen(false);
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
        open={isGenreSelectionDrawerOpen}
        onClose={() => setIsGenreSelectionDrawerOpen(false)}
      >
        <div className="center text-h2">장르</div>
        <ul>
          {GENRES.map(({ idx, name }) => (
            <li className="bottom-sheet-list" key={idx}>
              <ButtonBase
                onClick={() => {
                  setValue("genre", name);
                  setIsGenreSelectionDrawerOpen(false);
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
        open={isStartDateSelectionDrawerOpen}
        onClose={() => {
          setTempStartDate(getValues("startDate"));
          setIsStartDateSelectionDrawerOpen(false);
        }}
      >
        <DateCalendar
          value={dayjs(tempStartDate)}
          onChange={(date) =>
            setTempStartDate(dayjs(date).format("YYYY.MM.DD").toString())
          }
          minDate={dayjs(`${dayjs().year() - 100}`)}
          maxDate={tempEndDate ? dayjs(tempEndDate) : dayjs()}
        />
        <div className="flex pb-[8px] px-[24px]">
          <Button
            className="h-[48px] w-[100%]"
            onClick={() => {
              tempStartDate && setValue("startDate", tempStartDate.toString());
              setIsStartDateSelectionDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </Drawer>
      <Drawer
        open={isEndDateSelectionDrawerOpen}
        onClose={() => {
          setTempEndDate(getValues("endDate"));
          setIsEndDateSelectionDrawerOpen(false);
        }}
      >
        <DateCalendar
          value={dayjs(tempEndDate)}
          onChange={(date) =>
            setTempEndDate(dayjs(date).format("YYYY.MM.DD").toString())
          }
          minDate={
            tempStartDate ? dayjs(tempStartDate) : dayjs(`${thisYear - 100}`)
          }
          maxDate={dayjs(new Date())}
        />
        <div className="flex pb-[8px] px-[24px]">
          <Button
            className="h-[48px] w-[100%]"
            onClick={() => {
              tempEndDate && setValue("endDate", tempEndDate);
              setIsEndDateSelectionDrawerOpen(false);
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
                onClick: () => router.back(),
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
