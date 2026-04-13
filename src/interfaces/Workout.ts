import type { Exercise } from "./Exercise.js";

export interface WorkoutData {
  name: string;
  type: "STRENGTH" | "HYPERTROPHY" | "CARDIO" | "FUNCTIONAL" | "ENDURANCE";
  level: "BEGGINER" | "INTERMEDIATE" | "ADVANCED";
  totalExercises?: number;
  totalSets?: number;
  id?: string;
  description?: string;
  createdAt?: string;
  exercises?: Exercise[];
}

export interface Statistic {
  [key: string]: number
}