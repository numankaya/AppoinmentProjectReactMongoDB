import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddTeacher from './pages/Admin/AddTeacher';
import TeachersList from './pages/Admin/TeachersList';
import { TeacherContext } from './context/TeacherContext';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherAppointments from './pages/Teacher/TeacherAppointments';
import TeacherProfile from './pages/Teacher/TeacherProfile';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {tToken} = useContext(TeacherContext)

  return aToken || tToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard />}></Route>
          <Route path='/all-appointments' element={<AllAppointments />}></Route>
          <Route path='/add-teacher' element={<AddTeacher />}></Route>
          <Route path='/teacher-list' element={<TeachersList />}></Route>
          
          {/* Teacher Route */}
          <Route path='/teacher-dashboard' element={<TeacherDashboard />}></Route>
          <Route path='/teacher-appointments' element={<TeacherAppointments />}></Route>
          <Route path='/teacher-profile' element={<TeacherProfile />}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App