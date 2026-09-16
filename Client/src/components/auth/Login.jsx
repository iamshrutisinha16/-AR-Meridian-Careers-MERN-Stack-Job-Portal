import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, ArrowRight, CheckCircle2, Clock, PhoneCall, Users, Briefcase } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);

        // 🔍 REDIRECTION TO HOME PAGE FOR BOTH ROLES AS REQUESTED:
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Hero / Login Section matching reference layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col justify-center">
        <div className="bg-gradient-to-r from-blue-50/50 via-white to-amber-50/40 border border-gray-200/80 rounded-3xl p-6 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Catchy Text Banner */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue-200">
              <Briefcase className="w-4 h-4" /> AR Jobs Portal
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Hire local staff & top talent <span className="text-blue-600">now!</span>
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto lg:mx-0">
              Get started from here <span className="inline-block animate-bounce">👉</span> Select your role, enter your credentials, and unlock powerful candidate boosts instantly.
            </p>

            <div className="hidden sm:grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/60 text-left">
              <div className="space-y-1">
                <div className="font-bold text-gray-900 text-sm">Fast Hiring</div>
                <div className="text-xs text-gray-500">Post jobs in under 1 minute</div>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-gray-900 text-sm">Direct Calls</div>
                <div className="text-xs text-gray-500">Connect with relevant candidates</div>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-gray-900 text-sm">Verified Leads</div>
                <div className="text-xs text-gray-500">240+ employers trust us</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Login Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-gray-200/90 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
                <p className="text-xs sm:text-sm text-gray-500">Enter your credentials to continue</p>
              </div>

              <form onSubmit={submitHandler} className='space-y-4'>
                
                {/* Email Field */}
                <div className='space-y-1.5'>
                  <Label className='text-xs sm:text-sm font-semibold text-gray-700'>Email Address</Label>
                  <div className='relative'>
                    <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                      type="email"
                      value={input.email}
                      name="email"
                      onChange={changeEventHandler}
                      placeholder="john.doe@gmail.com"
                      required
                      className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1 rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className='space-y-1.5'>
                  <Label className='text-xs sm:text-sm font-semibold text-gray-700'>Password</Label>
                  <div className='relative'>
                    <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                      type="password"
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1 rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* Role Selection Group */}
                <div className='space-y-1.5'>
                  <Label className='text-xs sm:text-sm font-semibold text-gray-700'>Select Role</Label>
                  <div className='grid grid-cols-2 gap-3'>
                    
                    {/* Candidate Option */}
                    <label className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all text-xs sm:text-sm font-medium ${input.role === 'student' ? 'border-blue-600 bg-blue-50/60 text-blue-900 shadow-2xs' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === "student"}
                        onChange={changeEventHandler}
                        className="accent-blue-600 sr-only"
                      />
                      <span>Candidate</span>
                    </label>

                    {/* Recruiter Option */}
                    <label className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all text-xs sm:text-sm font-medium ${input.role === 'recruiter' ? 'border-blue-600 bg-blue-50/60 text-blue-900 shadow-2xs' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === "recruiter"}
                        onChange={changeEventHandler}
                        className="accent-blue-600 sr-only"
                      />
                      <span>Recruiter</span>
                    </label>

                  </div>
                </div>

                {/* Submit Button */}
                {loading ? (
                  <Button disabled className="w-full mt-2 h-11 bg-blue-600 text-white font-medium rounded-xl shadow-md cursor-not-allowed">
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full mt-2 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    Login <ArrowRight className='w-4 h-4' />
                  </Button>
                )}

                {/* Signup Link */}
                <div className='text-center pt-2'>
                  <span className='text-xs sm:text-sm text-gray-500'>
                    Don't have an account?{' '}
                    <Link to="/signup" className='text-blue-600 font-semibold hover:underline'>
                      Signup
                    </Link>
                  </span>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Feature / Process Section matching reference image */}
      <div className="bg-white border-t border-gray-200 py-16 px-4 md:px-8 mt-auto">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">How to hire in less than 48 hours</h2>
            <p className="text-sm text-gray-500">Quick steps to connect with top-tier talent seamlessly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-6 space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Post a free job in less than 1 minute</h3>
              <p className="text-xs text-gray-500">Create your job listing instantly with our streamlined recruitment wizard.</p>
            </div>

            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-6 space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Get direct phone calls from relevant candidates</h3>
              <p className="text-xs text-gray-500">Receive verified candidate applications directly on your phone and dashboard.</p>
            </div>

            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-6 space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Interview and hire the right staff</h3>
              <p className="text-xs text-gray-500">Evaluate candidates, manage pipelines, and close positions faster than ever.</p>
            </div>

          </div>

          {/* Social Proof Banner */}
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">240+ employers found success on AR Jobs Portals 🎉</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-200/60 text-xs text-gray-600 leading-relaxed shadow-2xs">
                “I started receiving candidate applications as soon as my job went live. Most of the applications were <b>relevant to my hiring requirements</b>.”
              </div>
              <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-200/60 text-xs text-gray-600 leading-relaxed shadow-2xs">
                “I was looking for <b>bulk hiring</b> in customer support role. I found the team <b>proactive and helpful</b>. Very convenient and user friendly!”
              </div>
              <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-200/60 text-xs text-gray-600 leading-relaxed shadow-2xs">
                “I was looking to fill open positions on an <b>urgent basis</b>. The TAT for hiring candidates was as <b>promised</b>. Highly recommended!”
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login