export type userMetaProps = {
  _id: string;
};

export interface QueryApiResponse<T, E = any> {
  data: T;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  error: E;
}
