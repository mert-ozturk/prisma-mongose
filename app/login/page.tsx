'use client'
import SignInBtns from '@/components/SignInBtns'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
    const router = useRouter()
    const {data:session,status: sessionStatus} = useSession()
    const [data,setData] = useState({
        email:'',
        password:''
   } )

    const loginUser = async (e) => {
        e.preventDefault();
        signIn('credentials',{
            ...data,
            redirect:false,
        })
        router.push('/dashboard')
    }



    return  sessionStatus !== 'authenticated' && (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-96'>
            <h2 className='text-2xl font-semibold mb-4'>Login</h2>
            <form onSubmit={loginUser} >
                <div className='mb-4'> 
                    <div className='mb-4'>
                    
                        <label
                         htmlFor='email' 
                         className='block text-gray-700 text-sm font-bold'
                        >  Email
                        </label>
                    <input 
                    type='text' 
                    id='email' 
                    name='email ' 
                    required
                    value={data.email}
                    onChange={(e)=>{setData({...data, email:e.target.value})}}
                    className='w-full p-2 border border-gray-300 rounded' 
                    /> 
    
    
                        <label
                         htmlFor='password' 
                         className='block text-gray-700 text-sm font-bold'
                        >  Password
                        </label>
                    <input 
                    type='password' 
                    id='password' 
                    name='password ' 
                    required
                    value={data.password}
                    onChange={(e)=>{setData({...data, password:e.target.value})}}
                    className='w-full p-2 border border-gray-300 rounded' 
                    /> 
    
                        
                    </div>
                <div>
                    <button type='submit' className='mb-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-red-500 '>Login</button>
                </div>
                    <span>
                        {" "}
                        Allready have account? {" "}
                        <Link className='text-center text-blue-500 hover:underline mt-2' href="/register">
                        Register
                        </Link>
                    </span>
                    <SignInBtns />
                </div>
            </form>
           
            </div>
        </div>
  )
}

export default Login
