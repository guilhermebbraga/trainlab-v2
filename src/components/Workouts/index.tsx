import { WorkoutData } from "@/src/interfaces/Workout";
import Chip from "../Chip";
import Link from "next/link";
import { getWorkoutsAction } from "@/src/app/actions/workouts-actions";

export default async function Workouts() {
  const workouts: WorkoutData[] = await getWorkoutsAction()

  return (
    <div className="mt-7.5 flex flex-col gap-5">
      {workouts.map((workout, index) => (
        <Link
          href={`/treinos/${workout.id}`}
          key={index}
          className="bg-background-dark p-5 rounded-2xl  cursor-pointer"
        >
          <h3 className="font-medium text-md">{workout.name}</h3>

          <div className="flex gap-5 text-sm mt-5 justify-between items-center">
            <Chip style="solid" text={workout.type} />
            <Chip style="bordered" text={workout.level} />

            <span>0 exs - 0 sets</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
