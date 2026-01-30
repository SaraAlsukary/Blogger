import React from 'react'

const Loading = () => {
    return (
        <div className='flex gap-3 justify-center py-30 items-center'>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" ></div >
            <p className='text-xl'>Loading...</p>
        </div>
    )
}

export default Loading