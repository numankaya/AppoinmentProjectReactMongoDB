import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Teachers = () => {
  const { speciality } = useParams()
  const [filterTeacher, setFilterTeacher] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const { teachers } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterTeacher(teachers.filter(teacher => teacher.speciality === speciality))
    } else {
      setFilterTeacher(teachers)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [teachers, speciality])

  return (
    <div>
      <p className='text-gray-600'>Hocaları Derslere Göre Ara</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filtrele</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/teachers') : navigate('/teachers/General physician')} className={`w-[94vw] sm:w-auto pl-3 py1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>Matematik</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/teachers') : navigate('/teachers/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>İngilizce</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/teachers') : navigate('/teachers/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Türkçe</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/teachers') : navigate('/teachers/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Kodlama</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/teachers') : navigate('/teachers/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>İspanyolca</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/teachers') : navigate('/teachers/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Fen Bilimleri</p>
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterTeacher.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Teachers