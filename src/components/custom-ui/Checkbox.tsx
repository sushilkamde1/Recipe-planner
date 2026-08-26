"use client";

import { FaCheck } from "react-icons/fa";

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
  id?: string;
  disabled?: boolean;
};

export default function Checkbox({
  checked,
  onChange,
  label,
  id,
  disabled = false,
}: CheckboxProps) {
  const checkboxId = id ?? label;

  return (
    <label
      htmlFor={checkboxId}
      className={`flex items-center gap-3 text-secondary-200 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer"
      }`}
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />

      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
          checked
            ? "border-secondary-200 bg-secondary-200 text-white"
            : "border-yellow-50bg-white"
        }`}
      >
        {checked && <FaCheck className="text-[10px]" />}
      </span>

      <span
        className={
          checked
            ? "text-green-50 line-through"
            : ""
        }
      >
        {label}
      </span>
    </label>
  );
}