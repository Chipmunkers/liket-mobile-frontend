import { getTosList } from "@/apis/terms";
import Header from "@/components/Header";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import TosItem from "./components/TosItem";

export default async function Page() {
  const { tosList } = await getTosList();

  return (
    <>
      <Header>
        <LeftOption
          option={{
            back: true,
          }}
        />
        <MiddleText text="약관/정책" />
      </Header>
      <main>
        {tosList.map((tos) => (
          <TosItem tos={tos} />
        ))}
      </main>
    </>
  );
}
