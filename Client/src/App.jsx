 import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Enquiries from './components/admin/Enquiries'
import JobApplicants from './components/admin/JobApplicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminDashboard from './components/admin/AdminDashboard' 
import Database from './components/admin/Database'
import Credits from './components/admin/Credits'

function App() {
  // Redux se user state nikal rahe hain
  const { user } = useSelector(store => store.auth);

  const appRouter = createBrowserRouter([
    // Student & Public Routes (Login check ke sath)
    {
      path: '/',
      element: user ? <Home /> : <Navigate to="/login" replace />
    },
    {
      path: '/login',
      element: !user ? <Login /> : <Navigate to="/" replace />
    },
    {
      path: '/signup',
      element: !user ? <Signup /> : <Navigate to="/" replace />
    },
    {
      path: "/jobs",
      element: user ? <Jobs /> : <Navigate to="/login" replace />
    },
    {
      path: "/description/:id",
      element: user ? <JobDescription /> : <Navigate to="/login" replace />
    },
    {
      path: "/browse",
      element: user ? <Browse /> : <Navigate to="/login" replace />
    },
    {
      path: "/profile",
      element: user ? <Profile /> : <Navigate to="/login" replace />
    },

    // Admin / Recruiter Routes (ProtectedRoute component handle karega)
    {
      path: "/admin/dashboard",
      element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
    },
    {
      path: "/admin/companies",
      element: <ProtectedRoute><Companies /></ProtectedRoute>
    },
    {
      path: "/admin/companies/create",
      element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
    },
    {
      path: "/admin/companies/:id", // Yeh aapka Company Setup / Edit page hai
      element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
    },
    {
      path: "/admin/jobs",
      element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
    },
    {
      path: "/admin/database",
      element: <ProtectedRoute><Database /></ProtectedRoute>
    },
    {
      path: "/admin/credits",
      element: <ProtectedRoute><Credits /></ProtectedRoute>
    },
    {
      path: "/admin/jobs/create",
      element: <ProtectedRoute><PostJob /></ProtectedRoute>
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <ProtectedRoute><JobApplicants /></ProtectedRoute>
    },
    {
      path: "/admin/enquiries",
      element: <ProtectedRoute><Enquiries /></ProtectedRoute>
    }
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App