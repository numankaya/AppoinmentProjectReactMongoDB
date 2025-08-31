import express from 'express'
import { addTeacher, allTeachers, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/teacherController.js'

const adminRouter = express.Router()

adminRouter.post('/add-teacher', authAdmin, upload.single('image'),addTeacher)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-teachers', authAdmin, allTeachers)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter