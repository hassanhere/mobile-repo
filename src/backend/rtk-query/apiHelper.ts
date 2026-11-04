import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '~redux';
import { BaseUrl } from '../Config';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { clearUserData, setToken } from '~redux/slices/user';
import { ErrorMessage } from '~utils';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: async (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.user?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: async (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.user?.refreshToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

type RefreshQueryResult = Awaited<ReturnType<typeof refreshBaseQuery>>;

let refreshPromise: Promise<RefreshQueryResult> | null = null;

export const baseApiQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const err = result?.error as
    | {
        status: number | string;
        data?: { statusCode?: number; message?: string };
      }
    | undefined;

  if (err) {
    const status = err.status;

    const isUnauthorized =
      status === 401 ||
      status === 403 ||
      err.data?.statusCode === 401 ||
      err.data?.statusCode === 403;

    if (isUnauthorized) {
      const state = api.getState() as RootState;
      const refreshToken = state.user?.refreshToken;

      if (!refreshToken) {
        api.dispatch(clearUserData());
        ErrorMessage('Unauthorized User');
        return result;
      }

      try {
        if (!refreshPromise) {
          refreshPromise = Promise.resolve(
            refreshBaseQuery(
              {
                url: 'auth/refresh',
                method: 'POST',
                body: { refreshToken: refreshToken },
              },
              api,
              extraOptions,
            ),
          ).finally(() => {
            refreshPromise = null;
          });
        }

        const refreshResult = await refreshPromise;

        if (refreshResult?.data) {
          const refreshData = (refreshResult as any)?.data;

          if (refreshData?.token && refreshData?.refreshToken) {
            api.dispatch(setToken(refreshData));
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            api.dispatch(clearUserData());
            ErrorMessage('Unauthorized User');
          }
        } else {
          api.dispatch(clearUserData());
          ErrorMessage('Unauthorized User');
        }
      } catch {
        api.dispatch(clearUserData());
        ErrorMessage('Unauthorized User');
      }
    } else if (status === 'FETCH_ERROR' || status === 'TIMEOUT_ERROR') {
      // Network-level failure — capture as exception
    } else if (typeof status === 'number' && status >= 500) {
      // Server-side error — capture as exception
    } else if (typeof status === 'number' && status >= 400) {
      // Client-side error (400, 404, 422 etc.) — capture as warning message
    }
  }

  return result;
};
