import InquiryCardSmall from "@/entities/inquiry/InquiryCardSmall";
import { useGetInquiries } from "./hooks/useGetInquiries";
import InquiryGroupSkeleton from "./ui/InquiryGroupSkeleton";

const InquiryInfiniteGroup = () => {
  const { data, setTarget } = useGetInquiries();

  return (
    <ul className="w-[100%] px-[24px] flex flex-col">
      {/* 스켈레톤 UI */}
      {!data && <InquiryGroupSkeleton />}

      {/* 문의 없을 때 */}
      {!data?.pages[0].inquiryList[0] && (
        <div className="absolute text-body3 text-grey-03 top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]">
          문의내역이 없습니다.
        </div>
      )}

      {/* 문의 있을 때 */}
      {data &&
        data.pages
          .map((page) => page.inquiryList)
          .flat()
          .map((inquiry) => (
            <InquiryCardSmall inquiry={inquiry} key={inquiry.idx} />
          ))}
      <div ref={setTarget}></div>
    </ul>
  );
};

export default InquiryInfiniteGroup;
