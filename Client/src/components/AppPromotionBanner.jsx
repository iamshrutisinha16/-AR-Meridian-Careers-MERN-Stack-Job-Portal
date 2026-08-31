import React from 'react'
import { motion } from 'framer-motion'
import { Star, Smartphone, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

const AppPromotionBanner = () => {
    return (
        <section className='w-full py-16 px-4 bg-white'>
            <div className='max-w-7xl mx-auto'>
                
                {/* Main Container Card */}
                <div className='bg-[#070b19] rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden'>
                    
                    {/* Background Glow */}
                    <div className='absolute top-0 right-0 w-96 h-96 bg-[#0284C7] rounded-full opacity-20 blur-[120px] pointer-events-none'></div>

                    {/* Left Column: Text & QR Code */}
                    <div className='space-y-6 flex-1 z-10'>
                        <span className='inline-block px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-700 text-[#38bdf8] font-bold text-xs tracking-wide'>
                            📱 MOBILE APP EXPERIENCE
                        </span>

                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight'>
                            Get <span className='text-[#FFB703]'>Meridian Job App</span> Faster on Mobile
                        </h2>
                        
                        <p className='text-gray-300 text-sm sm:text-base max-w-xl'>
                            Unlock instant job alerts, direct HR contact, and seamless one-tap applications. Scan the QR code below to download now!
                        </p>

                        {/* QR Code & App Store Buttons Row */}
                        <div className='flex flex-col sm:flex-row items-center gap-6 pt-2'>
                            
                            {/* QR Code Card */}
                            <div className='bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center gap-2 shrink-0'>
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://meridian-jobs.vercel.app/download" 
                                    alt="QR Code" 
                                    className='w-24 h-24'
                                />
                                <span className='text-xs font-bold text-gray-800'>Scan to Download</span>
                            </div>

                            {/* App Store Buttons */}
                            <div className='flex flex-col gap-3 w-full sm:w-auto'>
                                <a href="#" className='transition-transform hover:scale-105'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className='h-11' />
                                </a>
                                <a href="#" className='transition-transform hover:scale-105'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className='h-11' />
                                </a>
                            </div>

                        </div>

                        {/* Rating & Stats */}
                        <div className='flex flex-wrap items-center gap-6 text-white pt-2'>
                            <div className='flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10'>
                                <Star className='w-4 h-4 text-[#FFB703] fill-current' />
                                <span className='font-bold text-sm'>4.8 (15k+ Reviews)</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-300 text-sm font-medium'>
                                <Smartphone className='w-4 h-4 text-blue-400' />
                                <span>1 Lakh+ Downloads</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feature Highlights Card (No broken image issue) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className='w-full lg:w-[420px] bg-white/10 backdrop-blur-md border border-white/15 p-6 sm:p-8 rounded-3xl z-10 space-y-5 shadow-xl'
                    >
                        <h3 className='text-white font-bold text-xl border-b border-white/10 pb-3'>
                            Why download the app?
                        </h3>

                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2 bg-blue-500/20 text-blue-400 rounded-lg mt-1'>
                                    <Zap className='w-5 h-5' />
                                </div>
                                <div>
                                    <h4 className='text-white font-bold text-sm'>Instant Job Alerts</h4>
                                    <p className='text-gray-400 text-xs mt-0.5'>Get notified the second a matching job is posted.</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2 bg-green-500/20 text-green-400 rounded-lg mt-1'>
                                    <ShieldCheck className='w-5 h-5' />
                                </div>
                                <div>
                                    <h4 className='text-white font-bold text-sm'>Direct HR Call</h4>
                                    <p className='text-gray-400 text-xs mt-0.5'>Talk directly to recruiters without waiting.</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2 bg-amber-500/20 text-amber-400 rounded-lg mt-1'>
                                    <CheckCircle2 className='w-5 h-5' />
                                </div>
                                <div>
                                    <h4 className='text-white font-bold text-sm'>100% Verified Jobs</h4>
                                    <p className='text-gray-400 text-xs mt-0.5'>Safe and trusted companies vetted by Meridian.</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default AppPromotionBanner;