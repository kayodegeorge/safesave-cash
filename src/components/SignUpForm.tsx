'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { registerStaff } from '../backend'
import Logo from './Logo'
import { useState } from 'react'
import StaffVerification from './StaffVerification'

const SignUpSchema = z.object({
  password: z.string().min(6, { message: 'Must be at least 6 characters' }),
  phoneNumber: z.string().min(1, { message: 'Field required' }),
  staffID: z.string().min(1, { message: 'Field required' }),
  staffName: z.string().min(1, { message: 'Field required' }),
  branch: z.string().min(1, { message: 'Field required' }),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>

export const SignUpForm = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  })

  const mutation = useMutation({
    mutationFn: registerStaff,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      if (response.status) {
        toast.success(response.message)
        router.push('/')
      } else {
        toast.error(response.message)
      }
    },
  })

  async function onSubmit(data: SignUpSchemaType) {
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-md bg-white shadow-md rounded-lg p-8'
    >
      <Logo />
      <div className='mb-4 relative'>
        <h2 className='text-gray-700 mb-4 font-bold text-lg'>Get Started</h2>
      </div>

      <div>
        <label
          className='block mb-2 text-sm font-medium text-gray-900'
          htmlFor='staffName'
        >
          Staff Name
        </label>

        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
          id='staffName'
          type='text'
          placeholder='Enter Staff Name'
          {...register('staffName')}
        />

        {errors.staffName?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.staffName?.message}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <label
          className='block text-sm font-medium text-gray-900'
          htmlFor='staffID'
        >
          Staff ID
        </label>

        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
          id='staffID'
          type='text'
          placeholder='Enter Staff ID'
          {...register('staffID')}
        />

        {errors.staffID?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.staffID?.message}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <label
          className='block mb-2 text-sm font-medium text-gray-900'
          htmlFor='phoneNumber'
        >
          Phone Number
        </label>

        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
          id='phoneNumber'
          type='text'
          placeholder='Enter Phone Number'
          {...register('phoneNumber')}
        />

        {errors.phoneNumber?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.phoneNumber?.message}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <label
          className='block mb-2 text-sm font-medium text-gray-900'
          htmlFor='branch'
        >
          Branch
        </label>

        <select
          id='branch'
          {...register('branch')}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
        >
          <option value='headoffice'>Head Office</option>
          <option value='onikolobo'>Onikolobo</option>
          <option value='adigbe'>Adigbe</option>
          <option value='onikoko'>Onikoko</option>
          <option value='lafenwa'>Lafenwa</option>
          <option value='obantoko'>Obantoko</option>
          <option value='kuto'>Kuto</option>
          <option value='akute'>Akute</option>
          <option value='berger'>Berger</option>
          <option value='imeko'>Imeko</option>
          <option value='ayetoro'>Ayetoro</option>
          <option value='idiayunre'>Idi Ayunre</option>
          <option value='obafe'>Obafe</option>
          <option value='ota'>Ota</option>
          <option value='ogunmakin'>Ogunmakin</option>
        </select>

        {errors.branch?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.branch?.message}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <label
          className='block mb-2 text-sm font-medium text-gray-900'
          htmlFor='password'
        >
          Password
        </label>

        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
          id='password'
          type='password'
          {...register('password')}
        />

        {errors.password?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.password?.message}
          </div>
        )}
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <button
          className='bg-orange-700 hover:bg-orange-300 flex items-center justify-center text-white text-sm font-bold p-4 w-full rounded-lg'
          type='submit'
        >
          {mutation.isPending ? (
            <div className='h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-orange-700 ease-linear'></div>
          ) : (
            'Register'
          )}
        </button>
      </div>

      <p className='text-sm text-center mt-4 text-gray-700'>
        Already have an account?{' '}
        <Link href='/' className='font-bold text-orange-700'>
          Login
        </Link>
      </p>

      <StaffVerification />
    </form>
  )
}
export default SignUpForm
