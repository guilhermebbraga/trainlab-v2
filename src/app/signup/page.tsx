"use client";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  RegisterInput,
  RegisterSchema,
} from "@/src/lib/validations/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "../services/UserService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const userService = new UserService();

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      try {
        await userService.signup(data);

        toast.success("Conta criada com sucesso!");
        router.push("/");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const status = error.response?.status;

        if (status === 409) {
          toast.error("Usuário já cadastrado");
        } else {
          toast.error("Ocorreu um erro inesperado");
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-7.5 h-screen px-5 pt-5 pb-16">
      <Link
        href="/"
        className="border-2 px-2.5 rounded-custom text-primary flex items-center
        gap-2.5 hover:text-text-main cursor-pointer w-fit self-end mb-5 hover:border-primary hover:bg-primary"
      >
        <p>Fazer login</p>

        <IoIosArrowForward />
      </Link>

      <div className="text-left w-full mb-7.5">
        <h1 className="text-4xl font-medium">Criar uma conta</h1>
        <p className="text-text-muted">Seja-bem vindo a TrainLab</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="flex flex-col gap-5 w-full"
        noValidate
      >
        <Input
          {...register("name")}
          type="text"
          placeholder="Nome"
          error={errors.name?.message}
          disabled={isPending}
        />

        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          disabled={isPending}
        />

        <Input
          {...register("password")}
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          disabled={isPending}
        />

        <Input
          {...register("password2")}
          type="password"
          placeholder="Confirme sua senha"
          error={errors.password2?.message}
          disabled={isPending}
        />

        <Button
          type="submit"
          text={isPending ? "Criando..." : "Criar conta"}
          direction="left"
          disabled={isPending}
        />
      </form>
    </div>
  );
}
