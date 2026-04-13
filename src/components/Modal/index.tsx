"use client";
import { type ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalWrapperProps {
  children: ReactNode;
  modalTitle: string
  setIsOpen: (value: boolean) => void;
}

export default function Modal({
  children,
  modalTitle,
  setIsOpen,
}: ModalWrapperProps) {
  return (
    <div className="absolute inset-0 z-999 w-screen h-screen bg-black/70 grid place-items-center">
      {/* Modal content */}
      <div className="bg-background p-5 w-[90%] rounded-custom min-h-120 z-9999 relative">
        <div
          onClick={() => setIsOpen(false)}
          className="
        absolute right-5 text-2xl text-text-muted hover:bg-red-400
        p-1 rounded-md hover:text-white cursor-pointer"
        >
          <IoClose />
        </div>

        <h2 className="text-2xl font-medium mb-5">{modalTitle}</h2>

        {children}
      </div>
    </div>
  );
}
