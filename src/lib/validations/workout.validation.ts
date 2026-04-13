import z from "zod";

const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export const trainingTypes = [
  // Musculação e Força
  "HYPERTROPHY",
  "STRENGTH",
  "POWERLIFTING",
  "ENDURANCE",
  // Condicionamento e Queima
  "HIIT",
  "CROSSFIT",
  "WOD",
  "CIRCUIT",
  "CARDIO_LISS",
  // Mobilidade e Mente
  "YOGA",
  "PILATES",
  "MOBILITY",
  "STRETCHING",
];

export const WorkoutSchema = z.object({
  name: z
    .string()
    .min(3, "O treino deve ter no mínimo 3 caracteres")
    .max(25, "O treino deve ter no mínimo 25 caracteres"),

  description: z
    .string()
    .min(3, "A descrição deve ter no mínimo 3 caracteres")
    .max(200, "A descrição deve ter no mínimo 200 caracteres"),

  type: z.enum(trainingTypes, {
    error: () => ({ message: "Nível inválido selecionado" }),
  }),

  level: z.enum(levels, {
    error: () => ({ message: "Nível inválido selecionado" }),
  }),
});

export type WorkoutInput = z.infer<typeof WorkoutSchema>;
