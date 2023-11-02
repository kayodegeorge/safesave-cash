'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LeftHandSide from '../components/LeftHandSide'
import Logo from '../components/logo'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { resetPassword } from '../backend'

const ResetPasswordSchema = z.object({
  userID: z.string().nonempty('User ID is required'),
  newPassword: z.string().nonempty('Password is required'),
  confirmPassword: z.string().nonempty(' Password is required'),
})

type ResetPasswordScehemaType = z.infer<typeof ResetPasswordSchema>

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: reset, isLoading } = useQuery({
    queryKey: ['reset-password'],
    queryFn: resetPassword,
  })

  const formOptions = { resolver: zodResolver(ResetPasswordSchema) }
  const { register, handleSubmit, formState } =
    useForm<ResetPasswordScehemaType>(formOptions)
  const { errors } = formState as any
  return (
    <main className='grid grid-cols-2 h-screen'>
      {/* left hand side */}
      <div className='hidden md:flex justify-center items-center bg-red-100'>
        <LeftHandSide />
      </div>
      {/* right hand side */}
      <div className='flex justify-center items-center bg-gray-100'>
        <div className='px-10 sm:px-20'>
          <Logo />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4'
          >
            <div className='mb-4 relative'>
              <h1 className='text-black font-semibold px-4 py-3'>
                Reset your Password
              </h1>
            </div>

            <div className='mb-6 relative'>
              <label className='text-gray-700 font-semibold' htmlFor='UserID'>
                Enter StaffID
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.UserID ? 'is-invalid' : ''}`}
                id='UserID'
                type='text'
                {...register('UserID')}
                placeholder={errors.UserID ? '' : 'Enter StaffID'}
              />
              <div
                aria-live='polite'
                className='text-red-500 text-xs italic text-right font-bold'
              >
                {errors.UserID?.message}
              </div>
            </div>
            <div className='mb-6 relative'>
              <label
                className='text-gray-700 font-semibold'
                htmlFor='newPassword'
              >
                Enter New Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.newPassword ? 'is-invalid' : ''}`}
                id='newPassword'
                type='password'
                {...register('newPassword')}
                placeholder={errors.newPassword ? '' : 'Enter new Password'}
              />

              <div
                aria-live='polite'
                className='text-red-500 text-xs italic text-right font-bold'
              >
                {errors.newPassword?.message}
              </div>
            </div>
            <div className='mb-6 relative'>
              <label htmlFor='gender' className='text-gray-700 font-semibold'>
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.newPassword ? 'is-invalid' : ''}`}
                id='newPassword'
                type='password'
                {...register('newPassword')}
                placeholder={errors.confirmPassword ? '' : 'Confirm Password'}
              />
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
        <div className='p-4'>
          <div className='mt-4 flex justify-center font-semibold text-gray-700'>
            <p>
              PN: This platform is only designated for Astra-Polaris Marketers.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResetPassword
