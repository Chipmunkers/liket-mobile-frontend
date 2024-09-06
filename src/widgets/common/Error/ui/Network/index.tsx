import CustomError from "@/shared/ui/CustomError";

const NetworkError = () => {
  return (
    <CustomError
      title="네트워크 연결이 끊겼습니다."
      text1="네트워크 연결 상태 확인 후"
      text2="다시 시도해주세요."
      // TODO: 오른쪽 버튼 "다시 시도"로 변경해야함
    />
  );
};

export default NetworkError;
