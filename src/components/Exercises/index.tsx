import { Exercise } from "@/src/interfaces/Exercise";
import ExerciseLi from "../ExerciseLi";

interface ExercisesProps {
  exercises: Exercise[];
}

export default function Exercises({ exercises }: ExercisesProps) {


  return (
    <ul className="mt-7.5 mb-20 flex flex-col gap-5">
      {exercises?.map((exercise, index) => (

        <ExerciseLi key={index} exercise={exercise}/>
        
      ))}
    </ul>
  );
}
