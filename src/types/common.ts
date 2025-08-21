export interface IMeta {
  limit?: number;
  page?: number;
  size?: number;
}

export type ResponseSuccessType = {
  data: unknown;
  meta?: IMeta;
};

export type ResponseErrorType = {
  statusCode?: number;
  message?: string;
  errorMessage?: IResponseErrorType[];
};

export type IResponseErrorType = {
  path: string | number;
  message: string;
};
