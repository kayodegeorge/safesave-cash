'use client'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Logo } from './logo'
import Link from 'next/link'

const LoginForm = () => {
  const validationSchema = yup.object().shape({
    userName: yup.string().required('Username cannot be empty'),
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
          className='bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4'
        >
          <div className='mb-4 relative'>
            <label className='sr-only' htmlFor='username'>
              User Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.userName ? 'is-invalid' : ''}`}
              id='username'
              type='text'
              {...register('userName')}
              placeholder={errors.firstName ? '' : 'Username'}
              autoComplete='given-name'
            />
            <div
              id='userNameErrorMessage'
              aria-live='polite'
              className='text-red-500 text-xs italic text-right font-bold'
            >
              {errors.userName?.message}
            </div>
          </div>

          <div className='mb-6 relative'>
            <label className='sr-only' htmlFor='password'>
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
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
            <Link href='/createCustomer'>
              <button
                aria-describedby='termsAndConditions'
                className='bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Login
              </button>
            </Link>
          </div>
          <p
            id='termsAndConditions'
            className='text-sm mb-4 text-center pt-4 text-gray-700 gap-4'
          >
            Dont have an account?
            <a href='/register' className='font-bold text-orange-700 space-y-2'>
              Register
            </a>
          </p>
        </form>
      </div>
    </>
  )
}

export default LoginForm
