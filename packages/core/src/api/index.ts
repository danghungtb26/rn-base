import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'

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
export const createRequest = (baseUrl: string, timeout: number, languageDefault: string) => {
  return (
    authenToken?: string | undefined,
    cancelToken?: CancelTokenSource | undefined,
    language?: string
  ) => {
    const defaultOptions: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authenToken ? `${authenToken}` : '',
        'Accept-Language': language || languageDefault,
      },
      baseURL: baseUrl,
      timeout,
      cancelToken: cancelToken ? cancelToken.token : source.token,
    }

    return {
      /**
       * func get
       * override option request
       */
      get: (url: string, options: AxiosRequestConfig = {}) =>
        axios.get(url, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),
      /**
       * func post
       * override option request
       */
      post: (url: string, data?: any, options: AxiosRequestConfig = {}) => {
        return axios.post(url, data, {
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
      put: (url: string, data?: any, options: AxiosRequestConfig = {}) =>
        axios.put(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),

      /**
       * func delete
       * override option request
       */
      delete: (url: string, options: AxiosRequestConfig = {}) =>
        axios.delete(url, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),
    }
  }
}
