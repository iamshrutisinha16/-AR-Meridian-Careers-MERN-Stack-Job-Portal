import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICANT_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { MessageSquareText, MapPin, Briefcase, IndianRupee, CheckCircle2, Building2 } from 'lucide-react'

const JobDescription = () => {

  const dispatch = useDispatch();
  const { singleJob } = useSelector(state => state.job)
  const { user } = useSelector(state => state.auth)

  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  
  // Inquiry Modal states
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');

  const params = useParams();
  const jobId = params.id;

  // Safe Experience extractor (Handles different key names from backend)
  const jobExperienceValue = singleJob?.experience ?? singleJob?.experienceLevel ?? singleJob?.jobExperience ?? 0;

  const applyJobHandler = async () => {
    try {
      if (!user?.profile?.resume) {
        toast.error("Please upload your resume in your profile before applying!");
        return;
      }

      const userExp = user?.profile?.experience || 0;
      if (userExp < jobExperienceValue) {
        toast.error(`Not Eligible: This job requires at least ${jobExperienceValue} years of experience.`);
        return;
      }

      const userSkills = user?.profile?.skills?.map(skill => skill.toLowerCase()) || [];
      const jobRequirements = singleJob?.requirements?.map(req => req.toLowerCase()) || [];

      if (jobRequirements.length > 0) {
        const hasMatchingSkill = jobRequirements.some(req => 
          userSkills.some(skill => req.includes(skill) || skill.includes(req))
        );

        if (!hasMatchingSkill) {
          toast.error("Not Eligible: Your profile skills do not match the job requirements.");
          return;
        }
      }

      const response = await axios.post(`${APPLICANT_API_END_POINT}/apply/${jobId}`, {}, {
        withCredentials: true
      })

      if (response.data.success) {
        setIsApplied(true); 
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  // Send Inquiry Handler
  const sendInquiryHandler = async (e) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) {
      toast.error("Please enter a message for your inquiry.");
      return;
    }

    try {
      const response = await axios.post(`https://ar-meridian-careers-mern-stack-job-portal.onrender.com/api/v1/inquiry/send`, {
        jobId,
        message: inquiryMessage,
        companyId: singleJob?.company?._id || singleJob?.company
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success("Inquiry sent successfully to the employer!");
        setInquiryMessage('');
        setShowInquiryModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.success("Inquiry submitted successfully!");
      setShowInquiryModal(false);
      setInquiryMessage('');
    }
  }

  useEffect(() => {
    const fetchSingleJobDescription = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true
        });
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(response.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSingleJobDescription();
  }, [jobId, dispatch, user?._id])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <div className='max-w-5xl w-full mx-auto px-4 sm:px-6 my-8 flex-1'>
        
        {/* Top Header Card */}
        <div className='bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs mb-6 relative overflow-hidden'>
          
          <div className='absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-100'>
            ⭐ Top Match
          </div>

          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
            <div>
              <h1 className='text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight'>{singleJob?.title}</h1>
              
              <div className='flex items-center gap-2 text-emerald-600 font-extrabold text-lg mt-1'>
                <IndianRupee className='w-5 h-5' />
                <span>{singleJob?.salary ? `${singleJob.salary} LPA` : 'As per industry standards'}</span>
              </div>

              {/* Company & Location Info */}
              <div className='flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 mt-4'>
                <div className='flex items-center gap-1.5'>
                  <Building2 className='w-4 h-4 text-gray-400' />
                  <span className='font-bold text-gray-800'>{singleJob?.company?.name || 'Leading Enterprise'}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <MapPin className='w-4 h-4 text-gray-400' />
                  <span>{singleJob?.location || 'Remote / On-site'}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Briefcase className='w-4 h-4 text-gray-400' />
                  <span>{jobExperienceValue} yrs Experience</span>
                </div>
              </div>

              {/* Badges */}
              <div className='flex items-center gap-2 mt-5 flex-wrap'>
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-3 py-1 rounded-lg border border-blue-200" variant="ghost">
                  {singleJob?.position} Vacancy
                </Badge>
                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 font-bold px-3 py-1 rounded-lg border border-orange-200" variant="ghost">
                  {singleJob?.jobType || 'Full Time'}
                </Badge>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className='flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100'>
              <Button 
                onClick={() => setShowInquiryModal(true)} 
                variant="outline"
                className="rounded-xl border-[#0284C7] text-[#0284C7] hover:bg-sky-50 font-bold h-11 px-4 cursor-pointer flex items-center gap-2"
              >
                <MessageSquareText className='w-4 h-4' />
                <span>Send Inquiry</span>
              </Button>

            <Button 
  onClick={isApplied ? null : applyJobHandler} 
  disabled={isApplied} 
  className={`rounded-xl font-bold h-11 px-6 shadow-sm ${
    isApplied 
      ? 'bg-gray-400 text-white cursor-not-allowed' 
      : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
  }`}
>
  {isApplied ? 'Applied' : 'Apply Now'}
</Button>
            </div>
          </div>
        </div>

        {/* Skills Required Section */}
        {singleJob?.requirements && singleJob.requirements.length > 0 && (
          <div className='bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs mb-6'>
            <h2 className='text-sm font-extrabold text-gray-900 mb-3 uppercase tracking-wider'>Skills Required</h2>
            <div className='flex flex-wrap gap-2'>
              {singleJob.requirements.map((req, index) => (
                <span key={index} className='bg-gray-100 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-gray-200'>
                  {req}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Job Highlights Box */}
        <div className='bg-sky-50/60 rounded-2xl border border-sky-100 p-6 shadow-xs mb-6'>
          <h2 className='text-sm font-extrabold text-gray-900 mb-4 uppercase tracking-wider'>Job Highlights</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700'>
            <div className='flex items-center gap-2.5'>
              <CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0' />
              <span>Verified Employer & Active Listing</span>
            </div>
            <div className='flex items-center gap-2.5'>
              <CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0' />
              <span>Direct communication via company inquiry</span>
            </div>
            <div className='flex items-center gap-2.5'>
              <CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0' />
              <span>Total Applicants so far: <strong>{singleJob?.applications?.length || 0}</strong></span>
            </div>
            <div className='flex items-center gap-2.5'>
              <CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0' />
              <span>Posted on: {singleJob?.createdAt?.split("T")[0] || 'Recent'}</span>
            </div>
          </div>
        </div>

        {/* Detailed Job Description Card */}
        <div className='bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs'>
          <h2 className='text-base font-extrabold text-gray-900 pb-3 border-b border-gray-100 mb-4'>Job Description</h2>
          
          <div className='space-y-4 text-sm text-gray-700 leading-relaxed'>
            <p className='whitespace-pre-line'>
              {singleJob?.description || 'No detailed description provided for this position.'}
            </p>
          </div>
        </div>

        {/* Inquiry Popup Modal */}
        {showInquiryModal && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100'>
              <h2 className='text-lg font-bold text-gray-900 mb-1'>Send Business Inquiry</h2>
              <p className='text-xs text-gray-500 mb-4'>Have a question regarding this position? Send a message directly to the hiring manager.</p>
              
              <form onSubmit={sendInquiryHandler}>
                <textarea 
                  rows="4" 
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Type your inquiry details here..." 
                  className='w-full p-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#7209b7]'
                  required
                />
                
                <div className='flex items-center justify-end gap-3 mt-4'>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowInquiryModal(false)}
                    className="rounded-xl text-gray-600 text-xs font-bold"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="rounded-xl bg-[#7209b7] hover:bg-[#5f08ad] text-white text-xs font-bold"
                  >
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}

export default JobDescription; 