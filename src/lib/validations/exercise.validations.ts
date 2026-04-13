import z from "zod";

const muscleGroups = [
  "CHEST",
  "BACK",
  "LEGS",
  "SHOULDERS",
  "BICEPS",
  "TRICEPS",
  "ABS",
  "GLUTES",
];

export const ExerciseSchema = z.object({
  name: z
    .string()
    .min(1, "Seu exercício deve ter no minímo 1 caractere")
    .max(20, "Seu exercício deve ter no máximo 20 caracteres"),

  muscleGroup: z.enum(muscleGroups, {
    error: () => ({ message: "Grupo muscular inválido" }),
  }),

  sets: z.number().min(1, "Deve ter no minímo uma série"),

  repetitions: z.number().min(1, "Deve ter no minímo uma repetição"),
});

export type ExerciseInput = z.infer<typeof ExerciseSchema>;
