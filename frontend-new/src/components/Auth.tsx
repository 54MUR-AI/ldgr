import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = isSignUp 
      ? await signUp(email, password)
      : await signIn(email, password)

    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-samurai-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-samurai-red to-samurai-red-dark mb-4 animate-glow-pulse">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black neon-text mb-2">LDGR</h1>
          <p className="text-white/70">Military-Grade File Security</p>
        </div>

        {/* Auth Form */}
        <div className="bg-samurai-grey-darker border-2 border-samurai-red/30 rounded-2xl p-8 shadow-2xl animate-fade-in">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 ${
                !isSignUp
                  ? 'bg-samurai-red text-white shadow-lg shadow-samurai-red/30'
                  : 'bg-samurai-grey-dark text-white/70 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 ${
                isSignUp
                  ? 'bg-samurai-red text-white shadow-lg shadow-samurai-red/30'
                  : 'bg-samurai-grey-dark text-white/70 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-samurai-grey-dark border-2 border-samurai-red/30 rounded-lg text-white placeholder-white/50 focus:border-samurai-red focus:outline-none transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 bg-samurai-grey-dark border-2 border-samurai-red/30 rounded-lg text-white placeholder-white/50 focus:border-samurai-red focus:outline-none transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-samurai-red hover:bg-samurai-red-dark text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-samurai-red/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </span>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-samurai-grey-dark/50 border border-samurai-red/20 rounded-lg">
            <p className="text-sm text-white/70 text-center">
              🔒 Your files are encrypted client-side before upload. We never see your unencrypted data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
