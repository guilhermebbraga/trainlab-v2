'use client'
import { forwardRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InputError from "../InputError";

interface SelectProps {
  optionsList: string[][];

  disabled?: boolean;
  label?: string;
  radius?: string;
  otherStyles?: string;
  error?: string;
  elementId?: string
}

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { optionsList, disabled, error, otherStyles, radius, elementId },
  ref,
) {
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  return (
    <>
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          id={elementId}
          name="muscleGroup"
          onFocus={() => setSelectIsOpen(true)}
          onBlur={() => setSelectIsOpen(false)}
          style={{ borderRadius: radius ? `${radius}px` : "12px" }}
          className={`
            bg-background-dark border-transparent cursor-pointer px-4 py-2.5
            border font-light focus:outline-none rounded-[18px] w-full
            placeholder:text-sm  focus:border-primary appearance-none
            ${otherStyles}
            ${disabled && "opacity-70"}
      ${
        error
          ? "border-orange-600 focus:orange-600 outline-orange-600/12"
          : "border-transparentfocus:border-white outline-white/12"
      }
            `}
        >
          {optionsList.map((option, index) => (
            <option key={index} value={option[0]} className="cursor-pointer">
              {option[1]}
            </option>
          ))}
        </select>
        <IoIosArrowDown
          className={`
        absolute right-1 pointer-events-none mr-2 top-4
        ${selectIsOpen && "rotate-180"}
        `}
        />
      </div>

      {error && <InputError message={error} />}
    </>
  );
});
