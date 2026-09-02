import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BriefcaseBusiness, BuildingIcon, HomeIcon, LogOut, MenuIcon, SearchCheck, User2, Download, Sun, Moon, MessageSquare } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
import logo from '../../assets/logo.png'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector(store => store.auth);

    // Dark/Light Mode state logic
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

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

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Top Header Navbar (Desktop & Tablet) with V-cut styling */}
            <header className='bg-white/90 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors pb-3 [clip-path:polygon(0_0,100%_0,100%_85%,50%_100%,0_85%)] sm:[clip-path:none]'>
                <div className='max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8'>
                    
                    {/* Brand / Logo Section */}
                    <div onClick={() => { navigate("/"); resetQuery(); }} className='cursor-pointer flex items-center gap-2.5 group'>
                        <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-gray-800 flex items-center justify-center p-1.5 shadow-inner group-hover:scale-105 transition-transform">
                            <img 
                                src={logo}
                                alt="AR Meridian Logo" 
                                className='w-full h-full object-contain'
                                onError={(e) => { e.target.style.display = 'none'; }} 
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-black text-base sm:text-lg tracking-tight text-gray-900 dark:text-white leading-tight'>
                                AR MERIDIAN
                            </span>
                            <span className='text-[10px] font-bold text-[#0284C7] tracking-wider uppercase'>
                                Industrial & Careers
                            </span>
                        </div>
                    </div>

                    {/* Desktop Nav Links */}
                    <nav className='hidden md:flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/50 p-1.5 rounded-full border border-gray-200/60 dark:border-gray-700/60 shadow-inner'>
                        {
                            user && user.role === "recruiter"
                                ? (
                                    <>
                                        <Link to="/admin/companies" className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/admin/companies') ? 'bg-[#0284C7] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-[#0284C7]'}`}>Companies</Link>
                                        <Link to="/admin/jobs" className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/admin/jobs') ? 'bg-[#0284C7] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-[#0284C7]'}`}>Manage Jobs</Link>
                                        <Link to="/admin/enquiries" className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/admin/enquiries') ? 'bg-[#0284C7] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-[#0284C7]'}`}>Enquiries</Link>
                                    </>
                                )
                                : (
                                    <>
                                        <Link to="/" onClick={resetQuery} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/') ? 'bg-[#0284C7] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-[#0284C7]'}`}>Home</Link>
                                        <Link to="/jobs" className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/jobs') ? 'bg-[#0284C7] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-[#0284C7]'}`}>Find Jobs</Link>
                                        <Link to="/browse" onClick={resetQuery} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${isActive('/browse') ? 'bg-[#0284C7] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-[#0284C7]'}`}>Browse</Link>
                                    </>
                                )
                        }
                    </nav>

                    {/* Right Action Items (Desktop & Tablet) */}
                    <div className='hidden sm:flex items-center gap-3'>
                        
                        {/* App Download Button */}
                        <a 
                            href="/downloads/meridian-app.apk" 
                            download="Meridian_Jobs.apk"
                            className='hidden lg:inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-[#0284C7] dark:text-blue-400 font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-full transition-colors border border-blue-200/50 dark:border-gray-700'
                            title="Download Mobile App"
                        >
                            <Download className='w-4 h-4 animate-bounce' />
                            <span>Get App</span>
                        </a>

                        {/* Dark Mode Toggle */}
                        <button 
                            onClick={toggleDarkMode} 
                            className='p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-sm'
                            title="Toggle Theme"
                        >
                            {darkMode ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
                        </button>

                        {/* Authentication State */}
                        {
                            !user
                                ? (
                                    <div className='flex items-center gap-2.5 ml-1'>
                                        <Link to="/login">
                                            <Button variant="ghost" className="text-gray-700 dark:text-gray-200 hover:text-[#0284C7] font-bold rounded-full px-4">Login</Button>
                                        </Link>
                                        <Link to="/signup">
                                            <button className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold rounded-full px-6 py-2.5 shadow-sm transition-all cursor-pointer text-sm">
                                                Register
                                            </button>
                                        </Link>
                                    </div>
                                )
                                : (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className='flex items-center gap-2 pl-2 cursor-pointer group'>
                                                <Avatar className="w-10 h-10 ring-2 ring-[#0284C7] shadow-md group-hover:scale-105 transition-transform">
                                                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                                </Avatar>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 p-4 shadow-2xl rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-white mt-2">
                                            <div className='flex gap-3.5 items-center border-b dark:border-gray-800 pb-3'>
                                                <Avatar className="w-12 h-12 ring-1 ring-gray-200">
                                                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                                                </Avatar>
                                                <div className='overflow-hidden'>
                                                    <h4 className='font-bold text-gray-900 dark:text-white truncate'>{user?.fullname}</h4>
                                                    <p className='text-xs text-muted-foreground truncate'>
                                                        {user?.profile?.bio || user?.email || "Meridian Member"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1.5 mt-3'>
                                                {user && user?.role === "student" && (
                                                    <Link to="/profile" className='flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold transition-colors'>
                                                        <User2 className='w-4 h-4 text-[#0284C7]' />
                                                        <span>View Full Profile</span>
                                                    </Link>
                                                )}
                                                <button onClick={logoutHandler} className='flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 font-semibold w-full text-left transition-colors cursor-pointer'>
                                                    <LogOut className='w-4 h-4' />
                                                    <span>Log Out Session</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )
                        }
                    </div>

                    {/* Mobile Hamburger / Profile Menu Control */}
                    <div className='flex sm:hidden items-center gap-2'>
                        <button 
                            onClick={toggleDarkMode} 
                            className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400'
                        >
                            {darkMode ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
                        </button>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon" className="rounded-xl border-gray-200 dark:border-gray-700">
                                    <MenuIcon className='w-5 h-5 text-gray-700 dark:text-gray-200' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-4 shadow-2xl rounded-2xl dark:bg-gray-900 dark:border-gray-800 dark:text-white mt-3">
                                <div className='flex flex-col gap-2'>
                                    <a 
                                        href="/downloads/meridian-app.apk" 
                                        download="Meridian_Jobs.apk"
                                        className='flex items-center gap-3 cursor-pointer p-3 bg-blue-50 dark:bg-blue-950/40 text-[#0284C7] rounded-xl font-bold text-xs uppercase tracking-wider'
                                    >
                                        <Download className='w-5 h-5 animate-bounce' />
                                        <span>Download App (.APK)</span>
                                    </a>

                                    {!user ? (
                                        <div className='flex flex-col gap-2 pt-3 border-t dark:border-gray-800 mt-1'>
                                            <Link to="/login"><Button variant="outline" className="w-full rounded-xl border-[#0284C7] text-[#0284C7] font-bold">Login</Button></Link>
                                            <Link to="/signup">
                                                <button className="w-full rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-2.5 shadow-sm text-sm">
                                                    Register
                                                </button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className='pt-3 border-t dark:border-gray-800 mt-1'>
                                            {user?.role === "student" && (
                                                <div onClick={() => navigate("/profile")} className='flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold mb-1'>
                                                    <User2 className='w-5 h-5 text-[#0284C7]' />
                                                    <span>Profile Settings</span>
                                                </div>
                                            )}
                                            <div onClick={logoutHandler} className='flex items-center gap-3 cursor-pointer p-3 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 rounded-xl font-semibold'>
                                                <LogOut className='w-5 h-5' />
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                </div>
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <div className='sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-lg px-4 py-2 flex items-center justify-around'>
                {
                    user && user.role === "recruiter"
                        ? (
                            <>
                                <div onClick={() => navigate("/admin/companies")} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive('/admin/companies') ? 'text-[#0284C7]' : 'text-gray-500 dark:text-gray-400'}`}>
                                    <BuildingIcon className='w-5 h-5' />
                                    <span className='text-[10px] font-semibold'>Companies</span>
                                </div>
                                <div onClick={() => navigate("/admin/jobs")} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive('/admin/jobs') ? 'text-[#0284C7]' : 'text-gray-500 dark:text-gray-400'}`}>
                                    <BriefcaseBusiness className='w-5 h-5' />
                                    <span className='text-[10px] font-semibold'>Jobs</span>
                                </div>
                                {/* Naya Enquiries Tab */}
                                <div onClick={() => navigate("/admin/enquiries")} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive('/admin/enquiries') ? 'text-[#0284C7]' : 'text-gray-500 dark:text-gray-400'}`}>
                                    <MessageSquare className='w-5 h-5' />
                                    <span className='text-[10px] font-semibold'>Enquiries</span>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div onClick={() => { navigate("/"); resetQuery(); }} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive('/') ? 'text-[#0284C7]' : 'text-gray-500 dark:text-gray-400'}`}>
                                    <HomeIcon className='w-5 h-5' />
                                    <span className='text-[10px] font-semibold'>Home</span>
                                </div>
                                <div onClick={() => navigate("/jobs")} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive('/jobs') ? 'text-[#0284C7]' : 'text-gray-500 dark:text-gray-400'}`}>
                                    <BriefcaseBusiness className='w-5 h-5' />
                                    <span className='text-[10px] font-semibold'>Find Jobs</span>
                                </div>
                                <div onClick={() => { navigate("/browse"); resetQuery(); }} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive('/browse') ? 'text-[#0284C7]' : 'text-gray-500 dark:text-gray-400'}`}>
                                    <SearchCheck className='w-5 h-5' />
                                    <span className='text-[10px] font-semibold'>Browse</span>
                                </div>
                            </>
                        )
                }

                {/* Profile Tab in Bottom Bar if user is logged in as student */}
                {user && user.role === "student" && (
                    <div onClick={() => navigate("/profile")} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive('/profile') ? 'text-[#0284C7]' : 'text-gray-500 dark:text-gray-400'}`}>
                        <User2 className='w-5 h-5' />
                        <span className='text-[10px] font-semibold'>Profile</span>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar;