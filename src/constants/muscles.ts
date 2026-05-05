type MuscleGoal =
  | "CHEST"
  | "BACK"
  | "LEGS"
  | "SHOULDERS"
  | "BICEPS"
  | "TRICEPS"
  | "ABS"
  | "GLUTES";

export const muscleGoalTranslations: Record<MuscleGoal, string> = {
  ABS: "Abdômen",
  BACK: "Costas",
  BICEPS: "Bíceps",
  TRICEPS: "Tríceps",
  CHEST: "Peito",
  GLUTES: "Glúteos",
  LEGS: "Pernas",
  SHOULDERS: "Ombros",
};
