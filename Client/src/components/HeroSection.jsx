import React, { useState } from 'react'
import { Search, Briefcase, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

function HeroSection() {
    const [keyword, setKeyword] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        const queryParts = [keyword, experience, location].filter(Boolean);
        const finalQuery = queryParts.join(" ");
        dispatch(setSearchedQuery(finalQuery));
        navigate("/jobs");
    }

    return (
        <div className="relative overflow-hidden py-16 sm:py-24 px-4 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white border-b border-gray-100">
            
            {/* Background Decorative Shapes / Job Elements */}
            <div className="absolute top-0 right-0 -z-10 opacity-15 w-96 h-96 bg-blue-400 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 -z-10 opacity-15 w-80 h-80 bg-indigo-400 rounded-full blur-3xl pointer-events-none"></div>

            <div className='relative max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                    
                    {/* Left Column: Text & Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='lg:col-span-7 text-center lg:text-left space-y-6'
                    >
                        {/* Badge */}
                        <span className='inline-block px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#0284C7] font-bold text-xs sm:text-sm tracking-wide shadow-sm'>
                            🚀 INDIA'S #1 JOB PLATFORM
                        </span>

                        {/* Main Heading */}
                        <h1 className='text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight'>
                            Your job search <span className='text-[#0284C7] underline decoration-amber-400 decoration-wavy decoration-2'>ends here</span>
                        </h1>

                        {/* Subtitle */}
                        <p className='text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0'>
                            Discover 50 lakh+ career opportunities with top employers, startups, and trusted global brands.
                        </p>

                        {/* Search Container - Fully responsive row layout across all screens */}
                        <div className='w-full bg-white shadow-2xl rounded-2xl sm:rounded-full border border-gray-200 p-2 flex flex-row items-center gap-1 sm:gap-2 mt-4'>
                            
                            {/* Keyword Input */}
                            <div className='flex items-center gap-1.5 sm:gap-3 w-1/3 min-w-0 px-2 sm:px-4 py-2.5 border-r border-gray-100'>
                                <Search className='w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0' />
                                <input 
                                    type="text"
                                    placeholder='Role, skill...'
                                    className='outline-none border-none w-full text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-sm bg-transparent font-medium truncate'
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                                />
                            </div>

                            {/* Experience Select */}
                            <div className='flex items-center gap-1.5 sm:gap-3 w-1/3 min-w-0 px-2 sm:px-4 py-2.5 border-r border-gray-100'>
                                <Briefcase className='w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0' />
                                <select 
                                    className='outline-none border-none w-full text-gray-600 text-[11px] sm:text-sm bg-transparent font-medium cursor-pointer truncate'
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                >
                                    <option value="">Experience</option>
                                    <option value="fresher">Fresher</option>
                                    <option value="1-3">1-3 Years</option>
                                    <option value="3-5">3-5 Years</option>
                                    <option value="5+">5+ Years</option>
                                </select>
                            </div>

                            {/* Location Input */}
                            <div className='flex items-center gap-1.5 sm:gap-3 w-1/3 min-w-0 px-2 sm:px-4 py-2.5'>
                                <MapPin className='w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0' />
                                <input 
                                    type="text"
                                    placeholder='City...'
                                    className='outline-none border-none w-full text-gray-900 placeholder:text-gray-400 text-[11px] sm:text-sm bg-transparent font-medium truncate'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                                />
                            </div>

                            {/* Search Button */}
                            <Button 
                                onClick={searchJobHandler} 
                                className='rounded-xl sm:rounded-full bg-[#0284C7] hover:bg-[#0270a6] text-white font-bold px-3 sm:px-8 py-3.5 sm:py-6 text-xs sm:text-sm cursor-pointer transition-transform active:scale-95 shrink-0 shadow-lg'
                            >
                                <span className='hidden sm:inline'>Search jobs</span>
                                <Search className='w-4 h-4 sm:hidden' />
                            </Button>
                        </div>

                        {/* Trust Footer */}
                        <div className='pt-2 text-xs text-gray-500 font-medium flex items-center justify-center lg:justify-start gap-2'>
                            <span className='inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse'></span>
                            Trusted by 1000+ enterprises and 7 lakh+ MSMEs for hiring
                        </div>

                    </motion.div>

                    {/* Right Column: Professional Job Portal Illustration / Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='lg:col-span-5 relative flex justify-center'
                    >
                        <div className='relative w-full max-w-md'>
                            {/* Main Illustration Card */}
                            <div className='bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-blue-100 relative z-10 overflow-hidden group'>
                                <img 
                                    src="https://i.pinimg.com/736x/c2/d9/fa/c2d9fae0fd5e7041653a4d88369ea489.jpg" 
                                    alt="Job Seekers working together" 
                                    className='w-full h-72 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl flex flex-col justify-end p-6'>
                                    <span className='text-amber-300 font-bold text-xs uppercase tracking-wider'>Top Rated Openings</span>
                                    <h3 className='text-white font-bold text-lg'>Build your tech & corporate career</h3>
                                </div>
                            </div>

                            {/* Floating Badge Card 1 */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className='absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 flex items-center gap-3'
                            >
                                <div className='p-3 bg-blue-50 text-[#0284C7] rounded-xl font-black text-lg'>
                                    50L+
                                </div>
                                <div>
                                    <p className='text-xs text-gray-400 font-semibold'>Active Jobs</p>
                                    <p className='text-sm font-bold text-gray-800'>Ready to Apply</p>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default HeroSection;