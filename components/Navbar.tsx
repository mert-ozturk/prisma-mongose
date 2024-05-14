'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import React, { useEffect, useRef, useState } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'

interface Props {
  openNav:()=>void
   
}

const Navbar = ({openNav}:Props) => {
  const {status,data: session } = useSession()

  const [isPopupVisible,setIsPopupVisible] = useState(false)
  const popupRef = useRef<HTMLDivElement| null>(null);

  useEffect(()=>{
    const handleClickOutside = (e:MouseEvent) => {
      if(popupRef.current && !popupRef.current.contains(e.target as Node)){
        setIsPopupVisible(false)
      }
    };

    document.addEventListener("click",handleClickOutside);

    if(!isPopupVisible){
      document.removeEventListener("click",handleClickOutside);
    }

    return () => {
      document.removeEventListener("click",handleClickOutside);
    }
  },[isPopupVisible]);
 

  return (
    <div className='h-[13vh] bg-white' >
       <div className='flex items-center justify-between w-[90%] xl:w-[80%] h-full mx-auto'>
        <Link href='/' className='text-[35px] font-semibold text-red-600'>
        RED <span>Mars</span>
        
        </Link>
        
        <ul className='lg:flex hidden text-black items-center space-x-6 xl:space-x-10'>
            
            <li className='navlink'>
                <Link href="/" >Home</Link>
            </li>
            <li className='navlink text'> 
                <Link href="/dashboard" >Dashboard</Link>
            </li>
            <li className='navlink text'> 
                <Link href="/contact" >Contact</Link>
            </li>
            
          
           
        </ul>
        
            
            {!session ? (
            <> 
            <div className="flex justify-between max-w-2xl mx-auto px-4 py-4"> 
            <Link href='/login' className="border-2 rounded-full px-4 py-2 ml-4">
                Login
            </Link>
             
            
            <Link href='/register' className="bg-red-600 rounded-full px-4 py-2 text-white">
                Register
            </Link>
            </div>
            </>
          ):(
            <>
                <div
          ref={popupRef}          
          className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg
          rounded-md flex flex-col  gap-2 text-right min-w-[160px]  
           ${isPopupVisible ? 'flex' : 'hidden' } `}> 
          <div className='font-bold'>{session?.user?.name}</div>
          <div className=''>{session?.user?.email}</div>
           
          <Link 
          onClick={()=>setIsPopupVisible(false)}
          className='hover:underline' href={'/dashboard'}>Dashboard</Link>
          <Link
          onClick={()=>setIsPopupVisible(false)}
          className='hover:underline' href={'create-post'}>Create Post</Link>
         <button onClick={()=>{signOut() }} 
                className='p-2 px-5 mb-[2rem] bg-red-600 rounded'>
                    Logout
                </button>
          </div>

          

          <div className='flex gap-2 items-center'>
            <Link 
            className='hidden md:flex gap-2 items-center mr-6' href={'/create-post'}>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

            </span>
            <span>Create new</span>
            </Link>
            <Image src={session?.user?.image || ""} 
            width={36} height={36}
            alt="Profile Image"
            className="rounded-full cursor-pointer"
            onClick={()=>setIsPopupVisible((prev)=>!prev )}
            />
          </div>
          
            </>
          )}
          <HiBars3BottomRight onClick={openNav} className='w-[2rem] text-red-900 h-[2rem] lg:hidden' />
       </div>
    </div>
  )
}

export default Navbar