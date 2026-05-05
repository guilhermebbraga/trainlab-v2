import NavMenu from "@/src/components/Layout/NavMenu";

export default function appLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavMenu />
    </>
  );
}
