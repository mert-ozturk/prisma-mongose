'use client'
import { useRouter } from 'next/navigation' 
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
 

import React from 'react'
import SignInBtns from '@/components/SignInBtns'
 

const Register = () => {
    const router = useRouter()
    const {data:session,status: sessionStatus} = useSession()
    const [data,setData] = useState({
        name:'',
        email:'',
        password:''
   } )

     const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/register', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({data})
            } )
        const userInfo = await response.json()
        console.log(userInfo)
        router.push('/login')
     }

return  sessionStatus !== 'authenticated' && (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className='bg-white p-8 rounded shadow-md w-96'>
        <h2 className='text-2xl font-semibold mb-4'>Register</h2>
        <form onSubmit={registerUser} >
            <div className='mb-4'> 
                <div className='mb-4'>
                    <label
                     htmlFor='username' 
                     className='block text-gray-700 text-sm font-bold'
                    >  Username
                    </label>
                <input 
                type='text' 
                id='username' 
                name='username ' 
                required
                value={data.name}
                onChange={(e)=>{setData({...data, name:e.target.value})}}
                className='w-full p-2 border border-gray-300 rounded' 
                /> 

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

                    <label
                     htmlFor='password-confirm' 
                     className='block text-gray-700 text-sm font-bold'
                    > Confirm Password
                    </label>
                <input 
                type='password' 
                id='password-confirm' 
                name='password-confirm ' 
                required
                value={data.password}
                onChange={(e)=>{setData({...data, password:e.target.value})}}
                className='w-full p-2 border border-gray-300 rounded' 
                /> 
                </div>
            <div>
                <button type='submit' className='mb-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-red-500 '>Register</button>
            </div>
                <span>
                    {" "}
                    Allready have account? {" "}
                    <Link className='text-center text-blue-500 hover:underline mt-2' href="/login">
                    Login
                    </Link>
                </span>
                <SignInBtns />
            </div>
        </form>
       
        </div>
    </div>

  )
}

export default Register