'use client'
import Logo from './Logo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { resetPassword } from '../backend'

const ResetPasswordSchema = z.object({
  userID: z.string().min(1, { message: 'Field required' }),
  newPassword: z.string().min(6, { message: 'Must be at least 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Must be at least 6 characters' }),
})

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

const ResetPasswordForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const mutation = useMutation({
    mutationFn: resetPassword,
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

  async function onSubmit(data: ResetPasswordSchemaType) {
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-md bg-white shadow-md rounded-lg p-8'
    >
      <div className='mb-4 relative'>
        <Logo />
        <h2 className='text-gray-700 text-center mb-4 font-bold text-lg'>
          Fill the fields to Reset Password
        </h2>

        <div>
          <label
            className='block mb-2 text-sm font-medium text-gray-900'
            htmlFor='staffID'
          >
            Staff ID
          </label>

          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
            id='staffID'
            type='text'
            {...register('userID')}
          />

          {errors.userID?.message && (
            <div className='text-red-500 text-xs text-right font-medium'>
              {errors.userID?.message}
            </div>
          )}
        </div>

        <div className='mt-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900'
            htmlFor='password'
          >
            New password
          </label>

          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
            id='password'
            type='password'
            {...register('newPassword')}
          />

          {errors.newPassword?.message && (
            <div className='text-red-500 text-xs text-right font-medium'>
              {errors.newPassword?.message}
            </div>
          )}
        </div>

        <div className='mt-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900'
            htmlFor='password'
          >
            Confirm password
          </label>

          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
            id='password'
            type='password'
            {...register('confirmPassword')}
          />

          {errors.confirmPassword?.message && (
            <div className='text-red-500 text-xs text-right font-medium'>
              {errors.confirmPassword?.message}
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
              'Reset'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default ResetPasswordForm
