"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const SignOutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    toast.promise(
      signOut({
        redirect: false,
        callbackUrl: "/",
      }),
      {
        loading: "Signing out...",
        success: (data) => {
          return "Signed out successfully.";
        },
        error: "Error signing out.",
      }
    );
    router.push("/");
  };

  return (
    <button
      className="absolute top-4 right-4 px-3 py-1.5 border border-orange-300 w-fit text-sm rounded-md hover:bg-orange-500 hover:text-white"
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
