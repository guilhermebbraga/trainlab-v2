import type { ReactNode } from "react";

interface BottomWrapperProps{
    children: ReactNode
}

export default function BottomWrapper({children}: BottomWrapperProps) {
  return (
    <div
      className="
          fixed bottom-0 left-0 p-5 w-full bg-linear-to-t from-black/60 to-transparent
          transition-opacity duration-500 ease-in-out
          "
    >
      <div className="flex items-center justify-center gap-5 w-full">
        {children}
      </div>
    </div>
  );
}
