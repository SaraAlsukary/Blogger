import { currentUser } from "@clerk/nextjs/server"
import BlogTableItemList from "@/components/Dashboard/Blog/BlogTableItemList"

export default async function Page() {
  const user = await currentUser()

  if (!user) return <div>Please sign in</div>

  return (
    <div className='flex flex-col gap-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className="text-3xl">My blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scroll-hide'>
        <table className='w-full text-sm text-gray-500 '>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50 p-2'>
            <tr>
              <th className="py-2 px-6">Blog Image</th>
              <th className="py-2 px-6">Blog Title</th>
              <th className="py-2 px-6">Date</th>
              <th className="py-2 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            <BlogTableItemList userId={user.id} />
          </tbody>
        </table>
      </div>
    </div>
  )
}