"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Logo from "./logo";

const validationSchema = z.object({
  customerFullName: z.string().nonempty("Name cannot be empty"),
   dateOfBirth: z.string().nonempty("DOB cannnot be empty"),
  bvn: z
    .string()
    .min(11, "BVN cannot be empty or less than 11 characters")
    .nonempty(),
});

type ValidationSchemaType = z.infer<typeof validationSchema>;

const formOptions = { resolver: zodResolver(validationSchema) };

const UploadBvnAndPic = () => {
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } =
    useForm<ValidationSchemaType>(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    alert("Details submitted");
    return false;
  }

  // const [file, setFile] = useState();
  // function handleChange(e: any) {
  //   console.log(e.target.files);
  //   // setFile(URL.createObjectURL(e.target.files[0]));
  // }
  return (
    <>
      <div className="px-10 sm:px-20">
        <Logo />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4"
        >
          <div className="mb-4 relative">
            <h1 className="text-black font-semibold px-4 py-3">
              Customer Onboarding Portal
            </h1>
            </div>

            <div className="mb-6 relative">
            <label className="sr-only" htmlFor="bvn">
              BVN
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.bvn ? "is-invalid" : ""}`}
              id="bvn"
              type="number"
              {...register("bvn")}
              placeholder={errors.bvn ? "" : "Enter Customer BVN"}
            />
            <div
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.bvn?.message}
            </div>
          </div>
         <div className="mb-6 relative">
         <label className="sr-only" htmlFor="dob">
              DOB
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.dateOfBirth ? "is-invalid" : ""}`}
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              placeholder={errors.dateOfBirth ? "" : "Enter Customer BVN"}
            />
            <small className="text-gray-400">Year-Month-Date</small>
             <div
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.dateOfBirth?.message}
            </div>
         </div>
          <div className="mb-6 relative">
          <label htmlFor="gender" className="text-black">Input Gender</label>
            <select name="" id="" className="hadow appearance-none border rounded w-full py-4 px-8 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
          </div>

          
          <div className="flex items-center justify-between mt-5">
            <button
              aria-describedby="uploadDocuments"
              className="bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadBvnAndPic;
