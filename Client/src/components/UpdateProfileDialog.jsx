import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText, Sparkles, Code2, Info } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('fullname', input.fullname);
            formData.append('email', input.email);
            formData.append('phoneNumber', input.phoneNumber);
            formData.append('bio', input.bio);
            formData.append('skills', input.skills);
            if (input.file && typeof input.file !== 'string') {
                formData.append('file', input.file);
            }

            const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            })

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success("Profile updated successfully!");
                setOpen(false);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[525px] bg-white rounded-2xl p-6 shadow-2xl border border-gray-100" onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#FFB703]" /> Update Profile
                    </DialogTitle>
                    <p className="text-xs text-gray-500">Make changes to your professional profile and resume info here.</p>
                </DialogHeader>

                <form onSubmit={submitHandler} className="mt-4">
                    <div className='grid gap-4 py-2 max-h-[65vh] overflow-y-auto px-1'>
                        
                        {/* Name */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right text-sm font-semibold text-gray-700 flex items-center justify-end gap-1">
                                <User className="w-4 h-4 text-[#0284C7]" /> Name
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3 border-gray-200 focus-visible:ring-[#0284C7]"
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                value={input.fullname}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Email */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right text-sm font-semibold text-gray-700 flex items-center justify-end gap-1">
                                <Mail className="w-4 h-4 text-[#0284C7]" /> Email
                            </Label>
                            <Input
                                id="email"
                                className="col-span-3 border-gray-200 focus-visible:ring-[#0284C7]"
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className="text-right text-sm font-semibold text-gray-700 flex items-center justify-end gap-1">
                                <Phone className="w-4 h-4 text-[#0284C7]" /> Phone
                            </Label>
                            <Input
                                id="number"
                                className="col-span-3 border-gray-200 focus-visible:ring-[#0284C7]"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Bio */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right text-sm font-semibold text-gray-700 flex items-center justify-end gap-1">
                                <Info className="w-4 h-4 text-[#0284C7]" /> Bio
                            </Label>
                            <Input
                                id="bio"
                                className="col-span-3 border-gray-200 focus-visible:ring-[#0284C7]"
                                name="bio"
                                placeholder="Short professional summary"
                                value={input.bio}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Skills */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right text-sm font-semibold text-gray-700 flex items-center justify-end gap-1">
                                <Code2 className="w-4 h-4 text-[#0284C7]" /> Skills
                            </Label>
                            <Input
                                id="skills"
                                className="col-span-3 border-gray-200 focus-visible:ring-[#0284C7]"
                                name="skills"
                                placeholder="HTML, CSS, JavaScript (comma separated)"
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Resume File */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right text-sm font-semibold text-gray-700 flex items-center justify-end gap-1">
                                <FileText className="w-4 h-4 text-[#0284C7]" /> Resume
                            </Label>
                            <Input
                                id="file"
                                className="col-span-3 border-gray-200 cursor-pointer file:text-[#0284C7] file:font-semibold"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                            />
                        </div>

                    </div>

                    <DialogFooter className="mt-6">
                        {
                            loading ? (
                                <Button disabled className="w-full bg-[#0284C7] text-white font-semibold py-2.5 rounded-xl">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full bg-[#0284C7] hover:bg-[#0270a8] text-white font-semibold py-2.5 rounded-xl cursor-pointer shadow-md transition-all">
                                    Save Changes
                                </Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog