import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BriefcaseBusiness, BuildingIcon, HomeIcon, LogOut, MenuIcon, SearchCheck, User2, Download } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"
import logo from '../../assets/logo.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(store => store.auth);

    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
                withCredentials: true
            });
            if (response.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const resetQuery = () => {
        dispatch(setSearchedQuery(''));
    }

    return (
        <div className='bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100'>
            <div className='flex items-center justify-between mx-auto h-20 px-4 sm:px-[6%] lg:px-[10%]'>
                
                {/* Logo Section with Image Space & Stacked Text */}
                <div onClick={() => navigate("/")} className='cursor-pointer flex items-center gap-3 group'>
                    <img 
                        src={logo}
                        alt="AR Meridian Logo" 
                        className='w-16 h-17 object-contain'
                        onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                </div>

                {/* Desktop Nav Links */}
                <div className='hidden sm:flex items-center gap-6 lg:gap-8'>
                    <ul className='flex font-semibold items-center gap-6 lg:gap-8 text-gray-700'>
                        {
                            user && user.role === "recruiter"
                                ? (
                                    <>
                                        <li><Link to="/admin/companies" className='hover:text-[#0284C7] transition-colors'>Companies</Link></li>
                                        <li><Link to="/admin/jobs" className='hover:text-[#0284C7] transition-colors'>Jobs</Link></li>
                                    </>
                                )
                                : (
                                    <>
                                        <li><Link to="/" onClick={resetQuery} className='hover:text-[#0284C7] transition-colors'>Home</Link></li>
                                        <li><Link to="/jobs" className='hover:text-[#0284C7] transition-colors'>Jobs</Link></li>
                                        <li><Link to="/browse" onClick={resetQuery} className='hover:text-[#0284C7] transition-colors'>Browse</Link></li>
                                    </>
                                )
                        }
                    </ul>

                    {/* Download App Direct Action Button */}
                    <a 
                        href="/downloads/meridian-app.apk" 
                        download="Meridian_Jobs.apk"
                        className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-[#0284C7] hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer'
                        title="Download Mobile App"
                    >
                        <Download className='w-4 h-4 animate-bounce' />
                        <span className='hidden lg:inline'>Download App</span>
                    </a>

                    {/* Auth Buttons or Profile Avatar */}
                    {
                        !user
                            ? (
                                <div className='flex items-center gap-3'>
                                    <Link to="/login">
                                        <Button variant="outline" className="border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7] hover:text-white cursor-pointer font-semibold rounded-full px-5">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-[#FFB703] hover:bg-[#e0a102] text-black font-bold cursor-pointer rounded-full px-5 shadow-sm">Signup</Button>
                                    </Link>
                                </div>
                            )
                            : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer ring-2 ring-[#0284C7] transition-transform hover:scale-105">
                                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-4 shadow-xl rounded-2xl border-gray-100">
                                        <div className='flex gap-4 items-center border-b pb-3'>
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-bold text-gray-900'>{user?.fullname}</h4>
                                                <p className='text-xs text-muted-foreground line-clamp-1'>
                                                    {user?.profile?.bio || "No bio added yet"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1 mt-3'>
                                            {user && user?.role === "student" && (
                                                <Link to="/profile" className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors'>
                                                    <User2 className='w-4 h-4 text-[#0284C7]' />
                                                    <span>View Profile</span>
                                                </Link>
                                            )}
                                            <button onClick={logoutHandler} className='flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-600 font-medium w-full text-left transition-colors cursor-pointer'>
                                                <LogOut className='w-4 h-4' />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }
                </div>

                {/* Mobile Menu Trigger & Header Download */}
                <div className='sm:hidden flex items-center gap-3'>
                    <a 
                        href="/downloads/meridian-app.apk" 
                        download="Meridian_Jobs.apk"
                        className='flex items-center justify-center p-2 bg-[#0284C7] text-white rounded-full shadow-sm'
                        title="Download App"
                    >
                        <Download className='w-5 h-5' />
                    </a>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-700">
                                <MenuIcon className='w-6 h-6' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4 shadow-xl rounded-2xl">
                            <div className='flex flex-col gap-4'>
                                {
                                    user && user.role === "recruiter"
                                        ? (
                                            <>
                                                <div onClick={() => navigate("/admin/companies")} className='flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg'>
                                                    <BuildingIcon className='w-5 h-5 text-[#0284C7]' />
                                                    <span className='font-medium'>Companies</span>
                                                </div>
                                                <div onClick={() => navigate("/admin/jobs")} className='flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg'>
                                                    <BriefcaseBusiness className='w-5 h-5 text-[#0284C7]' />
                                                    <span className='font-medium'>Jobs</span>
                                                </div>
                                            </>
                                        )
                                        : (
                                            <>
                                                <div onClick={() => { navigate("/"); resetQuery(); }} className='flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg'>
                                                    <HomeIcon className='w-5 h-5 text-[#0284C7]' />
                                                    <span className='font-medium'>Home</span>
                                                </div>
                                                <div onClick={() => navigate("/jobs")} className='flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg'>
                                                    <BriefcaseBusiness className='w-5 h-5 text-[#0284C7]' />
                                                    <span className='font-medium'>Jobs</span>
                                                </div>
                                                <div onClick={() => { navigate("/browse"); resetQuery(); }} className='flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg'>
                                                    <SearchCheck className='w-5 h-5 text-[#0284C7]' />
                                                    <span className='font-medium'>Browse</span>
                                                </div>
                                            </>
                                        )
                                }
                                <a 
                                    href="/downloads/meridian-app.apk" 
                                    download="Meridian_Jobs.apk"
                                    className='flex items-center gap-3 cursor-pointer p-2 bg-blue-50 text-[#0284C7] rounded-lg font-semibold'
                                >
                                    <Download className='w-5 h-5' />
                                    <span>Download App (.APK)</span>
                                </a>

                                {!user && (
                                    <div className='flex flex-col gap-2 pt-2 border-t'>
                                        <Link to="/login"><Button variant="outline" className="w-full border-[#0284C7] text-[#0284C7]">Login</Button></Link>
                                        <Link to="/signup"><Button className="w-full bg-[#FFB703] hover:bg-[#e0a102] text-black font-bold">Signup</Button></Link>
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
        </div>
    )
}

export default Navbar;