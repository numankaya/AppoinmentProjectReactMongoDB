import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const AddTeacher = () => {

    const [teacherImg, setTeacherImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General Physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            
            if (!teacherImg) {
                return toast.error("Image Not Selected")
            }

            const formData = new FormData()

            formData.append('image',teacherImg)
            formData.append('name', name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            // console.log(formdata)
            formData.forEach((value, key)=>{
                console.log(`${key} : ${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-teacher',formData, {headers:{ aToken }})

            if (data.success) {
                toast.success(data.message)
                setTeacherImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')

            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>
                Add Teacher
            </p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor='teacher-img'>
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={teacherImg ? URL.createObjectURL(teacherImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=> setTeacherImg(e.target.files[0])} type="file" id="teacher-img" hidden />
                    <p>Upload teacher <br />picture</p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Öğretmen İsim</p>
                            <input onChange={(e)=> setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='İsim' required />
                        </div>

                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <p>Öğretmen Email</p>
                            <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <p>Öğretmen Şifre</p>
                            <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Şifre' required />
                        </div>

                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <p>Deneyim</p>
                            <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="">
                                <option value="1 Yıl">1 Yıl</option>
                                <option value="2 Yıl">2 Yıl</option>
                                <option value="3 Yıl">3 Yıl</option>
                                <option value="4 Yıl">4 Yıl</option>
                                <option value="5 Yıl">5 Yıl</option>
                                <option value="6 Yıl">6 Yıl</option>
                                <option value="7 Yıl">7 Yıl</option>
                                <option value="8 Yıl">8 Yıl</option>
                                <option value="9 Yıl">9 Yıl</option>
                                <option value="10 Yıl">10 Yıl</option>
                            </select>
                        </div>

                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <p>Ücret</p>
                            <input onChange={(e)=> setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Ücret' required />
                        </div>
                    </div>


                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Alan</p>
                            <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="">
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">General Physician</option>
                            </select>
                        </div>
                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <p>Eğitim</p>
                            <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Eğitim' required />
                        </div>
                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <p>Adres</p>
                            <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Adres 1' required />
                            <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Adres 2' required />
                        </div>
                    </div>
                </div>
                <div>
                    <p className='mt-4 mb-2'>Öğretmen Hakkında</p>
                    <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' type="text" placeholder='Öğretmen hakkında bilgi giriniz' rows={5} required />
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Öğretmen Ekle</button>
            </div>
        </form>
    )
}

export default AddTeacher