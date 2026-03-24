"use client";
interface ButtonProps {
  text?: string;
  type?: "button" | "submit" | "reset"
  textSize?: "sm" | "lg";
  icon?: React.ElementType | false;
  direction?: "left" | "right";
  onClick?: () => void;
  otherStyles?: string;
  disabled?: boolean;
}

export default function Button({
  text,
  textSize,
  otherStyles,
  icon: Icon,
  direction,
  onClick,
  disabled,
  type = 'button'
}: ButtonProps) {

  return (
    <button
      type={type}
      className={`
    bg-linear-to-r from-purple-800 via-purple-700 to-purple-600 bg-size-[200%_auto]
    text-center text-text-main font-medium flex items-center justify-center gap-2.5 transition-all
    duration-500 hover:bg-top-right rounded-custom  cursor-pointer 
    ${otherStyles}
    ${disabled && "opacity-70"}
    ${Icon && direction && direction === "left" ? "flex-row-reverse" : ""}
    ${Icon && !text ? "w-10 h-10" : "py-5 px-3 h-8"}
    ${textSize ? (textSize === "sm" ? "text-sm" : "text-lg") : "text-[16px]"}
    `}
      onClick={onClick}
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
}