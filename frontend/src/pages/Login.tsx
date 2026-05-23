import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import type { LoginInput } from '../types'

export default function Login() {
  const { login, isLoading, error } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>()

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-sm fade-in">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "'DM Mono', monospace", color: 'var(--primary)' }}
          >
            JAT
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">Job Application Tracker</p>
        </div>

        <div
          className="rounded-lg p-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-xl font-semibold text-[var(--text)] mb-1">Welcome back</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Sign in to your account</p>

          {error && (
            <div
              className="mb-4 px-3 py-2 rounded-lg text-sm text-[var(--danger)]"
              style={{ background: 'var(--danger)' + '18', border: '1px solid var(--danger)' + '33' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit((data) => login(data))} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />
            <Button type="submit" isLoading={isLoading} className="w-full justify-center">
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--text-secondary)] mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-[var(--primary)] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
