"use client";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

import { IoIosArrowForward } from "react-icons/io";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, LoginSchema } from "../lib/validations/login.validation";
import { AuthService } from "./services/AuthService";
import { toast } from "sonner";

const authService = new AuthService();

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      try {
        const response = await authService.login(data);
        toast.success("Login efetuado com sucesso!");
        console.log(response?.accessToken);
        router.push("/home");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const status = error.response?.status;

        if (status === 401) {
          toast.error("Credenciais inválidas. Tente novamente.");
        } else {
          toast.error("Ocorreu um erro inesperado");
        }

        router.push("/");
      }
    });
  };

  return (
    <div className="flex flex-col gap-7.5 h-screen px-5 pt-5 pb-16">
      <Link
        href="/signup"
        className="border-2 px-2.5 rounded-custom text-primary flex items-center
        gap-2.5 hover:text-text-main cursor-pointer w-fit self-end mb-5 hover:border-primary hover:bg-primary"
      >
        <p>Criar uma conta</p>

        <IoIosArrowForward />
      </Link>

      <div className="text-left w-full mb-7.5">
        <h1 className="text-4xl font-medium">Acessar conta</h1>
        <p className="text-text-muted">Seja-bem vindo novamente</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="flex flex-col gap-5 w-full"
      >
        <Input
          {...register("email")}
          type="email"
          placeholder="Insira seu email"
          error={errors.email?.message}
          disabled={isPending}
        />

        <Input
          {...register("password")}
          type="password"
          placeholder="Insira sua senha"
          disabled={isPending}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          text={isPending ? "Entrando..." : "Login"}
          direction="left"
          disabled={isPending}
        />

        <a
          href="/forgot"
          className="w-full text-sm text-text-muted text-right hover:text-text-main"
        >
          Esqueceu a senha?
        </a>
      </form>

      <div className="w-full mt-12">
        <div className="flex gap-5 items-center text-text-muted mb-12">
          <hr className="rounded-2xl text-white/16 flex-1" />
          <span className="col-span-2 text-sm w-fit font-light">
            Ou entre com
          </span>
          <hr className="rounded-2xl text-white/16 flex-1" />
        </div>

        <div className="flex items-center justify-center w-full gap-7.5 text-2xl">
          <a
            href="/google"
            className="
              h-12 w-12 bg-background-dark grid place-items-center rounded-full
              border-2 border-transparent hover:border-primary
              "
          >
            <FcGoogle />
          </a>

          <a
            href="/google"
            className="
              h-12 w-12 bg-background-dark grid place-items-center rounded-full
              border-2 border-transparent hover:border-primary
              "
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </div>
  );
}
