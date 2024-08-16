import { getTosItem } from "@/apis/terms";
import Header from "@/components/Header";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";

interface PageProps {
  params: {
    idx: number;
  };
}

export default async function Page({ params: { idx } }: PageProps) {
  const { title, contents } = await getTosItem(idx);
  return (
    <>
      <Header>
        <LeftOption
          option={{
            back: true,
          }}
        />
        <MiddleText text={title} />
      </Header>
      <main>{contents}</main>
    </>
  );
}
