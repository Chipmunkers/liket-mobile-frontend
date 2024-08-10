import { ResponseError } from "@/types/api";
import { Location } from "@/types/content";
import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Payload {
  imgList: string[];
  genreIdx: number;
  ageIdx: number;
  styleIdxList: number[];
  title: string;
  location: Location;
  description: string;
  websiteLink: string;
  startDate: string;
  endDate: string;
  openTime: string;
  isFee: boolean;
  isReservation: boolean;
  isPet: boolean;
  isParking: boolean;
}

export const useCreateContent = (
  props: UseMutationOptions<AxiosResponse, ResponseError, Payload>
) => {};
