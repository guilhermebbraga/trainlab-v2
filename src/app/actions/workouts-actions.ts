"use server";

import { WorkoutData } from "@/src/interfaces/Workout";
import { revalidatePath } from "next/cache";
import { ApiError, apiRequest } from "@/src/api/client";
import { ActionResponse } from "@/src/types/actions";
import { WorkoutInput } from "@/src/lib/validations/workout.validation";

export async function createWorkoutAction(
  data: WorkoutInput,
): Promise<ActionResponse> {
  try {
    await apiRequest("/workouts", {
      method: "POST",
      body: JSON.stringify(data),
    });

    revalidatePath("/treinos");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao criar o treino",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}

export async function getWorkoutsAction(): Promise<
  ActionResponse<WorkoutData[]>
> {
  try {
    const workouts = await apiRequest<WorkoutData[]>("/workouts", {
      method: "GET",
    });
    return { success: true, data: workouts };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao recuperar os treinos",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}

export async function getWorkoutWithExercisesAction(
  id: string,
): Promise<ActionResponse<WorkoutData>> {
  try {
    const workouts = await apiRequest<WorkoutData>(`/workouts/${id}`, {
      method: "GET",
    });

    return { success: true, data: workouts };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao recuperar o treino",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}

export async function editWorkoutAction(
  data: WorkoutInput,
  id: string,
): Promise<ActionResponse> {
  try {
    await apiRequest(`/workouts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    revalidatePath("/treinos");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao editar o treino",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}

export async function deleteWorkoutAction(id: string): Promise<ActionResponse> {
  try {
    await apiRequest(`/workouts/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/treinos");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao deletar o treino",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}
