import { ApiError, apiRequest } from "@/src/api/client";
import { UserMe } from "@/src/interfaces/User";
import { ActionResponse } from "@/src/types/actions";

export async function getUserAction(): Promise<ActionResponse<UserMe>> {
  try {
    const userData = await apiRequest<UserMe>("/users/me", {
      method: "GET",
    });

    console.log(userData)

    return { success: true, data: userData };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error:
          error.message || "Houve uma falha ao recuperar os dados do usuário",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}
