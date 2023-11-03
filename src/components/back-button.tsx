"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const router = useRouter();

  return (
    <button className="absolute top-6 left-4" onClick={() => router.back()}>
      <div className="flex items-center gap-1">
        <FaArrowLeft />
        Back
      </div>
    </button>
  );
};

export default BackButton;
