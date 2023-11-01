"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "@/app/components/logo";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { createAccount, registerCustomer } from "@/app/backend";
import {IoMdArrowRoundBack} from 'react-icons/io'
import { useState } from "react";
import Link from "next/link";
import LeftHandSide from "@/app/components/LeftHandSide";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  bvn: z.string().nonempty("Field cannot be empty") .min(11, "Must be at least 11 characters"),
  address: z.string().nonempty("Field cannot be empty"),
  branch: z.string().nonempty("Field cannot be empty"),
  phoneNumber: z
    .string()
    .min(11, "Must be at least 11 characters")
    .nonempty(),
});

export type ValidationSchemaType = z.infer<typeof validationSchema>;


export default function OnboardingPage() {
  const params = useSearchParams()
  const bvn = params.get('bvn');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()
  const { register, handleSubmit, formState } =
    useForm<ValidationSchemaType>({
      defaultValues: {
        bvn: bvn!, 
        address: "",
        phoneNumber: "",
        branch: "",
        

      },
      resolver: zodResolver(validationSchema),
    });
  const { errors } = formState;


  async function onSubmit(data: ValidationSchemaType) {
    setLoading(true)
    const registrationResponse = await registerCustomer(data)
    if (registrationResponse.status) { 
      const res = await createAccount(bvn!, data)
      console.log(res)
      console.log(data)
      if (res.status) {
     router.push('/customer-created')

      } else {
        setLoading(false);
        setError(res.message)
      }
    } else {
      setLoading(false);
      setError(registrationResponse.message)
    }

  }

  return (

    <main className="grid grid-cols-2 h-screen">
    {/* left hand side */}
    <div className="flex justify-center items-center bg-red-100">
    {/* <Image
        fill
        className='max-h-full max-w-full'
        src='/astra-masked.jpg'
        alt='Astra bank'
      /> */}
    <LeftHandSide/>
    </div>
    {/* right hand side */}
    <div className='flex justify-center items-center bg-gray-100'>
      <div className='p-4'>
      <div className="px-10 sm:px-20">
        <Logo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4"
        >

          <div className="text-gray-700 ">
           <Link className="flex" href='/create'>
           <IoMdArrowRoundBack size={22}/>
            <h1>Back</h1>
           </Link>
          </div>
          <h1 className=" font-semibold  flex justify-center text-center text-gray-700">
            Customer Onboarding Portal
          </h1>
         
          <div className="mb-4 relative">
            <label className="text-gray-700 font-semibold" htmlFor="bvn">
              BVN
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.address ? "is-invalid" : ""}`}
              id="bvn"
              type="text"
              {...register("bvn")}
              disabled
            />
          </div>

          <div className="mb-4 relative">
            <label className="text-gray-700 font-semibold" htmlFor="address">
              Address
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.address ? "is-invalid" : ""}`}
              id="address"
              type="text"
              {...register("address")}
              placeholder={
                errors.address ? "" : ""
              }
              autoComplete="given-name"
            />
            <div
              id="addressErrorMessage"
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.address?.message}
            </div>
          </div>
             
             <div className="mb-4 relative">
              <label className="text-gray-700 font-semibold" htmlFor="branch">Branch</label>
              <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.branch ? "is-invalid" : ""}`}
              id="branch"
              type="text"
              {...register("branch")}
              placeholder={errors.branch ? "" : ""}
              autoComplete="family-name"
            />
             </div>

          <div className=" mb-4 relative">
            <label className="text-gray-700 font-semibold" htmlFor="phoneNumber">
              Phone No
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.phoneNumber ? "is-invalid" : ""}`}
              id="phoneNumber"
              type="number"
              {...register("phoneNumber")}
              placeholder={errors.phoneNumber ? "" : ""}
              autoComplete="family-name"
            />
            <div
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.phoneNumber?.message}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              className="bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
               {loading ? "Loading..." : "Register and Create Account"}
            </button>

  
          </div>

          {error&& 
            <div className="text-red-500 text-xs italic text-right font-bold"
            >{error}</div>
          }
        </form>
      </div>
        <div className='mt-4 flex justify-center font-semibold text-gray-700'>
     <p>PN: This platform is only designated for Astra-Polaris Marketers.</p>
        
        </div>
      </div>
    </div>
</main>

  );
}
