"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import Logo from "./Logo";
import { login } from "../backend";
import { useGlobalContext } from "../context/GlobalContext";

const SignInSchema = z.object({
  userID: z
    .string({ required_error: "StaffID is required" })
    .min(1, { message: "Staff ID cannot be empty" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password cannot be empty" }),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { dispatch } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status === false) {
        toast.error(data.message || "An error occured");
      } else {
        dispatch({ type: "LOGIN", payload: data.data });
        router.push("/verify");
      }
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg w-full max-w-md p-8"
    >
      <Logo />
      <h2 className="text-gray-700 text-center mb-4 font-bold text-lg">
        Welcome Back
      </h2>

      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="staffID"
        >
          Staff ID
        </label>

        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
          id="staffID"
          type="text"
          {...register("userID")}
        />

        {errors.userID?.message && (
          <div className="text-red-500 text-xs text-right font-medium">
            {errors.userID?.message}
          </div>
        )}
      </div>

      <div className="mt-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="password"
        >
          Password
        </label>

        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
          id="password"
          type="password"
          {...register("password")}
        />

        {errors.password?.message && (
          <div className="text-red-500 text-xs text-right font-medium">
            {errors.password?.message}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="bg-orange-700 hover:bg-orange-300 flex items-center justify-center text-white text-sm font-bold p-4 w-full rounded-lg"
          type="submit"
        >
          {loginMutation.isPending ? (
            <div className="h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-orange-700 ease-linear"></div>
          ) : (
            "Sign In"
          )}
        </button>
      </div>

      <p className="text-sm text-center mt-4 text-gray-700">
        Forgot Password?{" "}
        <Link href="/reset-password" className="font-bold text-orange-700">
          Reset
        </Link>
      </p>

      <p className="text-sm text-center mt-4 text-gray-700">
        Dont have an account?{" "}
        <Link href="/register" className="font-bold text-orange-700">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
