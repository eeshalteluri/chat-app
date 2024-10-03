import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios'


import Button from '../components/Button'
import { signupSchema } from '../Validate/index'

const Signup = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm({resolver: zodResolver(signupSchema)})

    const [userDetails, setUserDetails] = useState(
        {
            firstName: '',
            lastName: '',
            userName: '',
            email:'',
            password:'',
        }
    )
    
    const userDetailsHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    } 

    const onSubmit = async (data) => {
        try{
            console.log('user details: ', userDetails)
            await axios.post('http://localhost:3000/api/v1/signup', userDetails)
            navigate("/signup/success")
        }catch(error){
            console.log("Error: ",error);
            setError("root", {
                message: error.response.data.message,
            })
        }
        
    }
  return (
    <div className='pageCenter shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-2/5 p-12 bg-blue-200 rounded space-y-2'>
        <input {...register("firstName")} type="text"  onChange={userDetailsHandler} placeholder='First Name' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        {errors.firstName && (<div className='text-red-400'> {errors.firstName.message}</div>)}
        <input {...register("lastName")} type="text"  onChange={userDetailsHandler} placeholder='Last Name' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        {errors.lastName && (<div className='text-red-400'> {errors.lastName.message}</div>)}
        <input {...register("userName")} type="text"  onChange={userDetailsHandler} placeholder='User Name' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        {errors.userName && (<div className='text-red-400'> {errors.userName.message}</div>)}
        <input {...register("email")} type="text"  onChange={userDetailsHandler} placeholder='Email' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        {errors.email && (<div className='text-red-400'> {errors.email.message}</div>)}
        <input {...register("password")} type="text"  onChange={userDetailsHandler} placeholder='Password' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        {errors.password && (<div className='text-red-400'> {errors.password.message}</div>)}
        <input {...register("confirmPassword")} type="text"  onChange={userDetailsHandler} placeholder='Confirm Password' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        {errors.confirmPassword && (<div className='text-red-400'> {errors.confirmPassword.message}</div>)}
        {errors.root && (<div className='text-red-400'> {errors.root.message}</div>)}
        <button disabled={isSubmitting} className=' p-1 px-auto bg-white rounded w-full hover:bg-blue-500 hover:border-none hover:text-white' type='submit'>{isSubmitting ? 'Signing Up...': 'Sign Up'}</button>
    </form>

    <p className='pt-2'>Already have an account? <Link to='/login' className='underline font-bold hover:text-blue-400'>Log In</Link></p>

    </div>
  )
}

export default Signup
