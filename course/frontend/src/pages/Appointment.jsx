import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedTeachers from '../components/RelatedTeachers'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { teacherId } = useParams()
  const { teachers, currencySymbol, backendUrl, token, getTeachersData } = useContext(AppContext)
  const daysOfWeek = ['PAZ', 'PTESİ', 'SALI', 'ÇAR', 'PER', 'CUMA', 'CTESİ']

  const navigate = useNavigate()

  const [teacherInfo, setTeacherInfo] = useState(null)
  const [teacherSlots, setTeacherSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchTeacherInfo = async () => {
    const teacherInfo = teachers.find(teacher => teacher._id === teacherId)
    setTeacherInfo(teacherInfo)
  }

  const getAvailableSlots = async () => {
    setTeacherSlots([])

    // getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(24, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(0)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '/' + month + '/' + year
        const slotTime = formattedTime

        const isSlotAvailable = teacherInfo.slots_booked[slotDate] && teacherInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }



        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setTeacherSlots(prev => ([...prev, timeSlots]))
    }
  }


  const bookAppointment = async () => {

    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {

      const date = teacherSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "/" + month + "/" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { teacherId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getTeachersData()
        navigate('/my-appointments')
      } else {

        toast.error(data.message)


      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchTeacherInfo()
  }, [teachers, teacherId])

  useEffect(() => {
    getAvailableSlots()
  }, [teacherInfo])

  useEffect(() => {
    //console.log(teacherSlots)
  }, [teacherSlots])

  return teacherInfo && (
    <div>
      {/* ----------------- Teacher Details ------------------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={teacherInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* --------------- Teacher Info : name, degree, experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {teacherInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>
              {teacherInfo.degree} - {teacherInfo.speciality}
            </p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {teacherInfo.experience}
            </button>
          </div>

          {/* --------------- Teacher About ---------------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              Hakkında <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {teacherInfo.about}
            </p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Ders Ücreti: <span className='text-gray-600'>{currencySymbol} {teacherInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* --------------  Booking Slots ---------------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Ders Saatleri</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            teacherSlots.length && teacherSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {teacherSlots.length && teacherSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Ders rezerve et</button>
      </div>
      {/* --------- Listing Related Teachers --------- */}
      <RelatedTeachers speciality={teacherInfo.speciality} teacherId={teacherId} />
    </div>
  )
}

export default Appointment