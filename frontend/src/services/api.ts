import axios from 'axios'

const TOKEN_KEY = 'jat_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const get = <T>(url: string, params?: Record<string, unknown>): Promise<T> =>
  api.get<T>(url, { params }).then((r) => r.data)

export const post = <T>(url: string, body?: unknown): Promise<T> =>
  api.post<T>(url, body).then((r) => r.data)

export const put = <T>(url: string, body?: unknown): Promise<T> =>
  api.put<T>(url, body).then((r) => r.data)

export const del = <T>(url: string): Promise<T> =>
  api.delete<T>(url).then((r) => r.data)

export { TOKEN_KEY }
export default api
