import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, Method } from 'axios'

export interface IParamBase {
  authen?: string
  page?: number | string
  limit?: number | string
  id?: number | string
}

const { CancelToken } = axios
const source = CancelToken.source()

export interface IResponseApi<T> {
  success?: boolean

  // thanh cong
  data?: T
  // that bai
  message?: string
  status?: number | string

  // danh cho list
  page?: {
    current: number
    max: number
  }
  count?: number
}

/**
 * tạo ra 1 func request api dựa vào axios
 * @param baseUrl
 * @param timeout
 * @param languageDefault
 */

export const createRequest = (
  baseUrl: string,
  timeout: number,
  languageDefault: string,
  options?: AxiosRequestConfig,
  listener?: (method: Method, ...arg: any[]) => void,
) => {
  return (
    authenToken?: string | undefined,
    cancelToken?: CancelTokenSource | undefined,
    language?: string,
  ) => {
    const defaultOptions: AxiosRequestConfig = {
      baseURL: baseUrl,
      timeout,
      cancelToken: cancelToken ? cancelToken.token : source.token,
      ...(options ?? {}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authenToken ? `${authenToken}` : '',
        'Accept-Language': language || languageDefault,
        ...(options?.headers ?? {}),
      },
    }

    return {
      /**
       * func get
       * override option request
       */
      get: <T = any, R = AxiosResponse<T>>(url: string, options: AxiosRequestConfig = {}) => {
        if (typeof listener === 'function') {
          listener('get', url, options)
        }
        return axios.get<T, R>(url, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        })
      },
      /**
       * func post
       * override option request
       */
      post: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {},
      ) => {
        if (typeof listener === 'function') {
          listener('patch', url, data, options)
        }
        return axios.post<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        })
      },
      /**
       * func put
       * override option request
       */
      put: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {},
      ) => {
        if (typeof listener === 'function') {
          listener('patch', url, data, options)
        }
        return axios.put<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        })
      },

      /**
       * func put
       * override option request
       */
      patch: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {},
      ) => {
        if (typeof listener === 'function') {
          listener('patch', url, data, options)
        }
        return axios.patch<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        })
      },

      /**
       * func delete
       * override option request
       */
      delete: <T = any, R = AxiosResponse<T>>(url: string, options: AxiosRequestConfig = {}) => {
        if (typeof listener === 'function') {
          listener('delete', url, options)
        }
        return axios.delete<T, R>(url, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        })
      },
    }
  }
}
