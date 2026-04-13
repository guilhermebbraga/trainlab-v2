'use client'
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function NavHeader() {
    const router = useRouter()

  return (
    <nav className="flex items-center justify-between w-full mb-7.5 text-2xl">
      <div
        onClick={() => router.back()}
        className="flex items-center cursor-pointer hover:text-text-muted"
      >
        <IoIosArrowBack />
      </div>
    </nav>
  );
}
