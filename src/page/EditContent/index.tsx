import CreateContentTemplate from "@/widgets/content/CreateContentTemplate";
import { useGetCultureContentByIdx } from "./hooks/useGetCultureContentByIdx";
import { useEditContent } from "./hooks/useEditContent";
import { getContentConditions } from "@/widgets/content/CreateContentTemplate/_util/helper";
import dayjs from "dayjs";

interface PageProps {
  idx: string;
}

export default function EditContentPage({ idx }: PageProps) {
  const { data } = useGetCultureContentByIdx(Number(idx));
  const { mutate: editContent, status } = useEditContent({ idx: Number(idx) });

  if (!data) {
    return <></>;
  }

  return (
    <CreateContentTemplate
      {...data}
      address={data.location.address}
      detailAddress={data.location.detailAddress || ""}
      condition={getContentConditions({
        isParking: data.isParking,
        isPet: data.isPet,
        isFee: data.isFee,
        isReservation: data.isReservation,
      })}
      genre={data.genre.name || ""}
      age={data.age.name || ""}
      style={data.style.map(({ name }) => name)}
      openTime={data.openTime || ""}
      websiteLink={data.websiteLink || ""}
      description={data.description || ""}
      startDate={dayjs(data.startDate).format("YYYY.MM.DD")}
      endDate={data.endDate ? dayjs(data?.endDate).format("YYYY.MM.DD") : ""}
      createContentStatus={status}
      upsertContent={(data) => editContent(data)}
    />
  );
}
