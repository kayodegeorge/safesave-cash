"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrStatusGood } from "react-icons/gr";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import Modal from "./Modal";
import Logo from "./Logo";
import { createAccount, registerCustomer } from "../backend";
import Image from "next/image";

type Props = {
  activeStep: number;
  bvn: string;
  customerData: {
    fullname: string;
    sex: string;
    foto: string;
    addr: Array<string>;
    fone: Array<string>;
  } | null;
  goToPrevStep: () => void;
};

const validationSchema = z.object({
  bvn: z.string().min(11, "Must be at least 11 characters"),
  address: z.string().min(1, { message: "Field cannot be empty" }),
  branch: z.string().min(1, { message: "Field cannot be empty" }),
  phoneNumber: z.string().min(11, "Must be at least 11 characters"),
});

export type ValidationSchemaType = z.infer<typeof validationSchema>;

const CustomerRegistrationForm = ({
  bvn,
  customerData,
  goToPrevStep,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    defaultValues: {
      bvn: bvn,
    },
    resolver: zodResolver(validationSchema),
  });

  const secondMutation = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      setModalOpen(true);
      toast.success(response.message);
    },
  });

  const firstMutation = useMutation({
    mutationFn: registerCustomer,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response, data) => {
      toast.success(response.message);
      secondMutation.mutate({
        bvn: bvn,
        address: data.address,
        phoneNumber: data.phoneNumber,
      });
    },
  });

  async function onSubmit(data: ValidationSchemaType) {
    firstMutation.mutate(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
        <Logo />

        {customerData ? (
          <div>
            <div>Customer Info</div>
            <div>
              <Image
                src={customerData.foto}
                alt={`${customerData.fullname}'s image`}
                width={50}
                height={50}
              />
              <p>{customerData.fullname}</p>
              <p>{customerData.fone}</p>
              <p>{customerData.addr}</p>
              <p>{customerData.sex}</p>
            </div>
          </div>
        ) : null}

        <div className="mb-4 relative">
          <h2 className="text-gray-700 mb-4 font-bold text-lg">
            Create Customer Account
          </h2>
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="bvn"
          >
            BVN
          </label>

          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
            id="bvn"
            type="text"
            placeholder="Enter Customer's BVN"
            disabled
            {...register("bvn")}
          />

          {errors.bvn?.message && (
            <div className="text-red-500 text-xs text-right font-medium">
              {errors.bvn?.message}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="address"
          >
            Address
          </label>

          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
            id="address"
            type="text"
            placeholder="Enter Customer's Address"
            {...register("address")}
          />

          {errors.address?.message && (
            <div className="text-red-500 text-xs text-right font-medium">
              {errors.address?.message}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>

          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
            id="phoneNumber"
            type="text"
            placeholder="Enter Customer's Phone Number"
            {...register("phoneNumber")}
          />

          {errors.phoneNumber?.message && (
            <div className="text-red-500 text-xs text-right font-medium">
              {errors.phoneNumber?.message}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="branch"
          >
            Branch
          </label>

          <select
            id="branch"
            {...register("branch")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
          >
            <option value="headoffice">Head Office</option>
            <option value="onikolobo">Onikolobo</option>
            <option value="adigbe">Adigbe</option>
            <option value="onikoko">Onikoko</option>
            <option value="lafenwa">Lafenwa</option>
            <option value="obantoko">Obantoko</option>
            <option value="kuto">Kuto</option>
            <option value="akute">Akute</option>
            <option value="berger">Berger</option>
            <option value="imeko">Imeko</option>
            <option value="ayetoro">Ayetoro</option>
            <option value="idiayunre">Idi Ayunre</option>
            <option value="obafe">Obafe</option>
            <option value="ota">Ota</option>
            <option value="ogunmakin">Ogunmakin</option>
          </select>

          {errors.branch?.message && (
            <div className="text-red-500 text-xs text-right font-medium">
              {errors.branch?.message}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="bg-orange-700 hover:bg-orange-300 flex items-center justify-center text-white text-sm font-bold p-4 w-full rounded-lg"
            type="submit"
          >
            {firstMutation.isPending ? (
              <div className="h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-orange-700 ease-linear"></div>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>

      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          closeModal={() => {
            setModalOpen(false);
          }}
        >
          <div className="bg-white h-80 w-80 flex flex-col items-center justify-center gap-2 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center">
              {secondMutation.data?.message}
            </h3>
            <span className="text-5xl text-green-600">
              <GrStatusGood />
            </span>
            <p className="mt-3 font-semibold">
              A/C is {secondMutation.data?.data.Payload.Name}
            </p>

            <Link href="/verify" className="text-orange-400 underline">
              Back to Home
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CustomerRegistrationForm;
