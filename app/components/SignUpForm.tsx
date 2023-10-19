'use client'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Logo } from './logo'
import { z } from 'zod'
import { registerStaff } from '../backend'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(data: SignUpSchemaType) {
    const response = await registerStaff(data)
        console.log(response)
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
              Staff Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.staffName ? 'is-invalid' : ''}`}
              id='fullname'
              type='text'
              {...register('staffName')}
              placeholder={errors.staffName ? '' : 'Staff Name'}
              autoComplete='given-name'
            />
            <div
              id='fullNameErrorMessage'
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.staffName?.message}
            </div>
          </div>
          <div className='mb-4 relative'>
            <label className='sr-only' htmlFor='staffId'>
              Staff ID
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.staffID ? 'is-invalid' : ''}`}
              id='fullname'
              type='text'
              {...register('staffID')}
              placeholder={errors.staffID ? '' : 'Staff ID'}
              autoComplete='given-name'
            />
            <div
              id='fullNameErrorMessage'
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.staffID?.message}
            </div>
          </div>

          <div className='relative mb-4'>
            <label className='sr-only' htmlFor='emailaddress'>
             Phone Number
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.email ? 'is-invalid' : ''}`}
              id='phoneNumber'
              type='number'
              {...register('phoneNumber')}
              placeholder={errors.phoneNumber ? '08019191919' : 'Phone Number'}
            />
            <div className='text-red-500 text-xs italic text-right font-bold'>
              {errors.phoneNumber?.message}
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
    
          <div className='mb-6 relative text-black'>
            <select
              className='shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='Branch'
              id='branch'
            > 
              <option value='headoffice'
              {...register('branch')}
              >Head Office</option>
              <option
                {...register('branch')} value='onikolobo'>Onikolobo</option>
              <option 
                {...register('branch')}value='adigbe'>Adigbe</option>
              <option
                {...register('branch')} value='onikoko'>Onikoko</option>
              <option
                {...register('branch')} value='lafenwa'>Lafenwa</option>
              <option
                {...register('branch')} value='obantoko'>Obantoko</option>
              <option
                {...register('branch')} value='kuto'>Kuto</option>
              <option
                {...register('branch')} value='akute'>Akute</option>
              <option
                {...register('branch')} value='berger'>Berger</option>
              <option
                {...register('branch')} value='imeko'>Imeko</option>
              <option
                {...register('branch')} value='ayetoro'>Ayetoro</option>
              <option
                {...register('branch')} value='idiayunre'>Idi Ayunre</option>
              <option
                {...register('branch')} value='obafe'>Obafe</option>
              <option
                {...register('branch')} value='ota'>Ota</option>
              <option
                {...register('branch')} value='ogunmakin'>Ogunmakin</option>
             
            </select>
            <div
            aria-live='polite' className='text-red-500 text-xs italic text-right font-bold'>
              {errors.branch?.message}
            </div>
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
            className='text-sm mb-4 text-center pt-4 text-gray-700'
          >
            Already have an account?
            <a href='/' className='font-bold text-orange-700'>
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  )
}
export default SignUpForm
