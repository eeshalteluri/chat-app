import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LoginSchema } from '../Validate'
import {zodResolver} from '@hookform/resolvers/zod'


const Login = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm({resolver: zodResolver(LoginSchema)})

    const onSubmit = async (data) => {
      
        try{
            console.log(data)
            const response = await axios.post('http://localhost:3000/api/v1/login', data, {withCredentials: true});
            navigate("/chats")
        
        }catch(error){
          console.log("Login Error: ", error);
          
            setError("root", {
                message: error.message,
            })
        }
        
    }
  return (
    <div className='pageCenter shadow-xl'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-2/5 p-12 bg-blue-200 rounded space-y-2'>
        <input {...register("email")} type="text"  placeholder='Email' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        {errors.email && (<div className='text-red-400'> {errors.email.message}</div>)}
        <input {...register("password")} type="text"  placeholder='Password' className='w-full border-2 border-blue-400 rounded p-1 focus:outline-black' />
        <button disabled={isSubmitting} className=' p-1 px-auto bg-white rounded w-full hover:bg-blue-500 hover:border-none hover:text-white' type='submit'>{isSubmitting ? 'Logging In...': 'Log In'}</button>
        {errors.root && (<div className='text-red-400'> {errors.root.message}</div>)}
    </form>

    <p className='pt-2'>Don't have an account? <Link to='/signup' className='underline font-bold hover:text-blue-400'>Sign Up</Link></p>

    </div>
  )
}

export default Login
