import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import * as authService from '../services/auth.service'
import { useAuthStore } from '../store/authStore'
import { useToast } from './useToast'
import type { LoginInput, RegisterInput } from '../types'

export function useAuth() {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [error, setError] = useState<string | null>(null)

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (result: { user: import('../types').User; token: string }) => {
      setAuth(result.user, result.token)
      navigate('/dashboard')
    },
    onError: (err: { response?: { data?: { error?: string } } }) => {
      const msg = err.response?.data?.error ?? 'Login failed. Check your credentials.'
      setError(msg)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (result: { user: import('../types').User; token: string }) => {
      setAuth(result.user, result.token)
      navigate('/dashboard')
    },
    onError: (err: { response?: { data?: { error?: string } } }) => {
      const msg = err.response?.data?.error ?? 'Registration failed. Please try again.'
      setError(msg)
    },
  })

  const logout = () => {
    clearAuth()
    addToast('Logged out successfully', 'success')
    navigate('/login')
  }

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error,
    clearError: () => setError(null),
  }
}
