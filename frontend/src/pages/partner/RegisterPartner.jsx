import React, { useState } from 'react'
import axios from 'axios'

// Make sure Tailwind is configured and axios is installed.
// You said you have proxy in package.json, so using relative paths like '/api/...' is fine.

export default function RegisterPartner() {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    otp: '',
  })

  // use boolean flag for OTP stage instead of reusing the otp field/state
  const [otpSent, setOtpSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const validate = (requireOtp = false) => {
    const err = {}
    if (!form.fullname.trim()) err.fullname = 'Full name is required.'
    if (!form.email.trim()) err.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email.'
    if (!form.phone.trim()) err.phone = 'Phone number is required.'
    else if (!/^\d{10,15}$/.test(form.phone)) err.phone = 'Phone must be 10–15 digits.'
    if (requireOtp) {
      if (!form.otp.trim()) err.otp = 'OTP is required.'
      else if (!/^\d{3,6}$/.test(form.otp.trim())) err.otp = 'OTP looks invalid.'
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // send OTP first (form submit when otpSent === false)
  const handleOtp = async (e) => {
    e.preventDefault()
    setMessage(null)

    // validate basic fields (you can restrict to phone only if you want)
    if (!validate(false)) return

    setLoading(true)
    try {
      const res = await axios.post('/api/v1/partner/send-otp', { phone: form.phone })
      setMessage({ type: 'success', text: res?.data?.message || 'OTP sent.' })
      setOtpSent(true)
    } catch (err) {
      console.error('error while sending otp: ', err)
      const serverMsg = err?.response?.data?.message || err.message || 'Failed to send OTP.'
      setMessage({ type: 'error', text: serverMsg })
    } finally {
      setLoading(false)
    }
  }

  // final registration (form submit when otpSent === true)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!validate(true)) return

    setLoading(true)
    try {
      const payload = {
        fullname: form.fullname.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        otp: form.otp.trim(),
        
      }

      // choose backend endpoint locally — don't mutate a global var
      let endpoint = '/api/v1/partner/register-partner'

      const res = await axios.post(endpoint, payload)

      setMessage({ type: 'success', text: 'Registered successfully. Redirecting to login...' })

      // reset everything including otpSent and otp
      setForm({ fullname: '', email: '', phone: '', otp: '' })
      setOtpSent(false)
      setErrors({})

      setTimeout(() => {
        navigate('/partner/login')
      }, 1500) // small delay so user sees success message
      
    } catch (err) {
      console.error(err)
      const serverMsg = err?.response?.data?.message || err.message || 'Registration failed.'
      setMessage({ type: 'error', text: serverMsg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Hero */}
        <div className="hidden md:flex flex-col items-start justify-center p-8 bg-rose-50">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-rose-600">Foodly</h2>
            <p className="mt-2 text-sm text-rose-700">Delivering happiness — for customers, hotels & partners.</p>
          </div>

          <ul className="space-y-3 text-sm text-rose-700">
            <li>• Fast onboarding for hotels</li>
            <li>• Simple signup for customers</li>
            <li>• Dedicated partner flow for delivery partners</li>
          </ul>

          <div className="mt-6 text-xs text-rose-600">Already have an account? <a href="/login" className="underline font-medium">Login</a></div>
        </div>

        {/* Right: Form */}
        <div className="p-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800">Create your account</h3>
            <p className="text-sm text-gray-500 mt-1">Sign up in seconds — choose your role and get started</p>

            {message && (
              <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {message.text}
              </div>
            )}

            {/* when otpSent is false, form triggers handleOtp; when true, it triggers handleSubmit */}
            <form onSubmit={otpSent ? handleSubmit : handleOtp} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${errors.fullname ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="e.g. John Doe"
                />
                {errors.fullname && <p className="text-xs text-red-600 mt-1">{errors.fullname}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="you@domain.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, '')
                    setForm(prev => ({ ...prev, phone: digits }))
                  }}
                  inputMode="numeric"
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="e.g. 9876543210"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  name="otp"
                  value={form.otp}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, '')
                    setForm(prev => ({ ...prev, otp: digits }))
                  }}
                  inputMode="numeric"
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${errors.otp ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="Enter OTP"
                />
                {errors.otp && <p className="text-xs text-red-600 mt-1">{errors.otp}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 text-white px-4 py-2 font-semibold hover:bg-rose-700 disabled:opacity-60"
                >
                  {loading ? 'Please wait...' : (otpSent ? 'Register' : 'Send OTP')}
                </button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                By continuing you agree to our <a className="underline" href="/terms">Terms</a> and <a className="underline" href="/privacy">Privacy Policy</a>.
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Foodly — Built for speed and simplicity.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
