"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useGlobalContext } from "../context/GlobalContext";

const SignOutButton = () => {
  const router = useRouter();
  const { dispatch } = useGlobalContext();

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Successfully logged out");
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
