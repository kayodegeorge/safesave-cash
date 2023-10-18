'use client'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Logo } from './logo'
import { z } from 'zod'
import { register } from '../backend'
 const SignUpSchema = z.object({
  email:z.string(),
  password: z.string(),
  phoneNumber: z.string(),
  staffID: z.string(),
  staffName: z.string(),
  branch: z.string(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export const SignUpForm = () => {
  
  const validationSchema = yup.object().shape({
    fullName: yup.string().required('First Name cannot be empty'),
    phoneNo: yup.string().required('Field cannot be empty'),
    staffId: yup.string().required('Staff Id cannot be empty'),

    email: yup
      .string()
      .required('Looks like this is not an email')
      .email('this email address is invalid'),
    password: yup.string().required('Password cannot be empty'),
  })

  // get functions to build form with useForm() hook
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState as any
  function onSubmit(data: any) {

    alert('Thanks for signing up! You can now login.')
    return false
  }

  return (
    <>
      <div className='px-10 sm:px-20'>
        <Logo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white shadow-md rounded-lg px-20 pt-16 pb-12 mb-8 mt-5'
        >
          <div className='mb-4 relative'>
            <label className='sr-only' htmlFor='fullname'>
              Full Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.firstName ? 'is-invalid' : ''}`}
              id='fullname'
              type='text'
              {...register('fullName')}
              placeholder={errors.firstName ? '' : 'Full Name'}
              autoComplete='given-name'
            />
            <div
              id='fullNameErrorMessage'
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.fullName?.message}
            </div>
          </div>
          <div className='relative mb-4'>
            <label className='sr-only' htmlFor='phoneNo'>
              Phone No
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.lastName ? 'is-invalid' : ''}`}
              id='phoneNo'
              type='number'
              {...register('phoneNo')}
              placeholder={errors.lastName ? '' : 'Phone No'}
              autoComplete='family-name'
            />
            <div
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.phoneNo?.message}
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
              id='emailaddress'
              type='email'
              {...register('email')}
              placeholder={errors.email ? 'email@example/com' : 'Email Address'}
              autoComplete='email'
            />
            <div className='text-red-500 text-xs italic text-right font-bold'>
              {errors.email?.message}
            </div>
          </div>
          <div className='mb-6 relative'>
            <label className='sr-only' htmlFor='password'>
              Staff ID
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.password ? 'is-invalid' : ''}`}
              id='staffId'
              type='text'
              {...register('staffId')}
              placeholder={errors.password ? '' : 'Staff ID'}
            />
            <div
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.staffId?.message}
            </div>
          </div>
          <div className='mb-6 relative text-black'>
            <select
              className='shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='Branch'
              id='branch'
            >
              {' '}
              Input your branch
              <option value='head'>Head Office</option>
              <option value='head'>Onikolobo</option>
              <option value='head'>Adigbe</option>
              <option value='head'>Onikoko</option>
              <option value='head'>Lafenwa</option>
              <option value='head'>Obantoko</option>
              <option value='head'>Kuto</option>
              <option value='head'>Akute</option>
              <option value='head'>Berger</option>
              <option value='head'>Imeko</option>
              <option value='head'>Ayetoro</option>
              <option value='head'>Idi Ayunre</option>
              <option value='head'>Obafe</option>
              <option value='head'>Ota</option>
              <option value='head'>Ogunmakin</option>
            </select>
          </div>
          <div className='mb-6 relative'>
            <label className='sr-only' htmlFor='password'>
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.password ? 'is-invalid' : ''}`}
              id='password'
              type='password'
              {...register('password')}
              placeholder={errors.password ? '' : 'Password'}
            />
            <div
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.password?.message}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              aria-describedby='termsAndConditions'
              className='bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              SUBMIT
            </button>
          </div>
          <p
            id='termsAndConditions'
            className='text-sm mb-4 text-center pt-4 text-gray-700'
          >
            Already have an account?
            <a href='/login' className='font-bold text-orange-700'>
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  )
}
export default SignUpForm
