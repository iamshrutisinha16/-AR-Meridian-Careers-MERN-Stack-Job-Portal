import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2, Calendar, AlertCircle } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const navigate = useNavigate();

    const [filterCompany, setFilterCompany] = useState([]);

    useEffect(() => {
        if (!companies) return;
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <Table>
                <TableHeader className='bg-gray-50/70 border-b border-gray-100'>
                    <TableRow className='hover:bg-transparent'>
                        <TableCell className="w-20 font-semibold text-gray-600 py-4">Logo</TableCell>
                        <TableCell className='font-semibold text-gray-600 py-4'>Company Name</TableCell>
                        <TableCell className='font-semibold text-gray-600 py-4'>Registered Date</TableCell>
                        <TableCell className="text-right font-semibold text-gray-600 py-4 pr-6">Action</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !filterCompany || filterCompany.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-40 text-center text-gray-500">
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <AlertCircle className='w-8 h-8 text-gray-400' />
                                        <p className='font-medium text-base text-gray-700'>No companies found</p>
                                        <p className='text-xs text-gray-400'>Try searching with a different keyword or register a new company.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterCompany.map((company) => (
                                <TableRow key={company._id} className='hover:bg-blue-50/30 transition-colors border-b border-gray-50 last:border-none'>
                                    <TableCell className='py-4'>
                                        <Avatar className="w-12 h-12 rounded-xl border border-gray-100 shadow-sm">
                                            <AvatarImage
                                                src={company?.logo || "https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?rs=1&pid=ImgDetMain"}
                                                alt={company?.companyName}
                                                className="object-cover"
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className='font-bold text-gray-900 text-base'>
                                        <div className='flex items-center gap-2'>
                                            <Building2 className='w-4 h-4 text-[#0284C7]' />
                                            <span>{company?.companyName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-gray-500 font-medium text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <Calendar className='w-4 h-4 text-gray-400' />
                                            <span>{company?.createdAt ? company.createdAt.split("T")[0] : 'N/A'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-gray-900 inline-flex items-center justify-center">
                                                    <MoreHorizontal className='w-5 h-5' />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-36 p-2 shadow-xl rounded-xl border-gray-100">
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                    className='flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#0284C7] cursor-pointer transition-colors font-medium text-sm'
                                                >
                                                    <Edit2 className='w-4 h-4' />
                                                    <span>Edit Profile</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable;