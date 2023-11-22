'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import Logo from './Logo'
import { VerifyCustomerResponse, verifyCustomer } from '../backend'

type Props = {
  activeStep: number
  goToNextStep: () => void
  updateCustomerData: (
    bvn: string,
    data: VerifyCustomerResponse['data']
  ) => void
}

const VerifyCustomerSchema = z.object({
  bvn: z.string().min(1, { message: 'BVN is required and must be valid' }),
  dateOfBirth: z
    .string()
    .min(1, { message: 'Date of Birth is required and must be valid' }),
  gender: z.string(),
})

export type VerifyCustomerSchemaType = z.infer<typeof VerifyCustomerSchema>

const CustomerVerificationForm = ({
  activeStep,
  goToNextStep,
  updateCustomerData,
}: Props) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCustomerSchemaType>({
    resolver: zodResolver(VerifyCustomerSchema),
  })

  const mutation = useMutation({
    mutationFn: verifyCustomer,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response, formData) => {
      if (response.status) {
        toast.success(response.message)
        updateCustomerData(formData.bvn, response.data) // update the bvn with bvn value from form and the customer data state with response
        goToNextStep() // then go to the next step (registration form)
      } else {
        toast.error(response.message)
      }
    },
  })

  async function onSubmit(data: VerifyCustomerSchemaType) {
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-md bg-white shadow-md rounded-lg p-8'
    >
      <Logo />
      <div className='mb-4 relative'>
        <h2 className='text-gray-700 mb-4 font-bold text-lg'>
          Verify Customer
        </h2>
      </div>

      <div>
        <label
          className='block mb-2 text-sm font-medium text-gray-900'
          htmlFor='bvn'
        >
          BVN
        </label>

        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
          id='bvn'
          type='text'
          placeholder="Enter Customer's BVN"
          {...register('bvn')}
        />
        <small>
          If Customer do not know their bvn, dial *565*0# on their phone to
          retrieve
        </small>

        {errors.bvn?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.bvn?.message}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <label
          className='block mb-2 text-sm font-medium text-gray-900'
          htmlFor='dateOfBirth'
        >
          Date of Birth
        </label>

        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
          id='dateOfBirth'
          type='text'
          placeholder='Year-Month-Date'
          {...register('dateOfBirth')}
        />

        {errors.dateOfBirth?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.dateOfBirth?.message}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <label
          className='block mb-2 text-sm font-medium text-gray-900'
          htmlFor='gender'
        >
          Enter Gender
        </label>

        <select
          id='gender'
          {...register('gender')}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50'
        >
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>

        {errors.gender?.message && (
          <div className='text-red-500 text-xs text-right font-medium'>
            {errors.gender?.message}
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
            'Verify'
          )}
        </button>
      </div>
    </form>
  )
}

export default CustomerVerificationForm
