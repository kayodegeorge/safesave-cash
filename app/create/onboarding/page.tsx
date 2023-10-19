"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Logo from "@/app/components/logo";
import { useSession } from "next-auth/react";

const validationSchema = z.object({
  customerHomeAddress: z.string().nonempty("Field cannot be empty"),
  staffBranch: z.string().nonempty("Field cannot be empty"),
  customerPhoneNo: z
    .string()
    .min(11, "Must be at least 11 characters")
    .nonempty(),
});

type ValidationSchemaType = z.infer<typeof validationSchema>;

const formOptions = { resolver: zodResolver(validationSchema) };

export default function OnboardingPage() {
  const { register, handleSubmit, formState } =
    useForm<ValidationSchemaType>(formOptions);
  const { errors } = formState;

  const { data: session } = useSession();

  function onSubmit(data: ValidationSchemaType) {
    alert("Onboarding successful");
    return false;
  }

  console.log(session?.user?.name);

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
            <label className="text-black" htmlFor="fullname">
              BVN:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="2222222222"
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
                           ${errors.customerHomeAddress ? "is-invalid" : ""}`}
              id="customerHomeAddress"
              type="text"
              {...register("customerHomeAddress")}
              placeholder={
                errors.customerHomeAddress ? "" : "Customer Home Address"
              }
              autoComplete="given-name"
            />
            <div
              id="customerHomeAddressErrorMessage"
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.customerHomeAddress?.message}
            </div>
          </div>
             
             <div className="mb-4 relative">
              <label htmlFor="staffBranch">Branch</label>
              <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.staffBranch ? "is-invalid" : ""}`}
              id="staffBranch"
              type="text"
              {...register("staffBranch")}
              placeholder={errors.staffBranch ? "" : "Enter your branch"}
              autoComplete="family-name"
            />
             </div>

          <div className="relative mb-4">
            <label className="sr-only" htmlFor="customerPhoneNo">
              Phone No
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.customerPhoneNo ? "is-invalid" : ""}`}
              id="phoneNo"
              type="number"
              {...register("customerPhoneNo")}
              placeholder={errors.customerPhoneNo ? "" : "Customer Phone Number"}
              autoComplete="family-name"
            />
            <div
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.customerPhoneNo?.message}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              className="bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Register and Create Account
            </button>

  
          </div>
        </form>
      </div>
    </main>
  );
}
