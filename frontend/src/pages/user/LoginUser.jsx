import axios from 'axios'
import { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

export default function LoginUser() {
  // ✅ ALL HOOKS FIRST (NO CONDITIONS ABOVE THESE)
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  // ✅ AFTER hooks, you may branch
  if (loading) return null

  if (user) {
    return <Navigate to={`/${user.role}/home`} replace />
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!phone) return

    try {
      await axios.post('/api/v1/user/send-otp', { phone })
      setOtpSent(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!otp) return

    try {
      await axios.post('/api/v1/user/user-login', { phone, otp })
      navigate('/user/home')
    } catch (err) {
      console.error(err)
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

          <form onSubmit={otpSent ? handleLogin : handleSendOtp} className="mt-6 space-y-5">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full border p-2 rounded"
              placeholder="Phone number"
            />

            {otpSent && (
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
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
