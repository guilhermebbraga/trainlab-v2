import { ReactNode } from "react";

interface SessionProps {
  children: ReactNode;
  title?: string;
  otherStyles?: string;
}

export default function Section({
  title,
  otherStyles,
  children,
}: SessionProps) {
  return (
    <section className={`  ${otherStyles}`}>
      <h2 className="text-2xl font-medium">{title}</h2>
      {children}
    </section>
  );
}
