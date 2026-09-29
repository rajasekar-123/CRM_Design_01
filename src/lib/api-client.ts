// ──────────────────────────────────────────────────────────────
// Centralized API client
// Currently uses mock data — swap baseURL to real API endpoint
// when backend is ready. Shape of service functions stays identical.
// ──────────────────────────────────────────────────────────────

import { type ApiResponse, type PaginatedResponse } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean | undefined>
}

/**
 * Core fetch wrapper — adds auth headers, handles errors consistently.
 */
async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, params } = options

  // Build URL with query params
  const url = new URL(`${BASE_URL}${path}`, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value))
    })
  }

  // TODO: Add auth token from cookie/localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

  const response = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw {
      success: false,
      message: data.message ?? 'An unexpected error occurred',
      statusCode: response.status,
      errors: data.errors,
    }
  }

  return data as ApiResponse<T>
}

export const apiClient = {
  get: <T>(path: string, params?: RequestOptions['params']) =>
    request<T>(path, { method: 'GET', params }),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body }),

  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body }),

  delete: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
}

export default apiClient
