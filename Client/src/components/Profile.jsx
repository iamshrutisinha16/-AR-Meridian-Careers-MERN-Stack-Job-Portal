import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import Footer from './shared/Footer';
import { motion } from "framer-motion"

function Profile() {

    useGetAppliedJobs();

    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col justify-between">
            <div>
                <Navbar />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='max-w-5xl mx-auto px-4 sm:px-6 py-8'
                >
                    {/* Profile Card */}
                    <div className='bg-white border border-gray-200/80 shadow-sm rounded-2xl overflow-hidden mb-8'>
                        
                        {/* Decorative Top Banner */}
                        <div className='h-32 bg-gradient-to-r from-[#070b19] via-[#0b1329] to-[#0284C7] px-8 pt-6 relative'>
                            <div className='absolute -bottom-10 left-8'>
                                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-white shadow-md bg-white">
                                    {
                                        user?.profile?.profilePhoto
                                            ? <AvatarImage src={user?.profile?.profilePhoto} alt="profile" className="object-cover" />
                                            : <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                                    }
                                </Avatar>
                            </div>
                        </div>

                        {/* Profile Info Section */}
                        <div className='px-6 sm:px-8 pt-14 pb-8'>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
                                <div>
                                    <h1 className='font-bold text-2xl text-gray-900'>{user?.fullname || "User Name"}</h1>
                                    <p className='text-gray-600 text-sm mt-1 max-w-xl leading-relaxed'>
                                        {user?.profile?.bio || "No bio added yet. Click edit to update your profile."}
                                    </p>
                                </div>
                                <Button 
                                    onClick={() => setOpen(true)} 
                                    className="gap-2 border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm cursor-pointer" 
                                    variant="outline"
                                >
                                    <Pen className='w-4 h-4 text-[#0284C7]' /> Edit Profile
                                </Button>
                            </div>

                            <hr className='border-gray-100 my-6' />

                            {/* Contact & Details Grid */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-6'>
                                <div className='flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100'>
                                    <div className='p-2 bg-[#0284C7]/10 text-[#0284C7] rounded-lg'>
                                        <Mail className='w-4 h-4' />
                                    </div>
                                    <span className='font-medium truncate'>{user?.email || "NA"}</span>
                                </div>
                                <div className='flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100'>
                                    <div className='p-2 bg-[#FFB703]/20 text-[#d99b00] rounded-lg'>
                                        <Contact className='w-4 h-4' />
                                    </div>
                                    <span className='font-medium'>{user?.phoneNumber || "NA"}</span>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className='mb-6'>
                                <h2 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3'>Skills & Expertise</h2>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {
                                        user?.profile?.skills && user?.profile?.skills.length > 0
                                            ? user?.profile?.skills.map((item, index) => (
                                                <Badge key={index} className="bg-sky-50 text-[#0284C7] border border-sky-200/60 px-3 py-1 text-xs font-semibold rounded-lg">
                                                    {item}
                                                </Badge>
                                            ))
                                            : <span className='text-sm text-gray-400 italic'>No skills added</span>
                                    }
                                </div>
                            </div>

                            {/* Resume Section */}
                            <div>
                                <Label className="text-sm font-semibold text-gray-900 uppercase tracking-wider block mb-2">Resume / CV</Label>
                                {
                                    user?.profile?.resume ? (
                                        <a 
                                            target='_blank' 
                                            rel="noopener noreferrer" 
                                            href={user?.profile?.resume} 
                                            className='inline-flex items-center gap-2 text-sm font-medium text-[#0284C7] bg-sky-50/80 hover:bg-sky-100/80 px-4 py-2.5 rounded-xl border border-sky-200/60 transition-colors w-fit'
                                        >
                                            <FileText className='w-4 h-4' />
                                            <span className='underline underline-offset-2'>{user?.profile?.resumeOriginalName || "View Resume"}</span>
                                        </a>
                                    ) : (
                                        <span className='text-sm text-gray-400 italic'>No resume uploaded</span>
                                    )
                                }
                            </div>

                        </div>
                    </div>

                    {/* Applied Jobs Section */}
                    <div className='bg-white border border-gray-200/80 shadow-sm rounded-2xl p-6 sm:p-8'>
                        <div className='flex items-center gap-2 mb-6'>
                            <Briefcase className='w-5 h-5 text-[#0284C7]' />
                            <h2 className='font-bold text-xl text-gray-900'>Applied Jobs</h2>
                        </div>
                        <AppliedJobTable />
                    </div>

                </motion.div>
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />

            <Footer />
        </div>
    )
}

export default Profile;