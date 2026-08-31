import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import JobApplicantsTable from './JobApplicantsTable'
import axios from 'axios'
import { APPLICANT_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { Users, UserCheck } from 'lucide-react'

const JobApplicants = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;

    const { allApplicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLICANT_API_END_POINT}/${jobId}/applicants`, { withCredentials: true });

                if (response.data.success) {
                    dispatch(setAllApplicants(response.data.job));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllApplicants();
    }, [jobId, dispatch])

    const applicantCount = allApplicants?.applications?.length || 0;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />

            <div className='max-w-7xl mx-auto px-4 md:px-8 py-10'>
                
                {/* Header Section */}
                <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2.5 bg-blue-600/10 rounded-xl'>
                            <Users className='w-6 h-6 text-blue-600' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Job Applicants</h1>
                            <p className='text-gray-500 text-sm mt-0.5'>Review and manage candidate submissions for this specific listing.</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 bg-white border border-gray-100 shadow-md px-4 py-2.5 rounded-xl'>
                        <UserCheck className='w-5 h-5 text-blue-600' />
                        <span className='text-sm font-semibold text-gray-700'>
                            Total Applications: <span className='text-blue-600 font-bold ml-1'>{applicantCount}</span>
                        </span>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className='bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden p-6'>
                    <div className='overflow-x-auto'>
                        <JobApplicantsTable />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default JobApplicants
