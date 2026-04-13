import { type ReactNode } from "react";

interface LabelWrapperProps {
  children: ReactNode;
  name: string;
  elementId: string;
}

export default function LabelWrapper({
  children,
  elementId,
  name,
}: LabelWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="cursor-pointer text-sm" htmlFor={elementId}>
        {name}
      </label>

      {children}
    </div>
  );
}
