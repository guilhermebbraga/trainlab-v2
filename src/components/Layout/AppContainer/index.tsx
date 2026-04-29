import type { ReactNode } from "react";

interface AppContainerProps {
  children?: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <main
      className={`
       min-h-screen w-full flex-5 pt-8 pb-20 px-5
    `}
    >
      {children}
    </main>
  );
}
