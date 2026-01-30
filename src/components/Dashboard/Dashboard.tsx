'use client'
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Dashboard/Sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

const Dashboard = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [hide, setHide] = useState(false);
    const hideHandler = () => {
        setHide(!hide)
    }
    return (
        <>
            <Sidebar hide={hide} hideHandler={hideHandler} />
            <div className={`flex flex-col w-full `}>
                <div className="flex items-center justify-between w-full py-3 h-[61px] px-12 border-b border-black">
                    <div className="flex items-center">
                        {hide && <Image src={assets.arrow} width={20} alt="" className="cursor-pointer" onClick={hideHandler} />}
                        <h3 className="font-medium">Dashboard Panel</h3>
                    </div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
                {children}
            </div>
        </>
    )
}

export default Dashboard