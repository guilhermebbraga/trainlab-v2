"use server";
import { revalidatePath } from "next/cache";
import { Login } from "../services/AuthService";
import { ActionResponse } from "@/src/types/actions";
import { ApiError, apiRequest } from "@/src/api/client";
import { cookies } from "next/headers";

export async function loginAction(data: Login): Promise<ActionResponse> {
  try {
    const response = await apiRequest<{ accessToken: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(response);

    if (!response) throw new ApiError("Houve uma falha ao se autenticar", 401);

    const { accessToken } = response;

    const cookieStore = await cookies();

    if (accessToken) {
      cookieStore.set("TrainLabAuth", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: "/"
      });
    }

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao fazer login",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}
