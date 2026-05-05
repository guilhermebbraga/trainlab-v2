import { LuSearch } from "react-icons/lu";

export default function Home() {
  return (
    <main className="p-5">
      <nav className="bg-primary w-full h-fit p-5 rounded-3xl">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-medium">Olá, Guilherme B.</h1>

          <div
            className="
                group focus-within:active:bg-primary-hover focus-within:bg-primary-hover
                p-3 rounded-2xl flex justify-between items-center"
          >
            <input
              type="text"
              className="outline-none border-none bg-transparent p-1 w-[92%]"
              placeholder="Veja o que treinar hoje..."
            />

            <LuSearch className="text-xl flex-1 " />
          </div>
        </div>
      </nav>
    </main>
  );
}
