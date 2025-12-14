import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPartner() {
  const navigate = useNavigate()

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = async (e) => {
    e.preventDefault()

    if (!phone) return

    try {
      await axios.post('/api/v1/partner/send-otp', { phone })
      console.log('OTP sent successfully')
      setOtpSent(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!otp) return

    try {
      await axios.post('/api/v1/partner/login-partner', { phone, otp })
      console.log('Logged in successfully')
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
          <ul className="mt-6 space-y-2 text-sm">
            <li>• Secure OTP based login</li>
            <li>• Fast & seamless access</li>
            <li>• Built for food delivery speed</li>
          </ul>
        </div>

        {/* Right Form */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800">User Login</h3>
          <p className="text-sm text-gray-500 mt-1">Enter your phone number to continue</p>

          <form onSubmit={otpSent ? handleLogin : handleSendOtp} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                inputMode="numeric"
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="9876543210"
              />
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  inputMode="numeric"
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter OTP"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 text-white py-2 font-semibold hover:bg-orange-600"
            >
              {otpSent ? 'Login' : 'Send OTP'}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-500 text-center">
            Don’t have an account?{' '}
            <Link to="/user/register" className="text-orange-500 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
