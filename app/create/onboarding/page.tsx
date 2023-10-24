"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Logo from "@/app/components/logo";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { createAccount, registerCustomer } from "@/app/backend";
import { useState } from "react";

const validationSchema = z.object({
  bvn: z.string().nonempty("Field cannot be empty"),
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
      const res = await createAccount(bvn!)
      if (res.status) {
        alert("Onboarding successful");
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
    <main className="flex flex-col sm:flex-row w-full justify-center items-center min-h-screen text-[16px] font-poppins text-white bg-red-400 bg-cover bg-[url(../public/astra-plain-min.jpg)] sm:bg-[url(../public/astra-plain-min.jpg)]">
      <div className="px-10 sm:px-20">
        <Logo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4"
        >
          <h1 className="text-black font-semibold px-4 py-3">
            Customer Onboarding Portal
          </h1>
         
          <div className="mb-4 relative">
            <label className="text-black" htmlFor="bvn">
              BVN:
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
            <label className="sr-only" htmlFor="address">
              Address
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.address ? "is-invalid" : ""}`}
              id="address"
              type="text"
              {...register("address")}
              placeholder={
                errors.address ? "" : "Customer Home Address"
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
              <label htmlFor="branch">Branch</label>
              <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.branch ? "is-invalid" : ""}`}
              id="branch"
              type="text"
              {...register("branch")}
              placeholder={errors.branch ? "" : "Enter your branch"}
              autoComplete="family-name"
            />
             </div>

          <div className=" mb-4 relative">
            <label className="sr-only" htmlFor="phoneNumber">
              Phone No
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.phoneNumber ? "is-invalid" : ""}`}
              id="phoneNumber"
              type="number"
              {...register("phoneNumber")}
              placeholder={errors.phoneNumber ? "" : "Customer Phone Number"}
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
    </main>
  );
}
