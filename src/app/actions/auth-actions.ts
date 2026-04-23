import { revalidatePath } from "next/cache";
import AuthService, { Login } from "../services/AuthService";

export async function loginAction(data: Login) {
  const authService = new AuthService();

  try {
    await authService.login(data);

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao acessar conta." };
  }
}
