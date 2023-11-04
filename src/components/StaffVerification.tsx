'use client'

import { verifyCustomer, verifyStaff } from '../backend'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import Logo from './Logo'
import StaffDetailsModal from './StaffDetailsModal'
import { useState } from 'react'
import { GrStatusGood } from 'react-icons/gr'
import Link from 'next/link'
import Modal from './Modal'
import { FaTimes } from 'react-icons/fa'

const StaffVerificationSchema = z.object({
  fullname: z.string().min(1, { message: 'Enter your full name' }),
})

export type StaffVerificationSchemaType = z.infer<
  typeof StaffVerificationSchema
>

const StaffVerification = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const params = useSearchParams()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffVerificationSchemaType>({
    resolver: zodResolver(StaffVerificationSchema),
  })

  const mutation = useMutation({
    mutationFn: verifyStaff,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      if (response.status) {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    },
  })

  async function onSubmit(data: StaffVerificationSchemaType) {
    mutation.mutate(data)
  }
  return (
    <>
      <p className='mt-3 text-sm text-center text-gray-700'>
        If you do not know your details,{' '}
        <span
          onClick={() => {
            setModalOpen(true)
          }}
          className='text-orange-700 cursor-pointer font-bold '
        >
          Retreive{' '}
        </span>
      </p>

      <Modal
        modalOpen={modalOpen}
        closeModal={() => {
          setModalOpen(true)
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative w-full max-w-4xl bg-white shadow-md rounded-lg p-8'
        >
          <FaTimes
            size={25}
            className='absolute right-8 mb-2 text-orange-600 cursor-pointer'
            onClick={() => {
              setModalOpen(false)
            }}
          />
          <Logo />
          <div className='mb-4 relative'>
            <h2 className='text-gray-700 mb-4 font-bold text-lg'>
              Retreive your Staff ID
            </h2>

            <div>
              <label
                className='block mb-2 text-sm font-medium text-gray-900'
                htmlFor='bvn'
              >
                Full Name
              </label>

              <input
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
                id='bvn'
                type='text'
                placeholder="Enter Customer's BVN"
                {...register('fullname')}
              />

              {errors.fullname?.message && (
                <div className='text-red-500 text-xs text-right font-medium'>
                  {errors.fullname?.message}
                </div>
              )}
            </div>

            <div className='mt-4 flex items-center justify-between'>
              <button
                className='bg-orange-700 hover:bg-orange-300 flex items-center justify-center text-white text-sm font-bold p-4 w-full rounded-lg'
                disabled={mutation.isPending}
                type='submit'
              >
                {mutation.isPending ? (
                  <div className='h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-orange-700 ease-linear'></div>
                ) : (
                  'Retrieve'
                )}
              </button>
            </div>
            <div className='mt-3 mb-3 font-semibold text-gray-700'>
              <p>Your details are:</p>
              <p className='mb-3'>
                Full Name: {mutation.data?.data[0].fullName}
              </p>
              <p className='mt-3'>
                {' '}
                Staff ID: {mutation.data?.data[0].staffid}
              </p>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default StaffVerification
