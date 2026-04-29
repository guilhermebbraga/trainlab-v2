import { LevelGoal } from "../types/LevelGoal.js";
import { WorkoutGoal } from "../types/WorkoutGoal.js";
import type { Exercise } from "./Exercise.js";

export interface WorkoutData {
  name: string;
  type: WorkoutGoal;
  level: LevelGoal;
  totalExercises?: number;
  totalSets?: number;
  id?: string;
  description?: string;
  createdAt?: string;
  exercises?: Exercise[];
}

export interface Statistic {
  [key: string]: number;
}
