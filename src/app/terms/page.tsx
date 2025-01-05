import { getTosAll } from "./_hooks/getTosAll";
import TosItem from "./_ui/TosItem";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";

export default async function Page() {
  const { tosList } = await getTosAll();

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text="약관/정책" />
      </Header>
      <main>
        {tosList.map((tos) => (
          <TosItem tos={tos} key={tos.idx} />
        ))}
      </main>
    </>
  );
}
