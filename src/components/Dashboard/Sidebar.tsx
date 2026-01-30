'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = ({ hide, hideHandler }: { hide: boolean, hideHandler: () => void }) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <aside className={` flex flex-col bg-slate-100 duration-75  transition-all  ${hide ? "hide" : ""}  `}>
      <div className="px-2 sm:pl-14 py-3 border border-black flex justify-between items-center ">
        <Image alt='' width={120} src={assets.logo} className='cursor-pointer' onClick={() => router.push('/')} />
        {!hide && <Image alt='' width={20} src={assets.arrow} className='cursor-pointer rotate-180' onClick={hideHandler} />}
      </div>
      <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black aside-border">
        <div className='w-[50%] sm:w-[80%] absolute right-0 btns-link'>
          <Link href={'/dashboard/addBlog'} className={`hover:translate-0.5 duration-300 ease-in flex mt-5 items-center border
           border-black gap-3 font-medium px-3 py-2 active:bg-gray-600
            active:text-white ${pathname === '/dashboard/addBlog' ?
             "bg-gray-600 text-white" : 'bg-white'} shadow-[-5px_5px_0px_#000000] `}>
            <Image src={assets.add_icon} alt="" />
            <p>Add blogs</p>
          </Link>
          <Link href={'/dashboard/blogs'} className={`flex mt-5 items-center
             border border-black gap-3 font-medium px-3 py-2 active:bg-gray-600 hover:translate-0.5 duration-300 ease-in
              active:text-white ${pathname === '/dashboard/blogs' ? "bg-gray-600 text-white" :
               'bg-white'} shadow-[-5px_5px_0px_#000000] `}>
            <Image src={assets.blog_icon} alt="" />
            <p>Blogs List</p>
          </Link>

        </div>

      </div>
    </aside>
  )
}

export default Sidebar