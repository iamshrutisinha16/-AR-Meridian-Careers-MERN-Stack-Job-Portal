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
import { setLoading } from '@/redux/authSlice'
import { Loader2, User, Mail, Phone, Lock, Upload, UserPlus, ArrowRight } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))

      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
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
      navigate("/");
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      
      <div className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-lg bg-white border border-gray-100 shadow-2xl rounded-3xl overflow-hidden p-8 sm:p-10 transition-all'>
          
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex p-3 bg-amber-500/10 text-amber-600 rounded-2xl mb-3'>
              <UserPlus className='w-6 h-6' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Create an Account</h1>
            <p className='text-sm text-gray-500 mt-1'>Join us to discover your next big career move</p>
          </div>

          <form onSubmit={submitHandler} className='space-y-5'>
            
            {/* Full Name */}
            <div className='space-y-2'>
              <Label className='text-sm font-semibold text-gray-700'>Full Name</Label>
              <div className='relative'>
                <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="Shubham Kumar"
                  required
                  className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-amber-500 focus-visible:ring-1 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <Label className='text-sm font-semibold text-gray-700'>Email Address</Label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="john.doe@gmail.com"
                  required
                  className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-amber-500 focus-visible:ring-1 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className='space-y-2'>
              <Label className='text-sm font-semibold text-gray-700'>Phone Number</Label>
              <div className='relative'>
                <Phone className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="0000000000"
                  required
                  className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-amber-500 focus-visible:ring-1 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label className='text-sm font-semibold text-gray-700'>Password</Label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-amber-500 focus-visible:ring-1 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Role & Profile Container Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1'>
              
              {/* Role Selection */}
              <div className='space-y-2'>
                <Label className='text-sm font-semibold text-gray-700'>Select Role</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <label className={`flex items-center justify-center p-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${input.role === 'student' ? 'border-amber-500 bg-amber-500/5 text-amber-900 font-medium' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="accent-amber-500 sr-only"
                    />
                    <span>Candidate</span>
                  </label>
                  
                  <label className={`flex items-center justify-center p-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${input.role === 'recruiter' ? 'border-amber-500 bg-amber-500/5 text-amber-900 font-medium' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="accent-amber-500 sr-only"
                    />
                    <span>Recruiter</span>
                  </label>
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div className='space-y-2'>
                <Label className='text-sm font-semibold text-gray-700'>Profile Picture</Label>
                <div className='relative flex items-center'>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer border border-gray-200 rounded-xl h-11 flex items-center"
                  />
                </div>
              </div>

            </div>

            {/* Submit Button (Yellow Theme) */}
            {loading ? (
              <Button disabled className="w-full mt-2 h-11 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl shadow-lg shadow-amber-500/20 cursor-not-allowed">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full mt-2 h-11 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                Sign Up <ArrowRight className='w-4 h-4' />
              </Button>
            )}

            {/* Login Link */}
            <div className='text-center pt-2'>
              <span className='text-sm text-gray-500'>
                Already have an account?{' '}
                <Link to="/login" className='text-amber-600 font-semibold hover:underline'>
                  Login
                </Link>
              </span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Signup