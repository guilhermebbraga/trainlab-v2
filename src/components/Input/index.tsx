import { forwardRef } from "react";
import InputError from "../InputError";

interface InputProps {
  type: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  radius?: string;
  otherStyles?: string;
  error?: string;
  elementId?: string
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { type, placeholder, radius, otherStyles, error, disabled,  elementId, ...props},
  ref,
) {
  return (
    <>
      <input
        ref={ref}
        id={elementId}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        style={{ borderRadius: radius ? `${radius}px` : "12px" }}
        {...props}
        className={`
          font-light bg-bg-light focus:outline-none
          rounded-[18px] placeholder:text-sm px-4 py-2.5 focus:border-primary
          bg-background-dark cursor-pointer border border-transparent
          focus:outline-3 w-full relative
      ${otherStyles}
      ${disabled && "opacity-70"}
      ${
        error
          ? "border-orange-600 focus:orange-600 outline-orange-600/12"
          : "border-transparentfocus:border-white outline-white/12"
      }
        `}
      />
      {error && <InputError message={error} />}
    </>
  );
});
