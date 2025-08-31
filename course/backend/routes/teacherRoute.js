import express from 'express'
import { teacherList, loginTeacher, appointmentsTeacher, appointmentCancel, appointmentComplete, teacherDashboard, teacherProfile, updateTeacherProfile } from '../controllers/teacherController.js'
import authTeacher from '../middlewares/authTeacher.js'

const teacherRouter = express.Router()

teacherRouter.get('/list', teacherList)
teacherRouter.post('/login', loginTeacher)
teacherRouter.get('/appointments', authTeacher, appointmentsTeacher)
teacherRouter.post('/complete-appointment', authTeacher, appointmentComplete)
teacherRouter.post('/cancel-appointment', authTeacher, appointmentCancel)
teacherRouter.get('/dashboard', authTeacher, teacherDashboard)
teacherRouter.get('/profile', authTeacher, teacherProfile)
teacherRouter.post('/update-profile', authTeacher, updateTeacherProfile)


export default teacherRouter

