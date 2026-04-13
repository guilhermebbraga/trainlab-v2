import { forwardRef } from "react";

interface TextAreaProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  radius?: string;
  otherStyles?: string;
  error?: string;
  elementId?: string
}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { disabled, error, otherStyles, placeholder, radius, elementId, ...props },
  ref,
) {
  return (
    <>
      <textarea
        placeholder={placeholder}
        id={elementId}
        style={{ borderRadius: radius ? `${radius}px` : "12px" }}
        ref={ref}
        disabled={disabled}
        {...props}
        className={`
            font-light bg-background-dark focus:outline-none
            rounded-[18px] placeholder:text-sm px-4 py-2.5 focus:border-primary
            cursor-pointer border border-transparent resize-none
            focus:outline-3 w-full
            ${otherStyles}
            ${disabled && "opacity-70"}
            ${
              error
                ? "border-orange-600 focus:orange-600 outline-orange-600/12"
                : "border-transparentfocus:border-white outline-white/12"
            }
                `}
      />
    </>
  );
});
