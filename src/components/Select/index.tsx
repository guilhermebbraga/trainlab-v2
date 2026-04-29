"use client";
import { ChangeEvent, forwardRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InputError from "../InputError";

interface SelectProps {
  optionsList: string[][];
  onChange: (value: string) => void;
  value: string;
  name: string;
  disabled?: boolean;
  label?: string;
  radius?: string;
  otherStyles?: string;
  error?: string;
  elementId?: string;
}

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { optionsList, disabled, error, otherStyles, radius, elementId, value, name, onChange },
  ref,
) {
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          id={elementId}
          name={name}
          onFocus={() => setSelectIsOpen(true)}
          onBlur={() => setSelectIsOpen(false)}
          onChange={handleOnChange}
          style={{ borderRadius: radius ? `${radius}px` : "12px" }}
          value={value}
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

          <option disabled>
            Selecione...
          </option>
          
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
