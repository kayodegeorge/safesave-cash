"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

const Button = () => {
  const { data: session } = useSession();

  return (
    <button
      className="px-5 py-2 border border-orange-300 w-fit rounded-md hover:bg-orange-300 hover:text-white"
      type="button"
      onClick={() => signOut()}
    >
      Sign Out {session?.user?.name}
    </button>
  );
};

export default Button;
