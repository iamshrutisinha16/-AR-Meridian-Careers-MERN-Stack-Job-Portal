import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import ExploreCities from './ExploreCities'
import RoleCategorySection from './RoleCategorySection'
import TrustAndCompanies from './TrustAndCompanies'
import LatestJobs from './LatestJobs'
import AppPromotionBanner from './AppPromotionBanner'
import FaqSection from './FaqSection'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Home = () => {

  const naviagte = useNavigate();
  useGetAllJobs();
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === "recruiter") {
      naviagte("/admin/companies");
    }
    


  }, [user, naviagte])


  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <ExploreCities />
      <RoleCategorySection />
      <TrustAndCompanies />
      <LatestJobs />
      <AppPromotionBanner />
      <FaqSection />
      <Footer />

    </div>
  )
}

export default Home
