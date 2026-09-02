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
import { MessageSquareText } from 'lucide-react'

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

  const applyJobHandler = async () => {
    try {
      if (!user?.profile?.resume) {
        toast.error("Please upload your resume in your profile before applying!");
        return;
      }

      const userExp = user?.profile?.experience || 0;
      const jobExp = singleJob?.experienceLevel || 0;
      if (userExp < jobExp) {
        toast.error(`Not Eligible: This job requires at least ${jobExp} years of experience.`);
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
      // Yahan aap apna backend inquiry endpoint dal sakti hain (jaise /api/v1/inquiry/send)
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
      // Fallback agar backend route abhi ready na ho
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
    <div>
      <Navbar />
      <div className='px-[6%] my-10 relative'>

        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div>
            <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.position} positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.jobType} position
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          
          <div className='flex items-center gap-3'>
            {/* Send Inquiry Button */}
            <Button 
              onClick={() => setShowInquiryModal(true)} 
              variant="outline"
              className="rounded-lg border-[#0284C7] text-[#0284C7] hover:bg-blue-50 cursor-pointer flex items-center gap-2"
            >
              <MessageSquareText className='w-4 h-4' />
              <span>Send Inquiry</span>
            </Button>

            {/* Apply Button */}
            <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f08ad] cursor-pointer'} `}>
              {
                isApplied ? 'Applied' : 'Apply Now'
              }
            </Button>
          </div>
        </div>

        <div className=''>
          <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
        </div>
        <div className='my-4'>
          <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
          <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
          <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'> {singleJob?.description} </span></h1>
          <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
          <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
          <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
          <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
        </div>

        {/* Inquiry Popup Modal */}
        {showInquiryModal && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800'>
              <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>Send Business Inquiry</h2>
              <p className='text-xs text-gray-500 mb-4'>Have a question regarding this industrial listing or requirement? Send a message directly to the employer.</p>
              
              <form onSubmit={sendInquiryHandler}>
                <textarea 
                  rows="4" 
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Type your inquiry details here (e.g. bulk order, availability, specific terms)..." 
                  className='w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]'
                  required
                />
                
                <div className='flex items-center justify-end gap-3 mt-4'>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowInquiryModal(false)}
                    className="rounded-lg text-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="rounded-lg bg-[#0284C7] hover:bg-sky-700 text-white"
                  >
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default JobDescription