"use client";

import { useState } from "react";

interface ButtonProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ElementType | false;
  reverse?: boolean;
  onClick?: () => void;
  otherStyles?: string;
  disabled?: boolean;
  style?: "default" | "simple" | "danger";
  popup?: boolean;
  children?: React.ReactNode;
}

const buttonVariants: {
  default: string;
  simple: string;
  danger: string;
} = {
  default:
    "bg-linear-to-r from-purple-800 via-purple-700 to-purple-600 bg-size-[200%_auto] hover:bg-top-right",
  danger: "bg-red-400 text-black/80 hover:bg-red-500",
  simple: "bg-background/60 hover:bg-background-dark/60",
};

export default function Button({
  text,
  otherStyles,
  icon: Icon,
  reverse,
  onClick,
  disabled,
  type = "button",
  style = "default",
  popup,
  children,
}: ButtonProps) {
  const [popupOpen, setPopupOpen] = useState(false);

  const baseStyle =
    " font-medium flex items-center justify-center gap-2.5 rounded-custom cursor-pointer";

  if (popup && children) {
    return (
      <div className="relative">
        {popupOpen && (
          <div className="w-fit h-fit p-2 flex flex-col gap-2 border border-border-custom/40 bg-background-light absolute top-12 shadow-xl right-2 rounded-2xl">
            {children}
          </div>
        )}

        <button
          type={type}
          className={`
            ${baseStyle}
            ${buttonVariants[style]}
            ${otherStyles}
            ${disabled && "opacity-70"}
            ${reverse && "flex-row-reverse"}
            ${Icon && !text ? "w-10 h-10" : "py-5 px-3 h-8"}
          `}
          onClick={() => setPopupOpen(!popupOpen)}
        >
          {text}
          {Icon && <Icon />}
        </button>
      </div>
    );
  }

  return (
    <button
      type={type}
      className={`
    ${baseStyle}
    ${buttonVariants[style]}
    ${otherStyles}
    ${disabled && "opacity-70"}
    ${reverse && "flex-row-reverse"}
    ${Icon && !text ? "w-10 h-10" : "py-5 px-3 h-8"}
    
    
    `}
      onClick={onClick}
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
}
