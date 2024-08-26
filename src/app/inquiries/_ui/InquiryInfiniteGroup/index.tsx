import InquiryCardSmall from "@/entities/inquiry/InquiryCardSmall";
import { useGetInquiries } from "./hooks/useGetInquiries";

const InquiryInfiniteGroup = () => {
  const { data, setTarget } = useGetInquiries();

  return (
    <ul className="w-[100%] px-[24px] flex flex-col">
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
