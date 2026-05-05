import { ApiError, apiRequest } from "@/src/api/client";
import { StatsData } from "@/src/interfaces/Stats";
import { ActionResponse } from "@/src/types/actions";

export async function getStatsAction(): Promise<ActionResponse<StatsData>> {
  try {
    const stats = await apiRequest<StatsData>("/stats", {
      method: "GET",
    });

    console.log(stats)

    return { success: true, data: stats };
  } catch (error) {
    console.error("Erro na Server Action: ", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error:
          error.message || "Houve uma falha ao obter as estatísticas",
        code: error.status,
      };
    }

    return { success: false, error: "Erro genérico" };
  }
}
