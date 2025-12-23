import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

export default function LoginUser() {
  const { user, loading, refreshUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState(null)

  // ✅ Redirect AFTER auth state resolves
  useEffect(() => {
    if (!loading && user?.role === 'user') {
      navigate('/user/home', { replace: true })
    }
  }, [user, loading, navigate])

  if (loading) return null

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError(null)

    if (!phone) return

    try {
      await axios.post('/api/v1/user/send-otp', { phone })
      setOtpSent(true)
    } catch (err) {
      setError('Failed to send OTP')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    if (!otp) return

    try {
      await axios.post('/api/v1/user/user-login', { phone, otp })
      // ❌ NO navigate here
      // AuthProvider will update `user`
      await refreshUser()
    } catch (err) {
      setError('Invalid OTP')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Banner */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-orange-500 to-orange-700 text-white">
          <h2 className="text-4xl font-extrabold">Welcome Back</h2>
          <p className="mt-4 text-sm text-orange-100">
            Login instantly using OTP. No passwords required.
          </p>
        </div>

        {/* Right Form */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800">User Login</h3>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={otpSent ? handleLogin : handleSendOtp}
            className="mt-6 space-y-5"
          >
            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/[^0-9]/g, ''))
              }
              className="w-full border p-2 rounded"
              placeholder="Phone number"
            />

            {otpSent && (
              <input
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/[^0-9]/g, ''))
                }
                className="w-full border p-2 rounded"
                placeholder="OTP"
              />
            )}

            <button className="w-full bg-orange-500 text-white py-2 rounded">
              {otpSent ? 'Login' : 'Send OTP'}
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Don’t have an account?{' '}
            <Link to="/user/register" className="text-orange-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
