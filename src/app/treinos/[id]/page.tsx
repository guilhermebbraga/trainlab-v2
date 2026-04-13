import WorkoutService from "../../services/WorkoutService";
import WorkoutClientContent from "./WorkoutClientContent";


interface WorkoutProps {
  params: Promise<{ id: string }>;
}

export default async function Workout({ params }: WorkoutProps) {
  const { id } = await params;
  const workoutService = new WorkoutService();

  const workout = await workoutService.getWorkoutById(id);


  console.log(workout);


  return <WorkoutClientContent workout={workout}/>
}
