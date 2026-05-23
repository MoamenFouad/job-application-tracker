import React from 'react'
import { cn } from '../../utils/cn'
import Spinner from './Spinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  children: React.ReactNode
}

const variants = {
  primary:
    'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] disabled:opacity-50',
  ghost:
    'bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]',
  danger:
    'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-medium transition-colors duration-150 cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" />
          Loading...
        </>
      ) : (
        <>
          {leftIcon}
          {children}
        </>
      )}
    </button>
  )
}
