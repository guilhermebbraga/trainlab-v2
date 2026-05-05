export type StatsGoal = "totalWorkouts" | "totalExercises" | "totalSets";

export const statsGoalTranslate: Record<StatsGoal, string> = {
  totalExercises: "Exercícios",
  totalWorkouts: "Treinos",
  totalSets: "Séries",
};
