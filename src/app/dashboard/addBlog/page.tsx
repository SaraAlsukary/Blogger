'use client'
import { assets } from '@/assets/assets'
import { TBlog } from '@/types/dataBlogType'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'

const BlogCreationPage = () => {
  const [image, setImage] = useState<File | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState<TBlog>({
    title: '',
    description: '',
    category: 'Startup',
    author: ''
  })
  const { user } = useUser()

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
    }
  }

  const resetForm = () => {
    setData({
      title: '',
      description: '',
      category: 'Startup',
      author: ''
    });
    setImage(null);
  }
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    if (!data?.title || !data?.description || !image) {
      toast.error('Please fill all required fields');
      return;
    }
    setIsPending(true)
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category as string);
    formData.append('author', user.id);
    formData.append('image', image);

    // Use toast.promise to handle the API call
    await toast.promise(
      axios.post('/api/blogs', formData),
      {
        pending: {
          render: 'Uploading your blog...',
          icon: () => (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div>
          ),
        },
        success: {
          render({ data: responseData }) {
            return `Blog uploaded successfully!`;
          },
          // other options like icon can go here
          icon: () => <div className="text-green-500 text-lg">🟢</div>,
        },
        error: {
          render({ data: error }) {
            // When the promise rejects, data contains the error
            return `Upload failed: Please try again`;
          },
          icon: () => <div className="text-red-500 text-lg">❌</div>,
        },
      },
      {
        // Optional: Global options for the toast
        position: "top-right",
      }
    );
    setIsPending(false)
    resetForm()
  };

  return (
    <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16 relative'>
      <p className='text-xl'>Upload Thumbnail</p>
      <label htmlFor='image' className='cursor-pointer'>
        <Image
          className='mt-4'
          src={image ? URL.createObjectURL(image) : assets.upload_area}
          alt="Blog thumbnail"
          height={70}
          width={140}
        />
      </label>
      <input
        type="file"
        className='hidden'
        id='image'
        required
        onChange={handleImageChange}
        accept="image/*"
      />

      <p className='text-xl mt-4'>Blog Title</p>
      <input
        name='title'
        value={data.title}
        onChange={onChangeHandler}
        className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
        type="text"
        placeholder='Type here'
        required
        aria-required="true"
      />

      <p className='text-xl mt-4'>Blog Description</p>
      <textarea
        name='description'
        value={data.description}
        onChange={onChangeHandler}
        className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
        required
        placeholder='Type here'
        rows={6}
      />

      <p className='text-xl mt-4'>Blog Category</p>
      <select
        onChange={onChangeHandler}
        name="category"
        value={data.category}
        className='w-40 mt-4 px-4 py-3 border text-gray-500'
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />
      <button
        disabled={isPending}
        type='submit'
        className={`mt-8 w-40 h-12 text-white cursor-pointer absolute right-[100px] bottom-1 transition-colors ${isPending ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
      >
        {isPending ? 'Processing...' : "ADD"}
      </button>
    </form>
  )
}

export default BlogCreationPage
