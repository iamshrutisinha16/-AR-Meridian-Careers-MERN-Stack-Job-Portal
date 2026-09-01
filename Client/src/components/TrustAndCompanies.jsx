import React from 'react'
import { ShieldCheck, MapPin, PhoneCall, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const TrustAndCompanies = () => {
    const navigate = useNavigate();

    return (
        <section className='w-full py-8 sm:py-12 px-4 bg-gray-50/50 my-2 sm:my-4'>
            <div className='max-w-7xl mx-auto'>
                
                {/* Trust Banner Card */}
                <div className='bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative overflow-hidden'>
                    
                    {/* Left Callout */}
                    <div className='space-y-3 sm:space-y-4 max-w-lg text-center lg:text-left'>
                        <h2 className='text-xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug'>
                            Trusted by Thousands of Professionals & Top Recruiters 🚀
                        </h2>
                        <p className='text-gray-500 text-xs sm:text-sm'>
                            Build your career or find top-tier talent with Meridian's verified job platform.
                        </p>
                        <div>
                            <Button 
                                onClick={() => navigate("/signup")}
                                className='bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-4 sm:px-6 sm:py-5 rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer inline-flex items-center gap-2 text-xs sm:text-sm'
                            >
                                Register Now <ArrowRight className='w-4 h-4' />
                            </Button>
                        </div>
                    </div>

                    {/* Right Features Grid - Optimized spacing and padding for mobile */}
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 sm:pt-8 lg:pt-0 lg:pl-12'>
                        
                        <div className='flex flex-col items-center lg:items-start text-center lg:text-left space-y-1.5 sm:space-y-2'>
                            <div className='p-2.5 sm:p-3 bg-blue-50 text-[#0284C7] rounded-2xl'>
                                <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />
                            </div>
                            <h3 className='font-bold text-gray-800 text-xs sm:text-sm'>100% FREE & Verified</h3>
                            <p className='text-[11px] sm:text-xs text-gray-500'>Genuine job listings with zero hidden charges.</p>
                        </div>

                        <div className='flex flex-col items-center lg:items-start text-center lg:text-left space-y-1.5 sm:space-y-2'>
                            <div className='p-2.5 sm:p-3 bg-amber-50 text-amber-600 rounded-2xl'>
                                <MapPin className='w-5 h-5 sm:w-6 sm:h-6' />
                            </div>
                            <h3 className='font-bold text-gray-800 text-xs sm:text-sm'>Best Local Jobs</h3>
                            <p className='text-[11px] sm:text-xs text-gray-500'>Find career openings suited to your location.</p>
                        </div>

                        <div className='flex flex-col items-center lg:items-start text-center lg:text-left space-y-1.5 sm:space-y-2'>
                            <div className='p-2.5 sm:p-3 bg-emerald-50 text-emerald-600 rounded-2xl'>
                                <PhoneCall className='w-5 h-5 sm:w-6 sm:h-6' />
                            </div>
                            <h3 className='font-bold text-gray-800 text-xs sm:text-sm'>Direct HR Connect</h3>
                            <p className='text-[11px] sm:text-xs text-gray-500'>Connect and schedule interviews instantly.</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrustAndCompanies;