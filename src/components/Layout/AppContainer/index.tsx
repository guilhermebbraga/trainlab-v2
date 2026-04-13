import type { ReactNode } from "react";

interface AppContainerProps {
  children?: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <main
      className={`
       min-h-screen w-full flex-5 p-5
    `}
    >
      {children}
    </main>
  );
}
