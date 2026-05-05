import NavMenu from "@/src/components/Layout/NavMenu";

export const dynamic = "force-dynamic";

export default function appLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavMenu />
    </>
  );
}
