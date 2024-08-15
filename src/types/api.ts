import { AxiosError } from "axios";

export type ResponseError = AxiosError<{
  error: string;
  message: string[];
  statusCode: number;
  cause?: string;
}>;
