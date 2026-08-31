import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0b1329] text-gray-300 pt-16 pb-8 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-[6%] lg:px-[10%]">
                
                {/* Top Section / Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
                    
                    {/* Col 1: Brand Info */}
                    <div className="space-y-4">
                        <div className="flex flex-col leading-tight">
                            <span className="text-2xl font-black tracking-wider text-[#0284C7]">
                                MERIDIAN
                            </span>
                            <span className="text-xs font-bold tracking-widest text-[#FFB703] uppercase">
                                Job Portal
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Connecting talented professionals with top-tier employers across India and international markets. Your dream job is just a click away.
                        </p>
                        <div className="flex space-x-3 pt-2">
                            <a href="https://www.facebook.com/profile.php?id=100041822179627" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0284C7] hover:text-white transition-colors" aria-label="Facebook">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://x.com/Shubham22142019" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0284C7] hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="https://www.linkedin.com/in/shubham-kumar-894799290/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0284C7] hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 border-l-4 border-[#FFB703] pl-3">Quick Links</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/" className="hover:text-[#FFB703] transition-colors">Home</Link></li>
                            <li><Link to="/jobs" className="hover:text-[#FFB703] transition-colors">Explore Jobs</Link></li>
                            <li><Link to="/browse" className="hover:text-[#FFB703] transition-colors">Browse Categories</Link></li>
                            <li><Link to="/login" className="hover:text-[#FFB703] transition-colors">Candidate Login</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Working Hours */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 border-l-4 border-[#FFB703] pl-3">Working Hours</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <p><strong className="text-gray-200">Mon - Sat:</strong> 09:00 am - 7:00 pm</p>
                            <p><strong className="text-gray-200">Sun:</strong> 11:00 am - 6:00 pm</p>
                            <p className="text-xs text-[#FFB703] font-medium pt-1">Support available 24/7 online for registered users.</p>
                        </div>
                    </div>

                    {/* Col 4: Contact Info / Address */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 border-l-4 border-[#FFB703] pl-3">Contact Us</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
                                <span>Silver City Complex, Barara, Ambala, Haryana, India - 133201</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-[#0284C7] shrink-0" />
                                <a href="mailto:info@armeridian.com" className="hover:text-white transition-colors">info@armeridian.com</a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-[#0284C7] shrink-0" />
                                <a href="tel:+917837793820" className="hover:text-white transition-colors">+91 78377 93820</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Copyright Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-gray-500">
                    <p>Copyright © 2026 AR Meridian. All rights reserved.</p>
                    <p className="mt-2 sm:mt-0">Powered by <span className="text-[#FFB703] font-medium">AR Meridian</span></p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;