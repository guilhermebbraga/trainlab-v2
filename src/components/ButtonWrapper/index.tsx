import type { ReactNode } from "react";

interface BottomWrapperProps{
    children: ReactNode;
    align?: 'left'| 'center' | 'right'
}

const alignDirection: {left: string, center: string, right: string} = {
  left: "",
  center: "justify-center",
  right: "justify-end"
}

export default function BottomWrapper({children, align = "center"}: BottomWrapperProps) {
  return (
    <div
      className="
          fixed bottom-12 left-0 p-5 w-full
          "
    >
      <div className={`flex items-center ${alignDirection[align]}  gap-5 w-full`}>
        {children}
      </div>
    </div>
  );
}
