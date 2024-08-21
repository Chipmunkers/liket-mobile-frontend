import { AxiosError } from "axios";

/**
 * @deprecated
 */
export type ResponseError = AxiosError<{
  error: string;
  message: string[];
  statusCode: number;
  cause?: string;
}>;
