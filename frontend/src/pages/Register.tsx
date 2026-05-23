import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import type { RegisterInput } from '../types'

interface RegisterForm extends RegisterInput {
  confirmPassword: string
}

export default function Register() {
  const { register: registerUser, isLoading, error } = useAuth()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>()
  const password = watch('password')

  const onSubmit = ({ confirmPassword: _cp, ...data }: RegisterForm) => {
    registerUser(data)
  }

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
          <h2 className="text-xl font-semibold text-[var(--text)] mb-1">Create account</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Start tracking your applications</p>

          {error && (
            <div
              className="mb-4 px-3 py-2 rounded-lg text-sm text-[var(--danger)]"
              style={{ background: 'var(--danger)' + '18', border: '1px solid var(--danger)' + '33' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Name"
              placeholder="Your name"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
            />
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
              placeholder="Min 8 characters"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (v) => v === password || 'Passwords do not match',
              })}
            />
            <Button type="submit" isLoading={isLoading} className="w-full justify-center">
              Create account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--text-secondary)] mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--primary)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
