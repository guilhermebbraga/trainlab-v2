"use server";

import { revalidatePath } from "next/cache";
import { ExerciseInput } from "@/src/lib/validations/exercise.validations";
import { ApiError, apiRequest } from "@/src/api/client";
import { ActionResponse } from "@/src/types/actions";

export async function createExerciseAction(
  workoutId: string,
  data: ExerciseInput,
): Promise<ActionResponse> {
  try {
    await apiRequest(`/workouts/${workoutId}/exercises`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    revalidatePath(`/treinos/${workoutId}`);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao criar o exercício",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}

export async function getExerciseByIdAction(
  workoutId: string,
  exerciseId: string,
): Promise<ActionResponse<ExerciseInput>> {
  try {
    const exercise = await apiRequest<ExerciseInput>(
      `/workouts/${workoutId}/exercises/${exerciseId}`,
      {
        method: "GET",
      },
    );

    return { success: true, data: exercise };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao recuperar o exercício",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}

export async function updateExerciseAction(
  workoutId: string,
  id: string,
  data: ExerciseInput,
) {
  try {
    await apiRequest(`/workouts/${workoutId}/exercises/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    revalidatePath(`/treinos/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao atualizar o exercício",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}

export async function deleteExerciseAction(workoutId: string, id: string) {
  try {
    await apiRequest(`/workouts/${workoutId}/exercises/${id}`, {
      method: "DELETE",
    });

    revalidatePath(`/treinos/${workoutId}`);
    
    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message || "Houve uma falha ao deletar o exercício",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}
