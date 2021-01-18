import { useState, Dispatch, SetStateAction } from 'react'

export interface StateBase {
  loading: boolean
  refresh: boolean
  error: string | boolean
  setError: Dispatch<SetStateAction<string | boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setRefresh: Dispatch<SetStateAction<boolean>>
}

export const useStateBase: () => StateBase = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [error, setError] = useState<string | boolean>(false)
  return { loading, setLoading, refresh, setRefresh, error, setError }
}

export interface StateData<T> extends StateBase {
  data: T
  setData: Dispatch<SetStateAction<T>>
}

export const useStateData: <T>(p: T) => StateData<T> = <T>(p: T) => {
  const [data, setData] = useState<T>(p)
  return { data, setData, ...useStateBase() }
}

export interface IPage {
  current: number
  max: number
}

export interface StateList<T> extends StateBase {
  data: T[]
  setData: Dispatch<SetStateAction<T[]>>
  page: IPage
  setPage: Dispatch<SetStateAction<IPage>>
}

export const useStateList: <T>(p: T[]) => StateList<T> = <T>(p: T[]) => {
  const [data, setData] = useState<T[]>(p)
  const [page, setPage] = useState<IPage>({ current: 1, max: 10 })
  return { data, setData, page, setPage, ...useStateBase() }
}
