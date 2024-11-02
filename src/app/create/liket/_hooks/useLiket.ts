import { Stage } from "konva/lib/Stage";
import { useState, useRef } from "react";

const useLiket = () => {
  const [description, setDescription] = useState("");
  const [isFront, setIsFront] = useState(true);
  const stageRef = useRef<Stage>(null);
  const [isTextEnteringOnBackSide, setIsTextEnteringOnBackSide] =
    useState(false);

  const handleClickBackTextEnteringClose = () =>
    setIsTextEnteringOnBackSide(false);

  const handleClickWriteReview = () => setIsTextEnteringOnBackSide(true);

  const handleClickBackTextEnteringCheck = (text: string) => {
    setDescription(text);
    setIsTextEnteringOnBackSide(false);
  };

  const handleClickSwitchFrontBack = () => setIsFront(!isFront);

  return {
    description,
    stageRef,
    isTextEnteringOnBackSide,
    isFront,
    handleClickWriteReview,
    handleClickBackTextEnteringCheck,
    handleClickBackTextEnteringClose,
    handleClickSwitchFrontBack,
  };
};

export default useLiket;
