"use client";

import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import ProfileForm from "./_ui/ProfileForm";

export default function Page() {
  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="프로필" />
      </Header>
      <main>
        <ProfileForm />
      </main>
    </>
  );
}
