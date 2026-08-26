"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

function BackButton({label}: {label?: string}) {
  const router = useRouter();
  const navigateBack = () => {
    router.back();
  };
  return (
    <button
      className="text-sm font-semibold text-tertiary transition hover:text-primary"
      onClick={navigateBack}
    >
      <div className="flex items-center gap-2">
        <FaArrowLeftLong /> {label || "Back to recipes"}
      </div>
    </button>
  );
}

export default BackButton;
