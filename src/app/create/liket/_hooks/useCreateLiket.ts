import { Stage } from "konva/lib/Stage";
import { useState, useRef } from "react";

const useCreateLiket = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement>();
  const [review, setReview] = useState("");
  const [isFront, setIsFront] = useState(true);
  const stageRef = useRef<Stage>(null);
  const [isTextEnteringOnBackSide, setIsTextEnteringOnBackSide] =
    useState(false);

  const handleClickBackTextEnteringClose = () =>
    setIsTextEnteringOnBackSide(false);

  const handleClickWriteReview = () => setIsTextEnteringOnBackSide(true);

  const handleClickBackTextEnteringCheck = (text: string) => {
    setReview(text);
    setIsTextEnteringOnBackSide(false);
  };

  const handleClickSwitchFrontBack = () => setIsFront(!isFront);

  const handleUploadImage = (imageElement: HTMLImageElement) =>
    setUploadedImage(imageElement);

  return {
    uploadedImage,
    review,
    stageRef,
    isTextEnteringOnBackSide,
    isFront,
    handleUploadImage,
    handleClickWriteReview,
    handleClickBackTextEnteringCheck,
    handleClickBackTextEnteringClose,
    handleClickSwitchFrontBack,
  };
};

export default useCreateLiket;
