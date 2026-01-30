import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

const Header = () => {
    return (
        <header className='flex justify-between items-center'>
            <Link href={'/'}>
                <Image src={assets.logo} alt='logo'
                    className='w-p[130px] sm:w-auto'
                />
            </Link>
            <div className='flex gap-4 items-center'>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                        <button className="bg-black text-white text-ceramic-white rounded-xl font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
                <Link href={'/dashboard/addBlog'} className="flex item-ceter gap-2 font-meduim py-1 px-3 sm:py-3 sm:px-6 border
active:bg-gray-600 border-solid border-black shadow-[-7px_7px_0px_#000] hover:text-white hover:bg-gray-600 duration-300">
                    <SignedIn>
                        Dashboard
                    </SignedIn>
                    <SignedOut>
                        Get Started
                    </SignedOut>

                    <Image src={assets.arrow} alt='arrow' />
                </Link>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                root: "w-12 h-12",
                                avatarBox: "w-full h-full"
                            }
                        }}
                    />
                </SignedIn>

            </div>

        </header>)
}

export default Header