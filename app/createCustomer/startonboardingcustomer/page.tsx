'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Logo from '@/app/components/logo'

const StartOnboardingCustomer = () => {
  const validationSchema = yup.object().shape({
    customerHomeAddress: yup.string().required('Field cannot be empty'),
    customerEmail: yup
      .string()
      .required('Looks like this is not an email')
      .email('this email address is invalid'),
    customerPhoneNo: yup.string().required('Must be at least 11 characters'),
  })

  // get functions to build form with useForm() hook
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState as any

  // function onSubmit(data: any) {
  //   alert('Onboarding successful')
  //   return false
  // }
  return (
    <>
      <main className='flex flex-col sm:flex-row w-full justify-center items-center min-h-screen text-[16px] font-poppins text-white bg-red-400 bg-cover bg-[url(../public/astra-plain-min.jpg)] sm:bg-[url(../public/astra-plain-min.jpg)]'>
        <div className='px-10 sm:px-20'>
          <Logo />
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className='bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4'
          >
            <h1 className='text-black font-semibold px-4 py-3'>
              Customer Onboarding Portal
            </h1>
            <div className='mb-4 relative'>
              <label className='text-black' htmlFor='fullname'>
                FullName:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder=' Mohammed Ali'
                disabled
              />
            </div>
            <div className='mb-4 relative'>
              <label className='text-black' htmlFor='fullname'>
                BVN:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='2222222222'
                disabled
              />
            </div>

            <div className='mb-4 relative'>
              <label className='text-black' htmlFor='fullname'>
                Gender:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Female'
                disabled
              />
            </div>

            <div className='mb-4 relative'>
              <label className='text-black' htmlFor='fullname'>
                DOB:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='11/10/1990'
                disabled
              />
            </div>

            <div className='mb-4 relative'>
              <label className='sr-only' htmlFor='address'>
                Address
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.userName ? 'is-invalid' : ''}`}
                id='customerHomeAddress'
                type='text'
                {...register('customerHomeAddress')}
                placeholder={errors.firstName ? '' : 'Customer Home Address'}
                autoComplete='given-name'
              />
              <div
                id='customerHomeAddressErrorMessage'
                aria-live='polite'
                className='text-red-500 text-xs italic text-right font-bold'
              >
                {errors.customerHomeAddress?.message}
              </div>
            </div>

            <div className='relative mb-4'>
              <label className='sr-only' htmlFor='emailaddress'>
                Email Address
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.email ? 'is-invalid' : ''}`}
                id='customeremailaddress'
                type='email'
                {...register('customerEmail')}
                placeholder={
                  errors.email ? 'email@example/com' : 'Customer Email Address'
                }
                autoComplete='email'
              />
              <div className='text-red-500 text-xs italic text-right font-bold'>
                {errors.customerEmail?.message}
              </div>
            </div>

            <div className='relative mb-4'>
              <label className='sr-only' htmlFor='customerPhoneNo'>
                Phone No
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.lastName ? 'is-invalid' : ''}`}
                id='phoneNo'
                type='number'
                {...register('customerPhoneNo')}
                placeholder={errors.lastName ? '' : 'Customer Phone No'}
                autoComplete='family-name'
              />
              <div
                aria-live='polite'
                className='text-red-500 text-xs italic text-right font-bold'
              >
                {errors.customerPhoneNo?.message}
              </div>
            </div>

            <div className='flex items-center justify-between mt-5'>
              <button
                data-modal-target='popup-modal'
                data-modal-toggle='popup-modal'
                aria-describedby='onboardCustomer'
                className='bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Confirm User Details
              </button>

              {/* modal */}
              <div
                id='popup-modal'
                tabIndex={-1}
                className='fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
              >
                <div className='relative w-full max-w-md max-h-full'>
                  <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                    <button
                      type='button'
                      className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                      data-modal-hide='popup-modal'
                    >
                      <svg
                        className='w-3 h-3'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 14'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                        />
                      </svg>
                      <span className='sr-only'>Close modal</span>
                    </button>
                    <div className='p-6 text-center'>
                      <svg
                        className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                      </svg>
                      <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                        Are you sure you want to delete this product?
                      </h3>
                      <button
                        data-modal-hide='popup-modal'
                        type='button'
                        className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        data-modal-hide='popup-modal'
                        type='button'
                        className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default StartOnboardingCustomer
