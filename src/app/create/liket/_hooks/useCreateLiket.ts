import { useMutation } from "@tanstack/react-query";
import { CreateLiketPayload } from "../types";

const useCreateLiket = () =>
  useMutation({
    mutationFn: async ({
      shapes,
      cardImageSrc,
      cardSize,
      cardImageInformation,
    }: CreateLiketPayload) => {},
  });

export default useCreateLiket;
