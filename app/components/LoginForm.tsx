"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Logo } from "./logo";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignInSchema = z.object({
  userID: z.string(),
  password: z.string(),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // get functions to build form with useForm() hook
  const formOptions = { resolver: zodResolver(SignInSchema) };
  const { register, handleSubmit, formState } =
    useForm<SignInSchemaType>(formOptions);
  const { errors } = formState as any;

  const onSubmit = async (data: SignInSchemaType) => {
    setLoading(true);
    const res = await signIn("credentials", {
      ...data,
      callbackUrl: "/create",
    });

    if (res?.error) {
      alert('Invalid credentials')
    }
    setLoading(false);
  };

  return (
    <>
      <div className="px-10 sm:px-20">
        <Logo />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-14 pb-8 mb-4 mt-4"
        >
          <div className="mb-4 relative">
            <h1 className="text-gray-700 flex justify-center text-center mb-3 font-bold text-lg">Welcome Back</h1>
            <label className="text-gray-700 font-semibold" htmlFor="staffID">
              StaffID
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
                          font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                           ${errors.userID ? "is-invalid" : ""}`}
              id="userID"
              type="text"
              {...register("userID")}
              autoComplete="given-name"
            />
            <div
              id="userIDErrorMessage"
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.userID?.message}
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="text-gray-700 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-4 px-4 
              font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline
               ${errors.password ? "is-invalid" : ""}`}
              id="password"
              type="password"
              {...register("password")}
            />
            <div
              aria-live="polite"
              className="text-red-500 text-xs italic text-right font-bold"
            >
              {errors.password?.message}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              aria-describedby="termsAndConditions"
              className="bg-orange-700 hover:bg-orange-300 text-white text-sm font-bold p-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </div>

          <p
            id="termsAndConditions"
            className="text-sm mb-4 text-center pt-4 text-gray-700 gap-4"
          >
            Dont have an account?
            <Link
              href="/register"
              className="font-bold text-orange-700 space-y-2"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
