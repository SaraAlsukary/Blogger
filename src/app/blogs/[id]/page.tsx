import { assets } from '@/assets/assets'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getBlogs } from '@/lib/queries/getBlogs'
import Image from 'next/image'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = await params
  const index = parseInt(unwrappedParams.id)
  const data = await getBlogs(index)

  if (!data) {
    return <div>Blog not found</div>
  }

  return (data ?
    <>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <Header />
        <div className="text-center my-24">
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>
            {data.blogs.title}
          </h1>
          <Image src={data.users.image!} alt='' width={60} height={60} className='mx-auto mt-6 border border-white rounded-full' />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.users.name}</p>
        </div>
      </div>
      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image src={data.blogs.image!} width={1200} height={720} alt='' className='border-4 border-white ' />
        <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
        <p>{data.blogs.description}</p>
        <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self Reflection and Goad Setting</h3>
        <p className='my-3'>Before you can manage your lifestyle, You must have a clear understanding of what you want to achieve. Start by reflection on your value.</p>
        <p className='my-3'>Before you can manage your lifestyle, You must have a clear understanding of what you want to achieve. Start by reflection on your value.</p>
        <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self Reflection and Goad Setting</h3>
        <p className='my-3'>Before you can manage your lifestyle, You must have a clear understanding of what you want to achieve. Start by reflection on your value.</p>
        <p className='my-3'>Before you can manage your lifestyle, You must have a clear understanding of what you want to achieve. Start by reflection on your value.</p>
        <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self Reflection and Goad Setting</h3>
        <p className='my-3'>Before you can manage your lifestyle, You must have a clear understanding of what you want to achieve. Start by reflection on your value.</p>
        <p className='my-3'>Before you can manage your lifestyle, You must have a clear understanding of what you want to achieve. Start by reflection on your value.</p>
        <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
        <p className='my-3'>Before you can manage your lifestyle, You must have a clear understanding of what you want to achieve. Start by reflection on your value.</p>
        <div className="my-24">
          <p className='text-black font font-semibold my-4'>Share this article on social media</p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt={""} />
            <Image src={assets.twitter_icon} width={50} alt={""} />
            <Image src={assets.googleplus_icon} width={50} alt={""} />
          </div>
        </div>

      </div>
      <Footer />
    </> : <></>
  )
}

export default Page