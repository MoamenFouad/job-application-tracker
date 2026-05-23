import { get, post } from './api'
import type { User, LoginInput, RegisterInput, ApiResponse } from '../types'

interface AuthData {
  user: User
  token: string
}

export const login = (data: LoginInput) =>
  post<ApiResponse<AuthData>>('/auth/login', data).then((r) => r.data)

export const register = (data: RegisterInput) =>
  post<ApiResponse<AuthData>>('/auth/register', data).then((r) => r.data)

export const getProfile = () =>
  get<ApiResponse<User>>('/auth/profile').then((r) => r.data)

export const logout = () => post<ApiResponse<null>>('/auth/logout')
