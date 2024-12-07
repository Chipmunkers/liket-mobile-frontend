import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { getNoticeDetail } from "../_services/getNoticeDetail";
import dayjs from "dayjs";

export default async function Page({ idx }: { idx: string }) {
  const { title, contents, createdAt } = await getNoticeDetail(idx);

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="공지사항" />
      </Header>
      <main className="px-[24px]">
        <div className="flex flex-col justify-center gap-[8px] pt-[8px] pb-[6px] border-b border-grey-01">
          <div className="text-body2">{title}</div>
          <div className="text-body5 text-grey-03">
            {dayjs(createdAt).format("YYYY.MM.DD HH:mm")}
          </div>
          <div className="py-[16px] border-b border-grey-01">{contents}</div>
        </div>
      </main>
    </>
  );
}
