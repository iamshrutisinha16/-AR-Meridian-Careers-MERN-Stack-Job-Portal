import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, Briefcase, Building2, MapPin, DollarSign, Clock, Users, FileText } from 'lucide-react'

const PostJob = () => {
    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experience: "",
        jobType: "",
        position: 0,
        companyId: "",
    })

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.companyName.toLowerCase() === value.toLowerCase())
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id })
        }
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const postNewJob = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })

            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />
            
            <div className='max-w-4xl mx-auto px-4 py-10'>
                <div className='bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden'>
                    
                    {/* Header Banner inside form */}
                    <div className='bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2.5 bg-white/10 backdrop-blur-md rounded-xl'>
                                <Briefcase className='w-6 h-6 text-white' />
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold tracking-tight'>Post a New Job Opening</h1>
                                <p className='text-blue-100 text-sm mt-0.5'>Create an opportunity to attract top-tier talent for your enterprise.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={postNewJob} className='p-8 space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            
                            {/* Title */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <Briefcase className='w-4 h-4 text-blue-600' /> Job Title
                                </Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    placeholder="e.g. Senior Frontend Developer"
                                    onChange={changeEventHandler}
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                            {/* Company Selector */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <Building2 className='w-4 h-4 text-blue-600' /> Select Company
                                </Label>
                                {companies.length > 0 ? (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="h-11 border-gray-200 focus:ring-1 focus:ring-blue-600">
                                            <SelectValue placeholder="Choose a registered enterprise" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company.companyName}>
                                                        {company.companyName}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <div 
                                        onClick={() => navigate("/admin/companies/create")}
                                        className="h-11 border border-dashed border-red-300 bg-red-50/50 rounded-md flex items-center justify-center cursor-pointer text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
                                    >
                                        + Register a company first
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className='space-y-2 md:col-span-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <FileText className='w-4 h-4 text-blue-600' /> Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Brief overview of the role, core responsibilities..."
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                            {/* Requirements */}
                            <div className='space-y-2 md:col-span-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <FileText className='w-4 h-4 text-blue-600' /> Requirements
                                </Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. React, Node.js, TypeScript (Comma separated)"
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                            {/* Salary */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <DollarSign className='w-4 h-4 text-blue-600' /> Salary (LPA)
                                </Label>
                                <Input
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    placeholder="e.g. 12"
                                    onChange={changeEventHandler}
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                            {/* Location */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <MapPin className='w-4 h-4 text-blue-600' /> Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    placeholder="e.g. Bangalore / Remote"
                                    onChange={changeEventHandler}
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                            {/* Job Type */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <Clock className='w-4 h-4 text-blue-600' /> Job Type
                                </Label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    placeholder="e.g. Full Time, Part Time"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                            {/* Experience Level */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <Users className='w-4 h-4 text-blue-600' /> Experience Level (Years)
                                </Label>
                                <Input
                                    type="number"
                                    name="experience"
                                    placeholder="e.g. 2"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                            {/* No of Position */}
                            <div className='space-y-2 md:col-span-2'>
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <Users className='w-4 h-4 text-blue-600' /> Number of Open Positions
                                </Label>
                                <Input
                                    type="number"
                                    name="position"
                                    placeholder="e.g. 3"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className="h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1"
                                />
                            </div>

                        </div>

                        {/* Submit Actions */}
                        <div className="pt-4">
                            {loading ? (
                                <Button disabled className="w-full h-12 bg-blue-600 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                                    <Loader2 className='w-5 h-5 animate-spin' /> Publishing Job...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.99]">
                                    Post New Job
                                </Button>
                            )}
                        </div>

                        {companies.length === 0 && (
                            <p className='text-xs text-red-500 font-medium text-center cursor-pointer hover:underline mt-2' onClick={() => navigate("/admin/companies/create")}>
                                * Please register a company first before publishing listings
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob