'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Logo from './logo'
import { useRouter } from 'next/navigation'
import { verifyCustomer } from '../backend'

const VerifyCustomerSchema = z.object({
  bvn: z
    .string()
    .nonempty('BVN is required and must be valid')
    .min(11, 'Must be at least 11 characters'),
  dateOfBirth: z
    .string()
    .nonempty('Date of Birth is required and must be valid'),
  gender: z.string(),
})

export type VerifyCustomerSchemaType = z.infer<typeof VerifyCustomerSchema>

const UploadBvnAndPic = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<VerifyCustomerSchemaType>({
    resolver: zodResolver(VerifyCustomerSchema),
  })

  async function onSubmit(data: VerifyCustomerSchemaType) {
    console.log(data)
    setLoading(true)
    const response = await verifyCustomer(data)
    console.log(response)

    if (response.status) {
      setLoading(false)

      router.push(`/create/onboarding?bvn=${getValues('bvn')}`)
    } else {
      setLoading(false)
      setError('Customer not found')
    }
  }

  console.log(error)
  return (
    <>
      <div className='px-10 sm:px-20'>
        <Logo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4'
        >
          <div className='mb-4 relative'>
            <h1 className='text-black font-semibold px-4 py-3'>
              Customer Onboarding Portal
            </h1>
          </div>

          <div className='mb-6 relative'>
            <label className='text-gray-700 font-semibold' htmlFor='bvn'>
              Enter BVN
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.bvn ? 'is-invalid' : ''}`}
              id='bvn'
              type='number'
              {...register('bvn')}
              placeholder={errors.bvn ? '' : 'Enter Customer BVN'}
            />
            <div
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.bvn?.message}
            </div>
          </div>
          <div className='mb-6 relative'>
            <label className='text-gray-700 font-semibold' htmlFor='dob'>
              Enter DOB
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.dateOfBirth ? 'is-invalid' : ''}`}
              id='dateOfBirth'
              type='text'
              {...register('dateOfBirth')}
              placeholder={errors.dateOfBirth ? '' : 'Enter Customer DOB'}
            />

            <div
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.dateOfBirth?.message}
            </div>
            <small className='text-gray-400'>Year-Month-Date</small>
          </div>
          <div className='mb-6 relative'>
            <label htmlFor='gender' className='text-gray-700 font-semibold'>
              Enter Gender
            </label>
            <select
              id=''
              {...register('gender')}
              className='shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>

          <div className='flex items-center justify-between mt-5'>
            <button
              aria-describedby='uploadDocuments'
              className='bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          {error && (
            <div className='text-red-500 text-xs italic text-right font-bold'>
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default UploadBvnAndPic
