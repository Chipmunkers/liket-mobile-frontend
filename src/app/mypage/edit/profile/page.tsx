"use client";

import customToast from "@/shared/helpers/customToast";
import { useEditProfile } from "./_hooks/useEditProfile";
import profileStore from "@/stores/profileStore";
import DevIng from "@/widgets/common/DevIng";

export default function Page() {
  const { mutate } = useEditProfile({
    onSuccess: () => {
      customToast("저장되었습니다");
    },
  });

  const { nickname, profileImgPath, gender, birth } = profileStore(
    ({ nickname, gender, birth, profileImgPath }) => ({
      nickname,
      gender,
      birth,
      profileImgPath,
    })
  );

  return <DevIng />;

  // const handleClickNextButton = ({ file, nickname, gender, birth }) => {
  //   const formData = new FormData();
  //   formData.append("profileImg", file);
  //   formData.append("nickname", nickname);
  //   formData.append("gender", gender);
  //   formData.append("birth", birth);

  //   mutate({ profileImg: file, nickname, gender, birth });
  // };

  // return (
  //   <>
  //     <Header>
  //       <Header.LeftOption option={{ back: true }} />
  //       <Header.MiddleText text="프로필" />
  //     </Header>
  //     <main>
  //       <ProfileForm
  //         currentFormInformation={{
  //           nickname,
  //           gender: "" + gender,
  //           birth: "" + birth,
  //           file: profileImgPath,
  //         }}
  //         nextButtonText="저장하기"
  //         onClickNextButton={() => {}}
  //       />
  //     </main>
  //   </>
  // );
}
