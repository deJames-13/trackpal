import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { X, ArrowRight, Sparkles } from 'lucide-react'
import { CoinIcon } from '../../components/ui/CoinIcon'
import { useAuth } from './AuthContext'
import { useModals } from '../../context/ModalContext'

export const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuth } = useModals()
  const { login } = useAuth()
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  if (!isAuthOpen) return null

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!email || !email.includes('@')) {
      errs.email = 'Please enter a valid email address'
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters'
    }
    if (isSignUp && !fullName.trim()) {
      errs.fullName = 'Full name is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSuccess = (userName: string, userEmail: string) => {
    login(userName, userEmail)
    closeAuth()
    navigate({ to: '/overview' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      handleSuccess(
        isSignUp ? fullName : email.split('@')[0] || 'Member',
        email,
      )
    }
  }

  const handleDemoSignIn = (
    role: 'Maria Santos (Organizer)' | 'Juan Dela Cruz (Saver)',
  ) => {
    if (role.startsWith('Maria')) {
      handleSuccess('Maria Santos', 'maria.santos@gmail.com')
    } else {
      handleSuccess('Juan Dela Cruz', 'juan.delacruz@outlook.com')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        id="auth-modal-card"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative"
      >
        {/* Close Button */}
        <button
          id="auth-modal-close-btn"
          type="button"
          onClick={closeAuth}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="px-6 pt-7 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <CoinIcon size={22} className="text-[#F5B800]" />
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[#F5B800] text-neutral-950">
              TrackPal Account
            </span>
          </div>

          <h2
            id="auth-modal-title"
            className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight"
          >
            {isSignUp ? 'Create your account' : 'Sign in to TrackPal'}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {isSignUp
              ? 'Join trusted Paluwagan circles with automated cycle tracking.'
              : 'Access your active Paluwagan groups, turn rotations, and payout status.'}
          </p>
        </div>

        {/* Social Authentication */}
        <div className="px-6 space-y-2">
          {/* Microsoft Sign In */}
          <button
            id="auth-microsoft-signin-btn"
            type="button"
            onClick={() =>
              handleSuccess('Juan Dela Cruz', 'juan.delacruz@outlook.com')
            }
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 text-xs font-bold text-neutral-950 dark:text-white transition-all shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
          >
            <svg className="w-4 h-4" viewBox="0 0 21 21" aria-hidden="true">
              <rect x="1" y="1" width="9" height="9" fill="#f25022" />
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
              <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
              <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
            </svg>
            <span>Sign in with Microsoft</span>
          </button>

          {/* Google Sign In */}
          <button
            id="auth-google-signin-btn"
            type="button"
            onClick={() =>
              handleSuccess('Maria Santos', 'maria.santos@gmail.com')
            }
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 text-xs font-bold text-neutral-950 dark:text-white transition-all shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="px-6 py-3 flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {isSignUp && (
            <div>
              <label
                htmlFor="auth-input-fullname"
                className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
              >
                Full Name
              </label>
              <input
                id="auth-input-fullname"
                type="text"
                placeholder="e.g. Maria Santos"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#F5B800] ${
                  errors.fullName ? 'border-rose-500' : ''
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-500 mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="auth-input-email"
              className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
            >
              Email Address
            </label>
            <input
              id="auth-input-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#F5B800] ${
                errors.email ? 'border-rose-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="auth-input-password"
                className="text-xs font-bold text-neutral-900 dark:text-neutral-100"
              >
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  className="text-[11px] text-neutral-950 dark:text-[#F5B800] font-bold hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input
              id="auth-input-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#F5B800] ${
                errors.password ? 'border-rose-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-[11px] text-rose-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            id="auth-submit-btn"
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs transition-all cursor-pointer mt-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight
              className="w-3.5 h-3.5 stroke-[2.5]"
              aria-hidden="true"
            />
          </button>

          {/* Toggle Mode */}
          <div className="text-center pt-2">
            <button
              id="auth-toggle-mode-btn"
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setErrors({})
              }}
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
            >
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <span className="text-neutral-950 dark:text-[#F5B800] font-bold">
                    Sign in
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <span className="text-neutral-950 dark:text-[#F5B800] font-bold">
                    Register
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Access Bento */}
          <div className="mt-4 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <Sparkles
                className="w-3.5 h-3.5 text-[#F5B800]"
                aria-hidden="true"
              />
              <span>Instant Demo Accounts:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('Juan Dela Cruz (Saver)')}
                className="py-1.5 px-2.5 rounded-lg text-[11px] font-bold text-neutral-950 dark:text-white bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-[#F5B800] transition-colors text-left truncate cursor-pointer"
              >
                Juan (Saver)
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('Maria Santos (Organizer)')}
                className="py-1.5 px-2.5 rounded-lg text-[11px] font-bold text-neutral-950 dark:text-white bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-[#F5B800] transition-colors text-left truncate cursor-pointer"
              >
                Maria (Organizer)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
